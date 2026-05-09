import { Search, Palette, Rocket } from "lucide-react";

const steps = [
  { icon: Search, step: "01", title: "Browse Templates", description: "Explore our collection of professionally designed restaurant website templates." },
  {
    icon: Palette,
    step: "02",
    title: "Customize & Brand",
    description:
      "Add your logo, menu, colors, and content. Make it uniquely yours. You can also tune layout and typography.",
  },
  { icon: Rocket, step: "03", title: "Launch & Grow", description: "Go live instantly and start accepting orders, reservations, and payments." },
];

const HowItWorksSection = () => (
  <section className="py-20">
    <div className="container">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-bold font-display">How It Works</h2>
        <p className="mt-4 text-muted-foreground">Get your restaurant online in three simple steps.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {steps.map((s, i) => (
          <div key={s.step} className="text-center group">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-6 group-hover:bg-hero-gradient group-hover:text-primary-foreground transition-all duration-300">
              <s.icon className="h-7 w-7" />
            </div>
            <div className="text-xs font-bold text-primary tracking-widest mb-2">{s.step}</div>
            <h3 className="text-xl font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground max-w-xs mx-auto">{s.description}</p>
            {i < steps.length - 1 && (
              <div className="hidden md:block absolute right-0 top-1/2 w-8 h-px bg-border" />
            )}
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorksSection;
