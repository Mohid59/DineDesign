import { UtensilsCrossed, ShoppingCart, CalendarDays, CreditCard } from "lucide-react";

const features = [
  { icon: UtensilsCrossed, title: "Digital Menu", description: "Structured categories, featured items, and polished presentation for every device." },
  { icon: ShoppingCart, title: "Online Orders", description: "Smooth cart and checkout flow with customer-friendly ordering experience." },
  { icon: CalendarDays, title: "Reservations", description: "Capture booking date, time, and party size with a simple reservation pipeline." },
  { icon: CreditCard, title: "Local Payments", description: "Demo-ready JazzCash and Easypaisa API support alongside card-based options." },
];

const FeaturesSection = () => (
  <section className="py-20 bg-secondary/30">
    <div className="container">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-bold font-display">Everything Your Restaurant Needs</h2>
        <p className="mt-4 text-muted-foreground">All the features to run your restaurant business online, built into every template.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <div
            key={f.title}
            className="group rounded-xl bg-card p-6 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary mb-4 group-hover:bg-hero-gradient group-hover:text-primary-foreground transition-all">
              <f.icon className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-lg">{f.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
