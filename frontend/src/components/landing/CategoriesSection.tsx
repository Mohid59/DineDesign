import { Link } from "react-router-dom";

const CATEGORY_META: Record<string, { label: string; emoji: string; color: string }> = {
  Restaurant: { label: "Restaurant", emoji: "🍽️", color: "from-orange-500/20 to-red-500/20" },
  Cafe: { label: "Café", emoji: "☕", color: "from-amber-500/20 to-yellow-500/20" },
  Fastfood: { label: "Fast Food", emoji: "🍔", color: "from-red-500/20 to-pink-500/20" },
  Bakery: { label: "Bakery", emoji: "🧁", color: "from-pink-500/20 to-rose-500/20" },
  IceCream: { label: "Ice Cream & Gelato", emoji: "🍨", color: "from-cyan-500/20 to-blue-500/20" },
  TeaHouse: { label: "Tea House", emoji: "🫖", color: "from-emerald-500/20 to-teal-500/20" },
};

const CategoriesSection = () => {
  const cats = Object.entries(CATEGORY_META).map(([key, meta]) => ({
    key,
    ...meta,
    count: 12,
  }));

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-display">Templates for Every Business</h2>
          <p className="mt-4 text-muted-foreground">Find the perfect template for your type of food business.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cats.map((c) => (
            <Link
              key={c.key}
              to={`/marketplace?category=${c.key}`}
              className="group rounded-xl bg-card p-8 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 text-center"
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${c.color} mb-4 text-3xl`}>
                {c.emoji}
              </div>
              <h3 className="font-semibold text-lg">{c.label}</h3>
              <p className="text-sm text-muted-foreground mt-1">{c.count} templates</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
