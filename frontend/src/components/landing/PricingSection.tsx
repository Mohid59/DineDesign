import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const services = [
  "Custom branding",
  "Multi-Location",
  "Dedicated Support",
  "API Access",
  "All templates",
  "Priority Support",
  "JazzCash and Easypaisa",
  "Mobile Responsive",
  "Basic Support",
  "Maintenance",
];

const plans = [
  {
    planKey: "growth",
    name: "Growth Plan",
    subtitle: "Cafe, Ice Cream and Tea House",
    audience: "Best for smaller brands that want a polished online presence with manageable monthly billing.",
    tiers: [
      {
        label: "Minimal / Dark",
        total: "PKR 1.0 to 1.2 lac",
        monthly: "PKR 10,000/month",
        timeline: "100,000 in 10 months, 120,000 in 12 months",
      },
      {
        label: "Modern / Luxury",
        total: "PKR 1.3 to 1.5 lac",
        monthly: "PKR 12,000/month",
        timeline: "130,000 in 11 months, 150,000 in 13 months",
      },
    ],
    highlighted: false,
  },
  {
    planKey: "scale",
    name: "Scale Plan",
    subtitle: "Restaurant, Bakery and Fast Food",
    audience: "Built for higher-volume businesses that need broader capabilities and premium support.",
    tiers: [
      {
        label: "Minimal / Dark",
        total: "PKR 1.7 to 1.9 lac",
        monthly: "PKR 15,000/month",
        timeline: "170,000 in 11.33 months, 190,000 in 12.67 months",
      },
      {
        label: "Modern / Luxury",
        total: "PKR 2.0 to 2.5 lac",
        monthly: "PKR 17,000/month",
        timeline: "200,000 in 11.76 months, 250,000 in 14.71 months",
      },
    ],
    highlighted: true,
  },
];

const PricingSection = () => (
  <section id="pricing" className="scroll-mt-24 py-24 bg-secondary/30">
    <div className="container">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-bold font-display">Website Pricing</h2>
        <p className="mt-4 text-muted-foreground">
          Choose a plan based on your business type. Each plan includes style-based totals, clear monthly subscriptions, and
          full service coverage.
        </p>
      </div>
      <div className="grid xl:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {plans.map((p) => (
          <div
            key={p.name}
            className={`rounded-2xl p-8 md:p-10 transition-all ${
              p.highlighted
                ? "bg-hero-gradient text-primary-foreground shadow-elevated"
                : "bg-card shadow-card border border-border"
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="font-semibold text-2xl">{p.name}</h3>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  p.highlighted ? "bg-primary-foreground/20 text-primary-foreground" : "bg-secondary text-secondary-foreground"
                }`}
              >
                {p.subtitle}
              </span>
            </div>
            <p className={`mt-2 text-sm ${p.highlighted ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
              {p.audience}
            </p>
            <div className="mt-8 space-y-4">
              {p.tiers.map((tier) => (
                <div
                  key={tier.label}
                  className={`rounded-xl border p-5 ${
                    p.highlighted ? "border-primary-foreground/20 bg-primary-foreground/10" : "border-border bg-background/60"
                  }`}
                >
                  <p className="text-sm font-semibold tracking-wide">{tier.label}</p>
                  <p className="mt-2 text-sm">
                    <span className="font-semibold">Total:</span> {tier.total}
                  </p>
                  <p className="mt-1 text-sm">
                    <span className="font-semibold">Subscription:</span> {tier.monthly}
                  </p>
                  <p className={`mt-2 text-xs leading-relaxed ${p.highlighted ? "text-primary-foreground/75" : "text-muted-foreground"}`}>
                    {tier.timeline}
                  </p>
                </div>
              ))}
            </div>
            <p className={`mt-8 text-sm font-semibold ${p.highlighted ? "text-primary-foreground" : "text-foreground"}`}>Included Services</p>
            <ul className="mt-4 grid sm:grid-cols-2 gap-x-4 gap-y-2">
              {services.map((service) => (
                <li key={service} className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 flex-shrink-0" />
                  {service}
                </li>
              ))}
            </ul>
            <Button
              asChild
              className={`mt-8 w-full ${
                p.highlighted
                  ? "bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                  : "bg-hero-gradient text-primary-foreground hover:opacity-90"
              }`}
            >
              <Link to={`/marketplace?plan=${p.planKey}`}>Get Started</Link>
            </Button>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default PricingSection;
