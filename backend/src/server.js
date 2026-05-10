require("dotenv").config();
const app = require("./app");
const { connectDatabase } = require("./database/connection");
const { ensureDefaultAdminAccount } = require("./modules/auth/auth.service");

const PORT = process.env.PORT || 5000;

(async () => {
  await connectDatabase();
  try {
    await ensureDefaultAdminAccount();
  } catch (err) {
    // Non-fatal: server still starts even if admin seeding fails.
    console.error("Warning: ensureDefaultAdminAccount failed:", err.message);
  }
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
