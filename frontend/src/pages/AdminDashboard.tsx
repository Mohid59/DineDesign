import { Bell, Layers, RefreshCcw, ShoppingBag } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getNotifications, getOrders } from "@/lib/api";

const TEMPLATES_TOTAL = 72;
const AUTO_REFRESH_MS = 10000;

const AdminDashboard = () => {
  const [ordersCount, setOrdersCount] = useState(0);
  const [notificationsCount, setNotificationsCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState("");
  const [info, setInfo] = useState("");

  const load = async (showLoading = true) => {
    if (showLoading) setLoading(true);
    const errors: string[] = [];

    const [ordersResult, notificationsResult] = await Promise.allSettled([
      getOrders(),
      getNotifications(),
    ]);

    if (ordersResult.status === "fulfilled") {
      setOrdersCount(Array.isArray(ordersResult.value?.data) ? ordersResult.value.data.length : 0);
    } else {
      errors.push(ordersResult.reason instanceof Error ? ordersResult.reason.message : "Failed to load orders");
    }

    if (notificationsResult.status === "fulfilled") {
      setNotificationsCount(Array.isArray(notificationsResult.value?.data) ? notificationsResult.value.data.length : 0);
    } else {
      errors.push(notificationsResult.reason instanceof Error ? notificationsResult.reason.message : "Failed to load notifications");
    }

    setInfo(errors.join(" | "));
    setLastUpdated(new Date().toLocaleString());
    if (showLoading) setLoading(false);
  };

  useEffect(() => {
    load();
    const onOrderCreated = () => {
      load(false);
    };
    window.addEventListener("order:created", onOrderCreated);
    const timer = window.setInterval(() => {
      load(false);
    }, AUTO_REFRESH_MS);
    return () => {
      window.removeEventListener("order:created", onOrderCreated);
      window.clearInterval(timer);
    };
  }, []);

  const stats = useMemo(
    () => [
      { label: "Templates", value: TEMPLATES_TOTAL, icon: Layers },
      { label: "Orders", value: ordersCount, icon: ShoppingBag },
      { label: "Notifications", value: notificationsCount, icon: Bell },
    ],
    [notificationsCount, ordersCount],
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container py-12">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold font-display">Admin Dashboard</h1>
          <p className="mt-2 text-muted-foreground">
            Live marketplace overview for templates, orders, and notifications.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm">
          <p className="text-sm text-muted-foreground">
            {loading ? "Refreshing metrics..." : `Last updated: ${lastUpdated || "just now"}`}
          </p>
          <button
            type="button"
            onClick={() => load(true)}
            className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm hover:bg-secondary/60"
          >
            <RefreshCcw className="h-4 w-4" />
            Refresh
          </button>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {stats.map(({ label, value, icon: Icon }) => (
            <div key={label} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <Icon className="h-5 w-5 text-primary" />
              <p className="mt-4 text-sm text-muted-foreground">{label}</p>
              <p className="mt-1 text-2xl font-bold">{value}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-border bg-card p-5 shadow-sm">
          <h2 className="font-semibold">Quick snapshot</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Track template business performance in one clean view.
          </p>
          {info ? <p className="mt-3 text-sm text-destructive">{info}</p> : null}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
