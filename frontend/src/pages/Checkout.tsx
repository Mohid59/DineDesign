import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import type { Template, TemplateTheme } from "@/data/templates";
import { createOrder, getTemplateById, payOrder } from "@/lib/api";
import { removeCartItem } from "@/lib/cart";

type LocationState = {
  customizedTheme?: TemplateTheme;
  layoutStyle?: string;
  isCustomized?: boolean;
  cartItemId?: string;
  billingPreference?: "full" | "subscription";
};

const Checkout = () => {
  const { user } = useAuth();
  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 16);
    const groups = digits.match(/.{1,4}/g);
    return groups ? groups.join("-") : "";
  };

  const currentYear = new Date().getFullYear();
  const expiryYears = Array.from({ length: 12 }, (_, index) => String(currentYear + index));
  const minLaunchDateTime = new Date(Date.now() + 30 * 60 * 1000).toISOString().slice(0, 16);

  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"credit-card" | "debit-card" | "jazzcash" | "easypaisa">(
    "credit-card",
  );
  const [form, setForm] = useState({
    businessName: "",
    ownerName: "",
    phoneNumber: "",
    launchDate: "",
    cardholderName: "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    walletNumber: "",
  });
  const location = useLocation();
  const state = (location.state || {}) as LocationState;

  const { id } = useParams<{ id: string }>();
  const [template, setTemplate] = useState<Template | null>(null);

  const onRequiredInvalid = (event: React.FormEvent<HTMLInputElement | HTMLSelectElement>) => {
    event.currentTarget.setCustomValidity("This field is required.");
  };

  const onRequiredInput = (event: React.FormEvent<HTMLInputElement | HTMLSelectElement>) => {
    event.currentTarget.setCustomValidity("");
  };

  useEffect(() => {
    const run = async () => {
      if (!id) return;
      try {
        const res = await getTemplateById(id);
        setTemplate(res?.data || null);
      } catch {
        setTemplate(null);
      }
    };
    run();
  }, [id]);

  if (!template) {
    return <div className="min-h-screen flex items-center justify-center">Loading checkout...</div>;
  }

  const saved = (() => {
    try {
      const raw = window.localStorage.getItem(`template-customization:${template.id}`);
      return raw ? (JSON.parse(raw) as { theme?: TemplateTheme; layoutStyle?: string }) : null;
    } catch {
      return null;
    }
  })();

  const customizedTheme = state.customizedTheme || saved?.theme || null;
  const selectedLayout = state.layoutStyle || saved?.layoutStyle || "Classic";
  const hasCustomization =
    typeof state.isCustomized === "boolean"
      ? state.isCustomized
      : Boolean(state.customizedTheme || state.layoutStyle || saved?.theme || saved?.layoutStyle);
  const billingPreference = state.billingPreference || "full";
  const checkoutPrice =
    billingPreference === "subscription" && template.subscriptionMonthly ? template.subscriptionMonthly : template.price;

  const handleSubmit = async () => {
    if (!formRef.current?.reportValidity()) {
      return;
    }

    const cardPayment = paymentMethod === "credit-card" || paymentMethod === "debit-card";
    const required = [
      form.businessName,
      form.ownerName,
      form.phoneNumber,
      form.launchDate,
      ...(cardPayment
        ? [form.cardholderName, form.cardNumber, form.expiryMonth, form.expiryYear, form.cvv]
        : [form.walletNumber]),
    ];
    if (required.some((value) => !value.trim())) {
      setStatus("Please fill all required fields before placing your order.");
      return;
    }
    setSubmitting(true);
    setStatus("");
    try {
      const order = await createOrder({
        items: [{ menuId: null, quantity: 1 }],
        totalAmount: checkoutPrice,
        templateId: template.id,
        templateName: template.name,
        templateCategory: template.category,
        templateStyle: template.style,
        billingPreference,
        isCustomized: hasCustomization,
        customizedBrandName: customizedTheme?.brandName,
        customizedTheme: hasCustomization ? customizedTheme || undefined : undefined,
        layoutStyle: selectedLayout,
        paymentMethod,
        clientDetails: {
          accountName: user?.name || "",
          accountEmail: user?.email || "",
          businessName: form.businessName,
          ownerName: form.ownerName,
          phoneNumber: form.phoneNumber,
          launchDate: form.launchDate,
        },
      });
      const orderId = order?.data?._id;
      await payOrder({
        orderId: orderId || "demo",
        amount: checkoutPrice,
        paymentMethod,
      });
      if (state.cartItemId) {
        removeCartItem(state.cartItemId);
      }
      setStatus("Template order placed successfully");
      setTimeout(() => {
        navigate("/order-success", {
          state: {
            templateName: template.name,
            isCustomized: hasCustomization,
          },
        });
      }, 400);
    } catch (e) {
      setStatus(e instanceof Error ? e.message : "Checkout failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container py-12">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h1 className="text-3xl font-bold font-display">Checkout</h1>
            <p className="mt-2 text-muted-foreground">
              Finalize your order for <span className="font-semibold text-foreground">{template.name}</span>{" "}
              ({hasCustomization ? "Customized version" : "Original version"}).
            </p>
            {customizedTheme ? (
              <div className="mt-3 rounded-lg bg-secondary/60 p-3 text-sm text-muted-foreground">
                Customized brand: <span className="font-semibold text-foreground">{customizedTheme.brandName}</span>
                <br />
                Layout style: <span className="font-semibold text-foreground">{selectedLayout}</span>
              </div>
            ) : null}

            <form ref={formRef} className="mt-6 space-y-4" onSubmit={(event) => event.preventDefault()}>
              <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1 block text-sm font-medium">Business name</span>
                <input
                  required
                  onInvalid={onRequiredInvalid}
                  onInput={onRequiredInput}
                  value={form.businessName}
                  onChange={(event) => setForm((prev) => ({ ...prev, businessName: event.target.value }))}
                  placeholder="Business name"
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-sm font-medium">Owner name</span>
                <input
                  required
                  onInvalid={onRequiredInvalid}
                  onInput={onRequiredInput}
                  value={form.ownerName}
                  onChange={(event) => setForm((prev) => ({ ...prev, ownerName: event.target.value }))}
                  placeholder="Owner name"
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-sm font-medium">Phone number</span>
                <input
                  required
                  onInvalid={onRequiredInvalid}
                  onInput={onRequiredInput}
                  value={form.phoneNumber}
                  onChange={(event) => setForm((prev) => ({ ...prev, phoneNumber: event.target.value }))}
                  placeholder="Phone number"
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-sm font-medium">Preferred launch schedule</span>
                <input
                  required
                  onInvalid={onRequiredInvalid}
                  onInput={onRequiredInput}
                  type="datetime-local"
                  min={minLaunchDateTime}
                  value={form.launchDate}
                  onChange={(event) => setForm((prev) => ({ ...prev, launchDate: event.target.value }))}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                />
              </label>
              </div>
            <div className="mt-4 rounded-lg border border-border p-4">
              <p className="text-sm font-medium">Payment Method</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("credit-card")}
                  className={`rounded-lg px-3 py-2 text-sm border ${
                    paymentMethod === "credit-card" ? "border-primary bg-primary/10" : "border-border"
                  }`}
                >
                  Credit Card
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("debit-card")}
                  className={`rounded-lg px-3 py-2 text-sm border ${
                    paymentMethod === "debit-card" ? "border-primary bg-primary/10" : "border-border"
                  }`}
                >
                  Debit Card
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("jazzcash")}
                  className={`rounded-lg px-3 py-2 text-sm border ${
                    paymentMethod === "jazzcash" ? "border-primary bg-primary/10" : "border-border"
                  }`}
                >
                  JazzCash
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("easypaisa")}
                  className={`rounded-lg px-3 py-2 text-sm border ${
                    paymentMethod === "easypaisa" ? "border-primary bg-primary/10" : "border-border"
                  }`}
                >
                  Easypaisa
                </button>
              </div>
              {paymentMethod === "credit-card" || paymentMethod === "debit-card" ? (
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <label className="block sm:col-span-2">
                    <span className="mb-1 block text-sm font-medium">Cardholder name</span>
                    <input
                      required
                      onInvalid={onRequiredInvalid}
                      onInput={onRequiredInput}
                      value={form.cardholderName}
                      onChange={(event) => setForm((prev) => ({ ...prev, cardholderName: event.target.value }))}
                      placeholder="Muhammad Ali"
                      className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                    />
                  </label>
                  <label className="block sm:col-span-2">
                    <span className="mb-1 block text-sm font-medium">
                      {paymentMethod === "credit-card" ? "Credit" : "Debit"} card number
                    </span>
                    <input
                      required
                      onInvalid={onRequiredInvalid}
                      onInput={onRequiredInput}
                      value={form.cardNumber}
                      onChange={(event) =>
                        setForm((prev) => ({ ...prev, cardNumber: formatCardNumber(event.target.value) }))
                      }
                      placeholder="4111-1111-1111-1111"
                      className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1 block text-sm font-medium">Expiry month</span>
                    <select
                      required
                      onInvalid={onRequiredInvalid}
                      onInput={onRequiredInput}
                      value={form.expiryMonth}
                      onChange={(event) => setForm((prev) => ({ ...prev, expiryMonth: event.target.value }))}
                      className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="">MM</option>
                      {Array.from({ length: 12 }, (_, index) => {
                        const month = String(index + 1).padStart(2, "0");
                        return (
                          <option key={month} value={month}>
                            {month}
                          </option>
                        );
                      })}
                    </select>
                  </label>
                  <label className="block">
                    <span className="mb-1 block text-sm font-medium">Expiry year</span>
                    <select
                      required
                      onInvalid={onRequiredInvalid}
                      onInput={onRequiredInput}
                      value={form.expiryYear}
                      onChange={(event) => setForm((prev) => ({ ...prev, expiryYear: event.target.value }))}
                      className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="">YYYY</option>
                      {expiryYears.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="block sm:col-span-2">
                    <span className="mb-1 block text-sm font-medium">CVV</span>
                    <input
                      required
                      onInvalid={onRequiredInvalid}
                      onInput={onRequiredInput}
                      value={form.cvv}
                      onChange={(event) => setForm((prev) => ({ ...prev, cvv: event.target.value }))}
                      placeholder="123"
                      className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                    />
                  </label>
                </div>
              ) : (
                <div className="mt-4 grid gap-3">
                  <label className="block">
                    <span className="mb-1 block text-sm font-medium">
                      {paymentMethod === "jazzcash" ? "JazzCash" : "Easypaisa"} wallet number
                    </span>
                    <input
                      required
                      onInvalid={onRequiredInvalid}
                      onInput={onRequiredInput}
                      value={form.walletNumber}
                      onChange={(event) => setForm((prev) => ({ ...prev, walletNumber: event.target.value }))}
                      placeholder="03xx1234567"
                      className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                    />
                  </label>
                </div>
              )}
              <p className="mt-3 text-xs text-muted-foreground">
                Demo mode: this uses payment APIs only for simulation, no real transaction is performed.
              </p>
            </div>
            </form>
          </section>

          <aside className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Order summary</h2>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Template</span>
                <span>{template.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Billing</span>
                <span>{billingPreference === "subscription" ? "Subscription" : "One-time"}</span>
              </div>
              <div className="flex justify-between">
                <span>Payment</span>
                <span>
                  {paymentMethod === "credit-card"
                    ? "Credit Card"
                    : paymentMethod === "debit-card"
                      ? "Debit Card"
                      : paymentMethod === "jazzcash"
                        ? "JazzCash"
                        : "Easypaisa"}
                </span>
              </div>
              {customizedTheme ? (
                <div className="flex justify-between">
                  <span>Customized</span>
                  <span>{customizedTheme.brandName}</span>
                </div>
              ) : null}
              <div className="flex justify-between font-semibold text-primary">
                <span>Total</span>
                <span>PKR {checkoutPrice.toLocaleString()}</span>
              </div>
            </div>
            <Button className="mt-6 w-full" onClick={handleSubmit} disabled={submitting}>
              {submitting ? "Placing order..." : hasCustomization ? "Place customized order" : "Place order"}
            </Button>
            {status ? (
              <p
                className={`mt-3 text-sm ${
                  status.toLowerCase().includes("success") ? "text-emerald-600" : "text-muted-foreground"
                }`}
              >
                {status}
              </p>
            ) : null}
            <Button asChild variant="outline" className="mt-3 w-full">
              <Link to={`/preview/${template.id}`}>Back to template preview</Link>
            </Button>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
