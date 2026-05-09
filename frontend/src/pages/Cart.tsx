import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { getCartItems, removeCartItem, type CartItem } from "@/lib/cart";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Cart = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<CartItem[]>([]);

  const refresh = () => setItems(getCartItems());

  useEffect(() => {
    refresh();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container py-12">
        <h1 className="text-3xl font-bold font-display">Template Cart</h1>
        <p className="mt-2 text-muted-foreground">Review saved templates and continue to checkout when ready.</p>

        <div className="mt-6 rounded-xl border border-border bg-card px-4 py-3 text-sm text-muted-foreground">
          Cart items: <span className="font-semibold text-foreground">{items.length}</span>
        </div>

        <div className="mt-8 space-y-4">
          {items.length === 0 ? (
            <div className="rounded-2xl border border-border bg-card p-6 text-sm text-muted-foreground">
              Your cart is empty. Open a template preview, customize it, then click "Save to cart".
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h2 className="font-semibold">{item.templateName}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {item.isCustomized
                        ? `Brand: ${item.customizedTheme.brandName} | Layout: ${item.layoutStyle}`
                        : "Template type: As-is design"}
                    </p>
                    <p className="mt-1 text-sm text-primary font-semibold">
                      PKR {item.price.toLocaleString()} ({item.priceType})
                      {item.billingPreference ? ` • ${item.billingPreference === "full" ? "Full payment" : "Subscription"}` : ""}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        removeCartItem(item.id);
                        refresh();
                        toast({
                          title: "Removed from cart",
                          description: `${item.templateName} removed successfully.`,
                        });
                      }}
                    >
                      Remove
                    </Button>
                    <Button asChild>
                      <Link
                        to={`/checkout/${item.templateId}`}
                        state={{
                          customizedTheme: item.customizedTheme,
                          layoutStyle: item.layoutStyle,
                          isCustomized: Boolean(item.isCustomized),
                          cartItemId: item.id,
                          billingPreference: item.billingPreference,
                        }}
                      >
                        Continue to checkout
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;

