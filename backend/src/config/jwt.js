const rawSecret = process.env.JWT_SECRET || "dev_secret_change_me";
const rawExpires = process.env.JWT_EXPIRES_IN || "7d";

module.exports = {
  secret: String(rawSecret).replace(/^["']|["']$/g, "").trim() || "dev_secret_change_me",
  expiresIn: String(rawExpires).replace(/^["']|["']$/g, "").trim() || "7d",
};
