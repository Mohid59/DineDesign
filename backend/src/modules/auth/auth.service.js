const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../user/user.model");
const { secret, expiresIn } = require("../../config/jwt");
const adminAccessService = require("../admin-access/admin-access.service");

async function register({ name, email, password, role, tenantId }) {
  const normalizedEmail = adminAccessService.normalizeEmail(email);
  const shouldBeAdmin = await adminAccessService.isAdminEmailForTenant(normalizedEmail, tenantId);
  const resolvedRole = shouldBeAdmin ? "admin" : "customer";

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email: normalizedEmail,
    passwordHash,
    role: resolvedRole,
    tenantId,
  });
  return user;
}

async function login({ email, password, tenantId }) {
  const normalizedEmail = adminAccessService.normalizeEmail(email);
  const user = await User.findOne({ tenantId, email: normalizedEmail });
  if (!user) {
    const err = new Error("Invalid credentials");
    err.statusCode = 401;
    throw err;
  }

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) {
    const err = new Error("Invalid credentials");
    err.statusCode = 401;
    throw err;
  }

  const matchingAdminCredential = adminAccessService.findMatchingEnvAdminCredential(
    normalizedEmail,
    password,
  );
  const shouldBeAdmin = Boolean(matchingAdminCredential);
  if (shouldBeAdmin && user.role !== "admin") {
    user.role = "admin";
    await user.save();
  } else if (!shouldBeAdmin && user.role === "admin") {
    user.role = "customer";
    await user.save();
  }

  const token = jwt.sign(
    { sub: user._id.toString(), role: user.role, tenantId: user.tenantId },
    secret,
    { expiresIn }
  );

  return { user, token };
}

async function ensureDefaultAdminAccount() {
  const tenantId = (process.env.DEFAULT_TENANT_ID || "default-tenant").trim();
  const envAdminCredentials = adminAccessService.getEnvAdminCredentials();
  const fallbackAdmin = {
    email: (process.env.DEFAULT_ADMIN_EMAIL || "fa7793876@gmail.com").trim().toLowerCase(),
    password: String(process.env.DEFAULT_ADMIN_PASSWORD || "Fahad7961"),
    name: (process.env.DEFAULT_ADMIN_NAME || "System Admin").trim(),
  };
  const credentialSeed = envAdminCredentials.length > 0 ? envAdminCredentials : [fallbackAdmin];

  for (const admin of credentialSeed) {
    if (!admin.email || !admin.password) {
      continue;
    }

    await adminAccessService.addAdminEmail(tenantId, admin.email);

    let user = await User.findOne({ tenantId, email: admin.email });
    const passwordHash = await bcrypt.hash(admin.password, 10);

    if (!user) {
      await User.create({
        name: admin.name || "System Admin",
        email: admin.email,
        passwordHash,
        role: "admin",
        tenantId,
      });
      continue;
    }

    user.role = "admin";
    user.passwordHash = passwordHash;
    if (!user.name || !user.name.trim()) {
      user.name = admin.name || "System Admin";
    }
    await user.save();
  }
}

module.exports = { register, login, ensureDefaultAdminAccount };
