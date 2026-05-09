const configuredApiBaseUrl = (import.meta.env.VITE_API_BASE_URL || "").trim();
const isLocalhost =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");
const API_BASE_URL = configuredApiBaseUrl || (isLocalhost ? "http://localhost:5000" : "/_/backend");
const TENANT_ID = import.meta.env.VITE_TENANT_ID || "default-tenant";
const TOKEN_KEY = "dinedesign.token";

export function getToken() {
  return window.localStorage.getItem(TOKEN_KEY) || "";
}

export function setToken(token: string) {
  window.localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  window.localStorage.removeItem(TOKEN_KEY);
}

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
  auth?: boolean;
};

export async function apiRequest(path: string, options: RequestOptions = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      "x-tenant-id": TENANT_ID,
      ...(options.auth ? { Authorization: `Bearer ${getToken()}` } : {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload?.message || `API error: ${response.status}`);
  }
  return payload;
}

export async function registerUser(input: {
  name: string;
  email: string;
  password: string;
  role: "admin" | "staff" | "customer";
}) {
  return apiRequest("/api/auth/register", { method: "POST", body: input });
}

export async function loginUser(input: { email: string; password: string }) {
  return apiRequest("/api/auth/login", { method: "POST", body: input });
}

export async function getMe() {
  return apiRequest("/api/users/me", { auth: true });
}

export async function getTenantDashboard() {
  return apiRequest("/api/tenant-admin", { auth: true });
}

export async function getHealth() {
  return apiRequest("/health");
}

export async function getTemplates() {
  return apiRequest("/api/templates");
}

export async function getTemplateById(id: string) {
  return apiRequest(`/api/templates/${id}`);
}

export async function getTemplatePreviewData(id: string) {
  return apiRequest(`/api/templates/${id}/preview-data`);
}

export async function getAnalyticsStats() {
  return apiRequest("/api/analytics/stats", { auth: true });
}

export async function getCoupons() {
  return apiRequest("/api/promotion/coupons", { auth: true });
}

export async function getUsers() {
  return apiRequest("/api/users", { auth: true });
}

export async function getNotifications() {
  return apiRequest("/api/notification", { auth: true });
}

export async function sendNotification(input: { channel: "sms" | "whatsapp" | "system"; to: string; message: string }) {
  return apiRequest("/api/notification/send", { method: "POST", body: input, auth: true });
}

export async function processNotifications() {
  return apiRequest("/api/notification/process", { method: "POST", auth: true });
}

export async function getMenuCategories() {
  return apiRequest("/api/menu/categories", { auth: true });
}

export async function getMenuItems() {
  return apiRequest("/api/menu/items", { auth: true });
}

export async function createOrder(input: {
  items: { menuId: string | null; quantity: number }[];
  totalAmount: number;
  templateId?: string;
  templateName?: string;
  templateCategory?: string;
  templateStyle?: string;
  billingPreference?: "full" | "subscription";
  isCustomized?: boolean;
  customizedBrandName?: string;
  customizedTheme?: {
    primary: string;
    secondary: string;
    background: string;
    foreground: string;
    accent: string;
    cardBg: string;
    fontHeading: string;
    fontBody: string;
    heroImage: string;
    brandName: string;
    logoUrl?: string;
  };
  layoutStyle?: string;
  paymentMethod?: "credit-card" | "debit-card" | "jazzcash" | "easypaisa";
  clientDetails?: {
    accountName?: string;
    accountEmail?: string;
    businessName?: string;
    ownerName?: string;
    phoneNumber?: string;
    launchDate?: string;
  };
}) {
  const response = await apiRequest("/api/order", { method: "POST", body: input, auth: true });
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("order:created", { detail: response }));
  }
  return response;
}

export async function getOrders() {
  return apiRequest("/api/order", { auth: true });
}

export async function payOrder(input: {
  orderId: string;
  amount: number;
  paymentMethod: "credit-card" | "debit-card" | "jazzcash" | "easypaisa";
}) {
  return apiRequest("/api/payment/pay", { method: "POST", body: input, auth: true });
}

export async function createReservation(input: { date: string; time: string; people: number }) {
  return apiRequest("/api/reservation", { method: "POST", body: input, auth: true });
}

export async function chatWithAi(message: string) {
  return apiRequest("/api/ai/chat", { method: "POST", body: { message } });
}

