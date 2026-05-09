const User = require("./user.model");

async function listUsers({ tenantId }) {
  return User.find({ tenantId })
    .select("_id name email role tenantId createdAt")
    .sort({ createdAt: -1 });
}

async function getMe({ userId, tenantId }) {
  return User.findOne({ _id: userId, tenantId }).select("_id name email role tenantId createdAt");
}

module.exports = { listUsers, getMe };

