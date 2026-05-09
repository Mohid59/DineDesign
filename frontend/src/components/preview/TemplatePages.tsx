import { useState } from "react";
import type { TemplateTheme, MenuItem } from "@/data/templates";

// Reusable template page components that adapt to the template's theme

type TemplateMeta = { style: string; category: string };

export const TemplateHome = ({ theme, menuItems, meta }: { theme: TemplateTheme; menuItems: MenuItem[]; meta: TemplateMeta }) => (
  <div style={{ background: theme.background, color: theme.foreground, fontFamily: theme.fontBody, minHeight: "100%" }}>
    {/* Hero */}
    <div className="relative overflow-hidden" style={{ height: 320 }}>
      <img src={theme.heroImage} alt="Restaurant" className="w-full h-full object-cover" />
      {theme.logoUrl ? (
        <div className="absolute left-4 top-4 z-10 rounded-lg bg-white/90 p-2 shadow-sm">
          <img src={theme.logoUrl} alt={`${theme.brandName} logo`} className="h-12 w-12 object-contain" />
        </div>
      ) : null}
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-center px-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: theme.fontHeading }}>
            Welcome to {theme.brandName}
          </h1>
          <p className="mt-3 text-white/80 text-sm max-w-md mx-auto">Experience the finest flavors crafted with passion and premium ingredients.</p>
          <button className="mt-6 px-6 py-2.5 rounded-lg text-sm font-semibold text-white" style={{ backgroundColor: theme.primary }}>
            View Our Menu
          </button>
        </div>
      </div>
    </div>

    {meta.style === "Minimal" ? (
      <div className="px-6 py-12">
        <h2 className="text-2xl font-bold text-center mb-8" style={{ fontFamily: theme.fontHeading }}>Featured Dishes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {menuItems.slice(0, 4).map((item) => (
            <div key={item.id} className="rounded-xl border p-4 flex items-center justify-between" style={{ backgroundColor: theme.cardBg, borderColor: `${theme.primary}33` }}>
              <div>
                <h3 className="font-semibold text-sm">{item.name}</h3>
                <p className="text-xs mt-1 opacity-70">{item.description}</p>
              </div>
              <p className="text-xs font-semibold" style={{ color: theme.primary }}>PKR {item.price}</p>
            </div>
          ))}
        </div>
      </div>
    ) : meta.style === "Luxury" ? (
      <div className="px-6 py-12">
        <h2 className="text-2xl font-bold text-center mb-8" style={{ fontFamily: theme.fontHeading }}>Chef Signature Menu</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {menuItems.slice(0, 6).map((item) => (
            <div key={item.id} className="rounded-xl p-4" style={{ background: `linear-gradient(180deg, ${theme.cardBg}, ${theme.secondary})` }}>
              <div className="text-3xl mb-3">{item.image}</div>
              <h3 className="font-semibold text-sm">{item.name}</h3>
              <p className="text-xs mt-2 opacity-70">{item.description}</p>
              <p className="text-xs mt-3 font-semibold" style={{ color: theme.accent }}>PKR {item.price}</p>
            </div>
          ))}
        </div>
      </div>
    ) : (
      <div className="px-6 py-12">
        <h2 className="text-2xl font-bold text-center mb-8" style={{ fontFamily: theme.fontHeading }}>Featured Dishes</h2>
        <div className={`grid ${meta.category === "Fastfood" || meta.category === "Fast Food" ? "grid-cols-2 md:grid-cols-4" : "grid-cols-2 md:grid-cols-3"} gap-4`}>
          {menuItems.slice(0, 8).map((item) => (
            <div key={item.id} className="rounded-xl p-4 text-center" style={{ backgroundColor: theme.cardBg }}>
              <div className="text-3xl mb-2">{item.image}</div>
              <h3 className="font-semibold text-sm">{item.name}</h3>
              <p className="text-xs mt-1 opacity-60">PKR {item.price}</p>
            </div>
          ))}
        </div>
      </div>
    )}

    {/* About */}
    <div className="px-6 py-12" style={{ backgroundColor: theme.cardBg }}>
      <div className="max-w-lg mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: theme.fontHeading }}>Our Story</h2>
        <p className="text-sm opacity-70 leading-relaxed">
          At {theme.brandName}, we believe every meal should be a memorable experience. Our chefs use the freshest local ingredients
          to create dishes that celebrate tradition while embracing modern culinary techniques.
        </p>
      </div>
    </div>

    {/* Reviews */}
    <div className="px-6 py-12">
      <h2 className="text-2xl font-bold text-center mb-8" style={{ fontFamily: theme.fontHeading }}>What Our Guests Say</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {[
          { name: "Ali Hassan", text: "Absolutely amazing food! The ambiance is perfect." },
          { name: "Fatima S.", text: "Best dining experience in town. Highly recommend!" },
        ].map((r) => (
          <div key={r.name} className="rounded-xl p-4" style={{ backgroundColor: theme.cardBg }}>
            <div className="flex gap-1 mb-2">{"★★★★★".split("").map((s, i) => <span key={i} style={{ color: theme.primary }}>{s}</span>)}</div>
            <p className="text-sm opacity-70">"{r.text}"</p>
            <p className="text-xs font-semibold mt-2">{r.name}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const TemplateMenu = ({ theme, menuItems, meta }: { theme: TemplateTheme; menuItems: MenuItem[]; meta: TemplateMeta }) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const cats = ["All", "Starters", "Main Course", "Desserts", "Drinks"];
  const filtered = activeCategory === "All" ? menuItems : menuItems.filter((m) => m.category === activeCategory);

  return (
    <div style={{ background: theme.background, color: theme.foreground, fontFamily: theme.fontBody, minHeight: "100%" }} className="px-6 py-8">
      <h1 className="text-2xl font-bold text-center mb-6" style={{ fontFamily: theme.fontHeading }}>Our Menu</h1>
      <div className="flex gap-2 justify-center flex-wrap mb-8">
        {cats.map((c) => (
          <button
            key={c}
            onClick={() => setActiveCategory(c)}
            className="px-4 py-1.5 rounded-full text-xs font-medium transition-all"
            style={{
              backgroundColor: activeCategory === c ? theme.primary : theme.cardBg,
              color: activeCategory === c ? "#fff" : theme.foreground,
            }}
          >
            {c}
          </button>
        ))}
      </div>
      <div className={`grid ${meta.style === "Minimal" ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"} gap-4`}>
        {filtered.map((item) => (
          <div
            key={item.id}
            className={`rounded-xl p-4 ${meta.style === "Luxury" ? "border" : ""} ${meta.style === "Minimal" ? "flex items-start justify-between" : "flex items-center gap-4"}`}
            style={{
              backgroundColor: theme.cardBg,
              borderColor: meta.style === "Luxury" ? `${theme.accent}50` : "transparent",
            }}
          >
            <div className="text-3xl flex-shrink-0">{item.image}</div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm">{item.name}</h3>
              <p className="text-xs opacity-60 mt-0.5">{item.description}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="font-bold text-sm" style={{ color: theme.primary }}>PKR {item.price}</span>
                <button
                  className="px-3 py-1 rounded-lg text-xs font-semibold text-white"
                  style={{ backgroundColor: theme.primary }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const TemplateCart = ({ theme, menuItems }: { theme: TemplateTheme; menuItems: MenuItem[] }) => {
  const cartItems = menuItems.slice(0, 3).map((m) => ({ ...m, quantity: 1 + Math.floor(Math.random() * 2) }));
  const total = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <div style={{ background: theme.background, color: theme.foreground, fontFamily: theme.fontBody, minHeight: "100%" }} className="px-6 py-8">
      <h1 className="text-2xl font-bold text-center mb-6" style={{ fontFamily: theme.fontHeading }}>Your Cart</h1>
      <div className="space-y-3 max-w-md mx-auto">
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center gap-4 rounded-xl p-4" style={{ backgroundColor: theme.cardBg }}>
            <span className="text-2xl">{item.image}</span>
            <div className="flex-1">
              <h3 className="font-semibold text-sm">{item.name}</h3>
              <p className="text-xs opacity-60">PKR {item.price}</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center" style={{ backgroundColor: theme.primary, color: "#fff" }}>−</button>
              <span className="text-sm font-semibold w-4 text-center">{item.quantity}</span>
              <button className="w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center" style={{ backgroundColor: theme.primary, color: "#fff" }}>+</button>
            </div>
          </div>
        ))}
        <div className="rounded-xl p-4 mt-6" style={{ backgroundColor: theme.cardBg }}>
          <div className="flex justify-between text-sm font-semibold">
            <span>Total</span>
            <span style={{ color: theme.primary }}>PKR {total.toLocaleString()}</span>
          </div>
        </div>
        <button className="w-full py-3 rounded-xl text-sm font-bold text-white mt-4" style={{ backgroundColor: theme.primary }}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export const TemplateCheckout = ({ theme, menuItems }: { theme: TemplateTheme; menuItems: MenuItem[] }) => (
  <div style={{ background: theme.background, color: theme.foreground, fontFamily: theme.fontBody, minHeight: "100%" }} className="px-6 py-8">
    <h1 className="text-2xl font-bold text-center mb-6" style={{ fontFamily: theme.fontHeading }}>Checkout</h1>
    <div className="max-w-md mx-auto space-y-4">
      {["Full Name", "Phone Number", "Delivery Address"].map((label) => (
        <div key={label}>
          <label className="text-xs font-medium opacity-70 mb-1 block">{label}</label>
          <input
            placeholder={label}
            className="w-full rounded-lg px-4 py-2.5 text-sm outline-none"
            style={{ backgroundColor: theme.cardBg, color: theme.foreground, border: `1px solid ${theme.primary}30` }}
          />
        </div>
      ))}
      <div>
        <label className="text-xs font-medium opacity-70 mb-2 block">Payment Method</label>
        <div className="grid grid-cols-3 gap-2">
          {["Cash", "JazzCash", "Easypaisa"].map((m) => (
            <button
              key={m}
              className="rounded-lg py-2.5 text-xs font-semibold transition-all"
              style={{ backgroundColor: theme.cardBg, border: `1px solid ${theme.primary}40` }}
            >
              {m}
            </button>
          ))}
        </div>
      </div>
      <div className="rounded-xl p-4 mt-4" style={{ backgroundColor: theme.cardBg }}>
        <h3 className="font-semibold text-sm mb-2">Order Summary</h3>
        <div className="space-y-1 text-xs opacity-70">
          <div className="flex justify-between"><span>Grilled Salmon x1</span><span>PKR 2,400</span></div>
          <div className="flex justify-between"><span>Caesar Salad x2</span><span>PKR 2,400</span></div>
          <div className="flex justify-between"><span>Beef Tenderloin x1</span><span>PKR 3,200</span></div>
        </div>
        <div className="border-t mt-2 pt-2 flex justify-between font-bold text-sm" style={{ borderColor: `${theme.primary}30` }}>
          <span>Total</span>
          <span style={{ color: theme.primary }}>PKR 8,000</span>
        </div>
      </div>
      <button className="w-full py-3 rounded-xl text-sm font-bold text-white mt-4" style={{ backgroundColor: theme.primary }}>
        Place Order
      </button>
    </div>
  </div>
);

export const TemplateDashboard = ({ theme }: { theme: TemplateTheme }) => {
  const stats = [
    { label: "Total Orders", value: "1,248", change: "+12%" },
    { label: "Revenue", value: "PKR 4.2M", change: "+8%" },
    { label: "Customers", value: "856", change: "+22%" },
    { label: "Avg Rating", value: "4.8", change: "+0.3" },
  ];
  const orders = [
    { id: "#1248", customer: "Ali K.", items: 3, total: 4200, status: "Completed" },
    { id: "#1247", customer: "Sara M.", items: 2, total: 2800, status: "In Progress" },
    { id: "#1246", customer: "Usman R.", items: 5, total: 7500, status: "Pending" },
  ];

  return (
    <div style={{ background: theme.background, color: theme.foreground, fontFamily: theme.fontBody, minHeight: "100%" }} className="px-6 py-8">
      <h1 className="text-2xl font-bold mb-6" style={{ fontFamily: theme.fontHeading }}>Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl p-4" style={{ backgroundColor: theme.cardBg }}>
            <p className="text-xs opacity-60">{s.label}</p>
            <p className="text-lg font-bold mt-1">{s.value}</p>
            <p className="text-xs mt-1" style={{ color: theme.primary }}>{s.change}</p>
          </div>
        ))}
      </div>
      <h2 className="font-semibold text-lg mb-4" style={{ fontFamily: theme.fontHeading }}>Recent Orders</h2>
      <div className="space-y-2">
        {orders.map((o) => (
          <div key={o.id} className="flex items-center justify-between rounded-xl p-4" style={{ backgroundColor: theme.cardBg }}>
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold opacity-50">{o.id}</span>
              <span className="text-sm font-medium">{o.customer}</span>
              <span className="text-xs opacity-50">{o.items} items</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-bold" style={{ color: theme.primary }}>PKR {o.total.toLocaleString()}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{
                backgroundColor: o.status === "Completed" ? "#10b981" : o.status === "In Progress" ? theme.accent : "#f59e0b",
                color: "#fff"
              }}>{o.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const TemplateReservation = ({ theme }: { theme: TemplateTheme }) => (
  <div style={{ background: theme.background, color: theme.foreground, fontFamily: theme.fontBody, minHeight: "100%" }} className="px-6 py-8">
    <h1 className="text-2xl font-bold text-center mb-2" style={{ fontFamily: theme.fontHeading }}>Reserve a Table</h1>
    <p className="text-center text-sm opacity-60 mb-8">Book your dining experience at {theme.brandName}</p>
    <div className="max-w-md mx-auto space-y-4">
      {[
        { label: "Full Name", type: "text", placeholder: "Enter your name" },
        { label: "Phone", type: "tel", placeholder: "Enter phone number" },
        { label: "Date", type: "date", placeholder: "" },
        { label: "Time", type: "time", placeholder: "" },
      ].map((f) => (
        <div key={f.label}>
          <label className="text-xs font-medium opacity-70 mb-1 block">{f.label}</label>
          <input
            type={f.type}
            placeholder={f.placeholder}
            className="w-full rounded-lg px-4 py-2.5 text-sm outline-none"
            style={{ backgroundColor: theme.cardBg, color: theme.foreground, border: `1px solid ${theme.primary}30` }}
          />
        </div>
      ))}
      <div>
        <label className="text-xs font-medium opacity-70 mb-2 block">Number of Guests</label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, "5+"].map((n) => (
            <button
              key={n}
              className="flex-1 rounded-lg py-2.5 text-sm font-semibold transition-all"
              style={{ backgroundColor: theme.cardBg, border: `1px solid ${theme.primary}40` }}
            >
              {n}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="text-xs font-medium opacity-70 mb-1 block">Special Requests</label>
        <textarea
          rows={3}
          placeholder="Any dietary requirements or special requests..."
          className="w-full rounded-lg px-4 py-2.5 text-sm outline-none resize-none"
          style={{ backgroundColor: theme.cardBg, color: theme.foreground, border: `1px solid ${theme.primary}30` }}
        />
      </div>
      <button className="w-full py-3 rounded-xl text-sm font-bold text-white mt-4" style={{ backgroundColor: theme.primary }}>
        Confirm Reservation
      </button>
    </div>
  </div>
);
