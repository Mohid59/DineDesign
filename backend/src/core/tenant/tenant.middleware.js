module.exports = (req, res, next) => {
  // Temporary tenant resolution for scaffold stage.
  req.tenantId = req.headers["x-tenant-id"] || "default-tenant";
  next();
};
