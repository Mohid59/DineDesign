import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const AIQuizSection = () => {
  const navigate = useNavigate();
  const categories = useMemo(
    () => ["Restaurant", "Cafe", "Fast Food", "Bakery", "Ice Cream", "Tea House"],
    [],
  );
  const [category, setCategory] = useState("Any");
  const [style, setStyle] = useState("Any");
  const [budget, setBudget] = useState("Any");

  const startQuiz = () => {
    const query = new URLSearchParams();
    if (category !== "Any") query.set("category", category);
    if (style !== "Any") query.set("style", style);
    if (budget !== "Any") query.set("budget", budget);
    navigate(`/marketplace${query.toString() ? `?${query.toString()}` : ""}`);
  };

  return (
    <section className="py-20">
      <div className="container">
        <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-2 text-sm font-semibold text-primary">
            <Sparkles className="h-4 w-4" />
            AI Template Quiz
          </div>
          <h2 className="mt-2 text-2xl font-bold font-display">Get a quick recommendation</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Answer three short questions and jump directly to the best matching templates.
          </p>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            <label className="text-xs text-muted-foreground">
              Business type
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="mt-1 h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
              >
                <option>Any</option>
                {categories.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
            <label className="text-xs text-muted-foreground">
              Preferred style
              <select
                value={style}
                onChange={(event) => setStyle(event.target.value)}
                className="mt-1 h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
              >
                <option>Any</option>
                <option>Modern</option>
                <option>Minimal</option>
                <option>Luxury</option>
                <option>Dark</option>
              </select>
            </label>
            <label className="text-xs text-muted-foreground">
              Budget range
              <select
                value={budget}
                onChange={(event) => setBudget(event.target.value)}
                className="mt-1 h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
              >
                <option>Any</option>
                <option>1.0 to 1.2 lac</option>
                <option>1.3 to 1.5 lac</option>
                <option>1.7 to 1.9 lac</option>
                <option>2.0 to 2.5 lac</option>
              </select>
            </label>
          </div>
          <Button className="mt-5" onClick={startQuiz}>
            Show recommendations
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AIQuizSection;
