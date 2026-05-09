import { Star } from "lucide-react";

const testimonials = [
  { name: "Ahmed Khan", role: "Owner, Spice Garden", text: "DineDesign helped us launch our restaurant website in a day. Orders increased by 40%!" },
  { name: "Sara Ali", role: "Founder, The Brew Room", text: "The templates are gorgeous and the checkout flow is seamless. Our customers love it." },
  { name: "Usman Raza", role: "Manager, QuickBite Lahore", text: "We went from zero online presence to a fully functional website with payments. Amazing!" },
];

const TestimonialsSection = () => (
  <section className="py-20">
    <div className="container">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-bold font-display">Loved by Restaurant Owners</h2>
        <p className="mt-4 text-muted-foreground">See what our customers have to say.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div key={t.name} className="rounded-xl bg-card p-6 shadow-card">
            <div className="flex gap-1 text-primary mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">"{t.text}"</p>
            <div>
              <p className="font-semibold text-sm">{t.name}</p>
              <p className="text-xs text-muted-foreground">{t.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
