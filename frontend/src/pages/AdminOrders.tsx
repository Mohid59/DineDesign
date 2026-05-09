import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getOrders } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";

type AdminOrder = {
  _id: string;
  createdAt: string;
  totalAmount: number;
  status: string;
  templateName?: string;
  templateCategory?: string;
  templateStyle?: string;
  billingPreference?: string;
  isCustomized?: boolean;
  customizedBrandName?: string;
  customizedTheme?: {
    primary?: string;
    secondary?: string;
    accent?: string;
    fontHeading?: string;
    fontBody?: string;
    brandName?: string;
  };
  layoutStyle?: string;
  paymentMethod?: string;
  clientDetails?: {
    accountName?: string;
    accountEmail?: string;
    businessName?: string;
    ownerName?: string;
    phoneNumber?: string;
    launchDate?: string;
  };
};

const AdminOrders = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [clientSearch, setClientSearch] = useState("");

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      try {
        const response = await getOrders();
        setOrders(Array.isArray(response?.data) ? response.data : []);
        setError("");
      } catch (e) {
        const message = e instanceof Error ? e.message : "Failed to load orders";
        if (message.toLowerCase().includes("invalid token")) {
          signOut();
          navigate("/auth");
          return;
        }
        setError(message);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [navigate, signOut]);

  const filteredOrders = useMemo(() => {
    const search = clientSearch.trim().toLowerCase();
    return orders.filter((order) => {
      if (!search) return true;
      const name = String(order.clientDetails?.accountName || "").toLowerCase();
      const email = String(order.clientDetails?.accountEmail || "").toLowerCase();
      return name.includes(search) || email.includes(search);
    });
  }, [orders, clientSearch]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container py-12">
        <h1 className="text-3xl font-bold font-display">Orders</h1>
        <p className="mt-2 text-muted-foreground">
          Review all received template orders, selected template type, and client details.
        </p>

        <div className="mt-6 rounded-xl border border-border bg-card p-4 shadow-sm">
          <div>
            <input
              value={clientSearch}
              onChange={(event) => setClientSearch(event.target.value)}
              placeholder="Search by client name or email"
              className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring md:max-w-sm"
            />
          </div>
        </div>

        {loading ? <p className="mt-6 text-sm text-muted-foreground">Loading orders...</p> : null}
        {error ? <p className="mt-6 text-sm text-destructive">{error}</p> : null}

        {!loading && !error ? (
          <div className="mt-6 grid gap-4">
            {filteredOrders.length === 0 ? (
              <div className="rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground">
                No orders match your search.
              </div>
            ) : (
              filteredOrders.map((order) => (
                <article key={order._id} className="rounded-xl border border-border bg-card p-5 shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h2 className="text-lg font-semibold">{order.templateName || "Template order"}</h2>
                    <span className="rounded-full border border-border px-3 py-1 text-xs">
                      {order.status || "pending"}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Ordered on {new Date(order.createdAt).toLocaleString()}
                  </p>

                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    <p className="text-sm">
                      <span className="font-medium">Template Type:</span>{" "}
                      {order.isCustomized ? "Modified/Customized" : "Original/Displayed"}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Total:</span> PKR {(order.totalAmount || 0).toLocaleString()}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Category:</span> {order.templateCategory || "N/A"}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Style:</span> {order.templateStyle || "N/A"}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Billing:</span> {order.billingPreference || "full"}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Payment:</span> {order.paymentMethod || "N/A"}
                    </p>
                    {order.isCustomized ? (
                      <>
                        <p className="text-sm">
                          <span className="font-medium">Customized Brand:</span> {order.customizedBrandName || "N/A"}
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Layout:</span> {order.layoutStyle || "N/A"}
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Primary Color:</span> {order.customizedTheme?.primary || "N/A"}
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Accent Color:</span> {order.customizedTheme?.accent || "N/A"}
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Heading Font:</span> {order.customizedTheme?.fontHeading || "N/A"}
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Body Font:</span> {order.customizedTheme?.fontBody || "N/A"}
                        </p>
                      </>
                    ) : null}
                  </div>

                  <div className="mt-4 rounded-lg border border-border p-3">
                    <p className="text-sm font-medium">Client Details</p>
                    <div className="mt-2 grid gap-2 text-sm md:grid-cols-2">
                      <p>
                        <span className="font-medium">Account Name:</span>{" "}
                        {order.clientDetails?.accountName || "N/A"}
                      </p>
                      <p>
                        <span className="font-medium">Account Email:</span>{" "}
                        {order.clientDetails?.accountEmail || "N/A"}
                      </p>
                      <p>
                        <span className="font-medium">Business Name:</span>{" "}
                        {order.clientDetails?.businessName || "N/A"}
                      </p>
                      <p>
                        <span className="font-medium">Owner Name:</span> {order.clientDetails?.ownerName || "N/A"}
                      </p>
                      <p>
                        <span className="font-medium">Phone:</span> {order.clientDetails?.phoneNumber || "N/A"}
                      </p>
                      <p>
                        <span className="font-medium">Launch Schedule:</span>{" "}
                        {order.clientDetails?.launchDate
                          ? new Date(order.clientDetails.launchDate).toLocaleString()
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        ) : null}
      </main>
      <Footer />
    </div>
  );
};

export default AdminOrders;
