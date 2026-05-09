require("dotenv").config();
const app = require("./app");
const { connectDatabase } = require("./database/connection");
const { ensureDefaultAdminAccount } = require("./modules/auth/auth.service");

const PORT = process.env.PORT || 5000;

(async () => {
  await connectDatabase();
  await ensureDefaultAdminAccount();
  app.listen(PORT, () => {
    // Keep startup output simple and readable for local dev.
    console.log(`Server running on port ${PORT}`);
  });
})().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
