/* eslint-disable no-console */
const baseUrl = process.env.BASE_URL || "http://localhost:5000";
const tenantId = process.env.TENANT_ID || "default-tenant";

async function http(method, path, body, token) {
  const res = await fetch(`${baseUrl}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      "x-tenant-id": tenantId,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await res.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    json = text;
  }

  if (!res.ok) {
    throw new Error(`${method} ${path} -> ${res.status}\n${text}`);
  }

  return json;
}

async function main() {
  console.log("Health...");
  await http("GET", "/health");

  console.log("Register (may fail if already exists)...");
  try {
    await http("POST", "/api/auth/register", {
      name: "Admin",
      email: "admin@example.com",
      password: "Password123!",
      role: "admin",
    });
  } catch (e) {
    console.log("Register skipped:", e.message.split("\n")[0]);
  }

  console.log("Login...");
  const login = await http("POST", "/api/auth/login", {
    email: "admin@example.com",
    password: "Password123!",
  });
  const token = login?.data?.token;
  if (!token) throw new Error("Login did not return token");

  console.log("Me...");
  await http("GET", "/api/users/me", undefined, token);

  console.log("List users...");
  await http("GET", "/api/users", undefined, token);

  console.log("Create menu category...");
  const cat = await http("POST", "/api/menu/categories", { name: "Starters" }, token);
  const categoryId = cat?.data?._id;
  if (!categoryId) throw new Error("Category not created");

  console.log("List categories...");
  await http("GET", "/api/menu/categories", undefined, token);

  console.log("Create menu item...");
  await http(
    "POST",
    "/api/menu/items",
    { name: "Soup", description: "Hot soup", price: 250, categoryId },
    token
  );

  console.log("List menu items...");
  await http("GET", "/api/menu/items", undefined, token);

  console.log("Create order...");
  await http("POST", "/api/order", { items: [{ menuId: null, quantity: 1 }], totalAmount: 1000 }, token);

  console.log("List orders...");
  await http("GET", "/api/order", undefined, token);

  console.log("Create reservation...");
  await http("POST", "/api/reservation", { date: "2026-04-16", time: "19:30", people: 2 }, token);

  console.log("List reservations...");
  await http("GET", "/api/reservation", undefined, token);

  console.log("Create coupon...");
  await http("POST", "/api/promotion/coupons", { code: "WELCOME10", discount: 10 }, token);

  console.log("List coupons...");
  await http("GET", "/api/promotion/coupons", undefined, token);

  console.log("Pay...");
  await http("POST", "/api/payment/pay", { orderId: "demo", amount: 1000 }, token);

  console.log("Analytics...");
  await http("GET", "/api/analytics/stats", undefined, token);

  console.log("AI chat...");
  await http("POST", "/api/ai/chat", { message: "hello" }, token);

  console.log("Tenant dashboard...");
  await http("GET", "/api/tenant-admin", undefined, token);

  console.log("Notification send...");
  await http("POST", "/api/notification/send", { channel: "sms", to: "+923001234567", message: "Test notification" }, token);

  console.log("Notification process...");
  await http("POST", "/api/notification/process", undefined, token);

  console.log("Notification list...");
  await http("GET", "/api/notification", undefined, token);

  console.log("Smoke test OK");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

