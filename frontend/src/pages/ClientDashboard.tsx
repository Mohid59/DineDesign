import { Link } from "react-router-dom";
import { CreditCard, Palette, ShoppingBag } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { templates } from "@/data/templates";

const quickActions = [
  { label: "Browse templates", to: "/marketplace", icon: Palette },
  { label: "Preview featured", to: `/preview/${templates[0]?.id ?? "urbanbite"}`, icon: ShoppingBag },
  { label: "Open cart & checkout", to: "/cart", icon: CreditCard },
];

const ClientDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container py-12">
        <h1 className="text-3xl font-bold font-display">Client Dashboard</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Manage your website journey from template selection to launch.
        </p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {quickActions.map(({ label, to, icon: Icon }) => (
          <div key={label} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <Icon className="h-5 w-5 text-primary" />
            <h2 className="mt-4 font-semibold">{label}</h2>
            <Button asChild className="mt-4 w-full">
              <Link to={to}>Open</Link>
            </Button>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-sm">
        <h2 className="font-semibold">Recommended next steps</h2>
        <div className="mt-3 space-y-2 text-sm text-muted-foreground">
          <p>1. Select a template that fits your business category and style.</p>
          <p>2. Choose your billing mode: Whole amount or Subscription.</p>
          <p>3. Add your selected template to cart and review your choices.</p>
          <p>4. Continue to checkout, complete payment details, and place your order.</p>
        </div>
      </div>
      </main>
      <Footer />
    </div>
  );
};

export default ClientDashboard;
