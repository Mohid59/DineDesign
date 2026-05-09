const AdminAccess = require("./admin-access.model");
const User = require("../user/user.model");

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function getEnvAdminCredentials() {
  return (process.env.ADMIN_CREDENTIALS || "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean)
    .map((item) => {
      const [email = "", name = "", password = ""] = item.split("|").map((part) => part.trim());
      return {
        email: normalizeEmail(email),
        name,
        password,
      };
    })
    .filter((entry) => entry.email && entry.password);
}

function getEnvAdminEmails() {
  const legacyEmails = (process.env.ADMIN_ALLOWED_EMAILS || "")
    .split(",")
    .map((value) => normalizeEmail(value))
    .filter(Boolean);
  const credentialEmails = getEnvAdminCredentials().map((entry) => entry.email);
  return Array.from(new Set([...legacyEmails, ...credentialEmails]));
}

function findMatchingEnvAdminCredential(email, password) {
  const normalizedEmail = normalizeEmail(email);
  if (!normalizedEmail) {
    return null;
  }
  const targetPassword = String(password || "");
  return (
    getEnvAdminCredentials().find(
      (entry) => entry.email === normalizedEmail && entry.password === targetPassword,
    ) || null
  );
}

async function getStoredAdminEmails(tenantId) {
  const doc = await AdminAccess.findOne({ tenantId }).lean();
  return Array.isArray(doc?.adminEmails) ? doc.adminEmails.map((email) => normalizeEmail(email)).filter(Boolean) : [];
}

async function getEffectiveAdminEmails(tenantId) {
  const envEmails = getEnvAdminEmails();
  const dbEmails = await getStoredAdminEmails(tenantId);
  return Array.from(new Set([...envEmails, ...dbEmails]));
}

async function isAdminEmailForTenant(email, tenantId) {
  const target = normalizeEmail(email);
  if (!target) return false;
  const allowed = await getEffectiveAdminEmails(tenantId);
  return allowed.includes(target);
}

async function listManageableAdminEmails(tenantId) {
  const doc = await AdminAccess.findOne({ tenantId }).lean();
  return Array.isArray(doc?.adminEmails) ? doc.adminEmails.map((email) => normalizeEmail(email)).filter(Boolean) : [];
}

async function addAdminEmail(tenantId, email) {
  const normalized = normalizeEmail(email);
  if (!normalized) {
    const err = new Error("Valid email is required");
    err.statusCode = 400;
    throw err;
  }

  const doc = await AdminAccess.findOneAndUpdate(
    { tenantId },
    { $setOnInsert: { tenantId }, $addToSet: { adminEmails: normalized } },
    { new: true, upsert: true }
  );

  // Upgrade matching tenant users to admin immediately.
  await User.updateMany({ tenantId, email: normalized }, { $set: { role: "admin" } });

  return doc.adminEmails;
}

async function removeAdminEmail(tenantId, email) {
  const normalized = normalizeEmail(email);
  if (!normalized) {
    const err = new Error("Valid email is required");
    err.statusCode = 400;
    throw err;
  }

  const doc = await AdminAccess.findOneAndUpdate(
    { tenantId },
    { $pull: { adminEmails: normalized } },
    { new: true }
  );

  const stillAllowedByEnv = getEnvAdminEmails().includes(normalized);
  if (!stillAllowedByEnv) {
    await User.updateMany({ tenantId, email: normalized }, { $set: { role: "customer" } });
  }

  return Array.isArray(doc?.adminEmails) ? doc.adminEmails : [];
}

module.exports = {
  normalizeEmail,
  getEnvAdminCredentials,
  getEnvAdminEmails,
  findMatchingEnvAdminCredential,
  getStoredAdminEmails,
  getEffectiveAdminEmails,
  isAdminEmailForTenant,
  listManageableAdminEmails,
  addAdminEmail,
  removeAdminEmail,
};
