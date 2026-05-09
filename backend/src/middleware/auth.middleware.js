const jwt = require("jsonwebtoken");
const { secret } = require("../config/jwt");

module.exports = (req, res, next) => {
  const header = req.headers.authorization || "";
  const [, token] = header.split(" ");

  if (!token) {
    return res.status(401).json({ success: false, message: "Missing Authorization token" });
  }

  try {
    const payload = jwt.verify(token, secret);
    req.user = { id: payload.sub, role: payload.role, tenantId: payload.tenantId };
    return next();
  } catch (e) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};
