import { Link, useLocation } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

type OrderSuccessState = {
  templateName?: string;
  isCustomized?: boolean;
};

const OrderSuccess = () => {
  const location = useLocation();
  const state = (location.state || {}) as OrderSuccessState;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container py-16">
        <div className="mx-auto max-w-xl rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
          <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-600" />
          <h1 className="mt-4 text-3xl font-bold font-display">Order confirmed</h1>
          <p className="mt-3 text-muted-foreground">
            Template order placed successfully.
          </p>
          {state.templateName ? (
            <p className="mt-2 text-sm text-muted-foreground">
              {state.isCustomized ? "Customized template:" : "Template:"}{" "}
              <span className="font-semibold text-foreground">{state.templateName}</span>
            </p>
          ) : null}

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <Button asChild>
              <Link to="/marketplace">Browse more templates</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/dashboard">Go to dashboard</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderSuccess;
