import { Link } from "react-router-dom";
import { Eye, Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Template } from "@/data/templates";
import { addCartItem } from "@/lib/cart";
import { useToast } from "@/hooks/use-toast";
import { isWishlisted, toggleWishlist } from "@/lib/wishlist";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

const TemplateCard = ({ template }: { template: Template }) => {
  const { toast } = useToast();
  const { role } = useAuth();
  const canOrder = role === "client";
  const [wishlisted, setWishlisted] = useState(isWishlisted(template.id));
  const [billingPreference, setBillingPreference] = useState<"full" | "subscription">("full");
  const styleKey = template.style.toLowerCase();
  const categoryKey = template.category.toLowerCase().replace(/\s+/g, "");

  return (
    <div className="group rounded-xl overflow-hidden bg-card shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
    {/* Preview thumbnail */}
    <div className="relative aspect-[16/10] overflow-hidden">
      <div className="absolute inset-0" style={{ backgroundColor: template.theme.background }}>
        {styleKey === "minimal" ? (
          <div className="h-full p-4">
            <div className="h-full rounded-xl border p-3 flex flex-col" style={{ borderColor: `${template.theme.primary}50`, backgroundColor: template.theme.cardBg }}>
              <div className="text-[8px] font-semibold uppercase tracking-[0.12em]" style={{ color: template.theme.primary }}>
                {template.theme.brandName}
              </div>
              <div className="mt-3 h-1.5 w-10 rounded" style={{ backgroundColor: template.theme.primary }} />
              <div className="mt-2 space-y-1.5">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-1.5 rounded" style={{ backgroundColor: `${template.theme.foreground}26` }} />
                ))}
              </div>
              <div className="mt-auto grid grid-cols-2 gap-1.5">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-5 rounded" style={{ backgroundColor: `${template.theme.primary}22` }} />
                ))}
              </div>
            </div>
          </div>
        ) : styleKey === "luxury" ? (
          <div className="h-full flex flex-col">
            <div className="h-8 flex items-center justify-center text-[8px] font-bold tracking-[0.15em] uppercase" style={{ backgroundColor: template.theme.secondary, color: template.theme.accent }}>
              {template.theme.brandName}
            </div>
            <div className="flex-1 p-4">
              <div className="h-full rounded-xl p-3 flex flex-col justify-between" style={{ background: `linear-gradient(150deg, ${template.theme.cardBg}, ${template.theme.secondary})` }}>
                <div className="text-[10px] font-semibold" style={{ color: template.theme.foreground, fontFamily: template.theme.fontHeading }}>
                  Signature Collection
                </div>
                <div className="space-y-2">
                  {[1, 2].map((i) => (
                    <div key={i} className="h-6 rounded-lg border" style={{ borderColor: `${template.theme.accent}66` }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : styleKey === "dark" ? (
          <div className="h-full p-3">
            <div className="h-full rounded-xl p-3" style={{ backgroundColor: template.theme.cardBg }}>
              <div className="flex items-center justify-between text-[8px] font-semibold" style={{ color: template.theme.foreground }}>
                <span>{template.theme.brandName}</span>
                <span style={{ color: template.theme.primary }}>LIVE</span>
              </div>
              <div className="mt-3 rounded-lg h-10" style={{ background: `linear-gradient(90deg, ${template.theme.secondary}, ${template.theme.primary})` }} />
              <div className={`mt-2 grid ${categoryKey === "fastfood" ? "grid-cols-3" : "grid-cols-2"} gap-1.5`}>
                {[1, 2, 3, 4, 5, 6].slice(0, categoryKey === "fastfood" ? 6 : 4).map((i) => (
                  <div key={i} className="h-5 rounded-md" style={{ backgroundColor: `${template.theme.foreground}1f` }} />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col">
            <div className="flex items-center px-4 py-2 gap-2" style={{ backgroundColor: template.theme.cardBg }}>
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: template.theme.primary }} />
              <span className="text-[8px] font-bold" style={{ color: template.theme.foreground, fontFamily: template.theme.fontHeading }}>
                {template.theme.brandName}
              </span>
            </div>
            <div className="flex-1 flex items-center justify-center p-4">
              <div className="text-center">
                <div className="text-[10px] font-bold" style={{ color: template.theme.foreground, fontFamily: template.theme.fontHeading }}>
                  Welcome to {template.theme.brandName}
                </div>
                <div className="mt-1 w-12 h-1.5 rounded mx-auto" style={{ backgroundColor: template.theme.primary }} />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-1 px-4 pb-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-6 rounded" style={{ backgroundColor: template.theme.cardBg, opacity: 0.9 }} />
              ))}
            </div>
          </div>
        )}
      </div>
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <Button asChild size="sm" className="bg-primary-foreground text-foreground hover:bg-primary-foreground/90">
          <Link to={`/preview/${template.id}`}>
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Link>
        </Button>
      </div>
    </div>

    {/* Info */}
    <div className="p-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold">{template.name}</h3>
          <p className="text-xs text-muted-foreground mt-0.5">{template.category} • {template.style}</p>
        </div>
        <div className="text-right">
          <p className="font-bold text-primary text-sm">PKR {template.price.toLocaleString()}</p>
          <p className="text-[10px] text-muted-foreground">project total</p>
        </div>
      </div>
      {canOrder ? (
        <div className="mt-3 rounded-lg border border-border p-2">
          <p className="text-[11px] font-medium text-muted-foreground">How do you want to pay?</p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setBillingPreference("full")}
              className={`rounded-md px-2 py-1.5 text-xs border ${
                billingPreference === "full" ? "border-primary bg-primary/10 text-foreground" : "border-border text-muted-foreground"
              }`}
            >
              Whole amount
            </button>
            <button
              type="button"
              onClick={() => setBillingPreference("subscription")}
              className={`rounded-md px-2 py-1.5 text-xs border ${
                billingPreference === "subscription"
                  ? "border-primary bg-primary/10 text-foreground"
                  : "border-border text-muted-foreground"
              }`}
            >
              Subscription
            </button>
          </div>
        </div>
      ) : null}
      <div className="mt-3 flex flex-wrap gap-1">
        {template.tags.map((tag) => (
          <span key={tag} className="inline-block rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium text-secondary-foreground">
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-4 flex gap-2">
        <Button asChild size="sm" variant="outline" className="flex-1">
          <Link to={`/preview/${template.id}`}>Preview</Link>
        </Button>
        {canOrder ? (
          <Button
            size="sm"
            className="flex-1"
            onClick={() => {
              const selectedPrice =
                billingPreference === "subscription" && template.subscriptionMonthly
                  ? template.subscriptionMonthly
                  : template.price;
              const selectedType = billingPreference === "subscription" ? "monthly" : "one-time";
              addCartItem({
                id: `${template.id}-${Date.now()}`,
                templateId: template.id,
                templateName: template.name,
                price: selectedPrice,
                priceType: selectedType,
                billingPreference,
                customizedTheme: template.theme,
                layoutStyle: "Classic",
                isCustomized: false,
                addedAt: new Date().toISOString(),
              });
              toast({
                title: "Added to cart successfully",
                description:
                  billingPreference === "subscription"
                    ? `${template.name} added with subscription billing.`
                    : `${template.name} added with full payment.`,
              });
            }}
          >
            <ShoppingCart className="h-4 w-4 mr-1.5" />
            Add
          </Button>
        ) : (
          <Button size="sm" className="flex-1" variant="secondary" disabled>
            Client only
          </Button>
        )}
        <Button
          size="sm"
          variant={wishlisted ? "default" : "outline"}
          onClick={() => {
            const next = toggleWishlist(template.id);
            setWishlisted(next);
            toast({
              title: next ? "Added to wishlist" : "Removed from wishlist",
              description: template.name,
            });
          }}
        >
          <Heart className={`h-4 w-4 ${wishlisted ? "fill-current" : ""}`} />
        </Button>
      </div>
    </div>
  </div>
  );
};

export default TemplateCard;
