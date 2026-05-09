import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TemplateCard from "@/components/TemplateCard";
import { getTemplates } from "@/lib/api";
import type { Template } from "@/data/templates";
import { ListFilter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { getWishlistIds } from "@/lib/wishlist";

const normalizeValue = (value: string) =>
  String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, "");

const budgetRanges: Record<string, { min: number; max: number; plan: "growth" | "scale"; styleGroup: "minimal-dark" | "modern-luxury" }> = {
  "1.0 to 1.2 lac": { min: 100000, max: 120000, plan: "growth", styleGroup: "minimal-dark" },
  "1.3 to 1.5 lac": { min: 130000, max: 150000, plan: "growth", styleGroup: "modern-luxury" },
  "1.7 to 1.9 lac": { min: 170000, max: 190000, plan: "scale", styleGroup: "minimal-dark" },
  "2.0 to 2.5 lac": { min: 200000, max: 250000, plan: "scale", styleGroup: "modern-luxury" },
};
const budgetOrder = ["1.0 to 1.2 lac", "1.3 to 1.5 lac", "1.7 to 1.9 lac", "2.0 to 2.5 lac"] as const;

const growthCategories = new Set(["cafe", "icecream", "teahouse"]);
const scaleCategories = new Set(["restaurant", "bakery", "fastfood"]);

const getPlanForCategory = (normalizedCategory: string) => {
  if (growthCategories.has(normalizedCategory)) return "growth";
  if (scaleCategories.has(normalizedCategory)) return "scale";
  return null;
};

const getStyleGroup = (normalizedStyle: string) => {
  if (normalizedStyle === "minimal" || normalizedStyle === "dark") return "minimal-dark";
  if (normalizedStyle === "modern" || normalizedStyle === "luxury") return "modern-luxury";
  return null;
};

const Marketplace = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";
  const initialStyle = searchParams.get("style") || "All";
  const initialBudget = searchParams.get("budget") || "Any";
  const selectedPlan = searchParams.get("plan");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedStyle, setSelectedStyle] = useState(initialStyle);
  const [selectedBudget, setSelectedBudget] = useState(initialBudget);
  const [search, setSearch] = useState("");
  const [templates, setTemplates] = useState<Template[]>([]);
  const [error, setError] = useState("");
  const [showWishlistOnly, setShowWishlistOnly] = useState(false);

  useEffect(() => {
    const run = async () => {
      try {
        const res = await getTemplates();
        setTemplates(Array.isArray(res?.data) ? res.data : []);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to load templates");
      }
    };
    run();
  }, []);

  const categories = useMemo(() => {
    const uniq = Array.from(new Set(templates.map((t) => t.category)));
    return ["All", ...uniq];
  }, [templates]);

  const styles = useMemo(() => {
    const uniq = Array.from(new Set(templates.map((t) => t.style)));
    return ["All", ...uniq];
  }, [templates]);

  const categoriesForPlan = useMemo(() => {
    if (selectedPlan === "growth") {
      return new Set(["cafe", "icecream", "teahouse"]);
    }
    if (selectedPlan === "scale") {
      return new Set(["restaurant", "bakery", "fastfood"]);
    }
    return null;
  }, [selectedPlan]);

  const filtered = templates.filter((t) => {
    const normalizedTemplateCategory = normalizeValue(t.category);
    const normalizedTemplateStyle = normalizeValue(t.style);
    const normalizedSelectedCategory = normalizeValue(selectedCategory);
    const normalizedSelectedStyle = normalizeValue(selectedStyle);
    const selectedBudgetRange = budgetRanges[selectedBudget];
    const selectedBudgetLevel = budgetOrder.indexOf(selectedBudget as (typeof budgetOrder)[number]);

    if (
      selectedCategory !== "All" &&
      selectedCategory !== "Any" &&
      selectedStyle !== "All" &&
      selectedStyle !== "Any" &&
      selectedBudgetRange
    ) {
      const selectedPlan = getPlanForCategory(normalizedSelectedCategory);
      const selectedStyleGroup = getStyleGroup(normalizedSelectedStyle);
      const minimumRequiredBudgetLabel = budgetOrder.find(
        (label) =>
          budgetRanges[label].plan === selectedPlan && budgetRanges[label].styleGroup === selectedStyleGroup,
      );
      const minimumRequiredBudgetLevel = minimumRequiredBudgetLabel
        ? budgetOrder.indexOf(minimumRequiredBudgetLabel)
        : -1;
      if (
        !selectedPlan ||
        !selectedStyleGroup ||
        minimumRequiredBudgetLevel === -1 ||
        selectedBudgetLevel < minimumRequiredBudgetLevel
      ) {
        return false;
      }
    }

    if (categoriesForPlan) {
      if (!categoriesForPlan.has(normalizedTemplateCategory)) return false;
    }
    if (selectedCategory !== "All" && selectedCategory !== "Any" && normalizedTemplateCategory !== normalizedSelectedCategory)
      return false;
    if (selectedStyle !== "All" && selectedStyle !== "Any" && normalizedTemplateStyle !== normalizedSelectedStyle) return false;
    if (selectedBudgetRange && t.price > selectedBudgetRange.max) return false;
    if (search && !t.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (showWishlistOnly && !getWishlistIds().includes(t.id)) return false;
    return true;
  });

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container py-12">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold font-display">Template Marketplace</h1>
          <p className="mt-3 text-muted-foreground">
            Explore polished website templates, filter by category and style, then preview and customize before checkout.
          </p>
          {error ? <p className="mt-2 text-sm text-destructive">{error}</p> : null}
        </div>

        {/* Filters */}
        <div className="mt-8 grid gap-6 lg:grid-cols-[260px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-2xl border border-border bg-card p-4 shadow-sm">
              <p className="text-sm font-semibold">Filters</p>
              <div className="mt-4 space-y-3">
                <label className="text-xs text-muted-foreground">
                  Category
                  <select
                    value={selectedCategory}
                    onChange={(event) => setSelectedCategory(event.target.value)}
                    className="mt-1 h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="text-xs text-muted-foreground">
                  Style
                  <select
                    value={selectedStyle}
                    onChange={(event) => setSelectedStyle(event.target.value)}
                    className="mt-1 h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                  >
                    {styles.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="text-xs text-muted-foreground">
                  Budget
                  <select
                    value={selectedBudget}
                    onChange={(event) => setSelectedBudget(event.target.value)}
                    className="mt-1 h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option>Any</option>
                    <option>1.0 to 1.2 lac</option>
                    <option>1.3 to 1.5 lac</option>
                    <option>1.7 to 1.9 lac</option>
                    <option>2.0 to 2.5 lac</option>
                  </select>
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={showWishlistOnly}
                    onChange={(event) => setShowWishlistOnly(event.target.checked)}
                  />
                  Wishlist only
                </label>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setSearch("");
                    setSelectedCategory("All");
                    setSelectedStyle("All");
                    setSelectedBudget("Any");
                    setShowWishlistOnly(false);
                  }}
                >
                  Reset filters
                </Button>
              </div>
            </div>
          </aside>

          <section>
            <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-sm">
                <p className="text-muted-foreground">
                  Showing <span className="font-semibold text-foreground">{filtered.length}</span> of{" "}
                  <span className="font-semibold text-foreground">{templates.length}</span> templates
                </p>
                <div className="flex items-center gap-2">
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="sm" className="lg:hidden">
                        <ListFilter className="mr-1 h-4 w-4" />
                        Filters
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="bottom" className="rounded-t-2xl">
                      <SheetHeader>
                        <SheetTitle>Filter templates</SheetTitle>
                      </SheetHeader>
                      <div className="mt-4 space-y-3">
                        <label className="text-xs text-muted-foreground">
                          Category
                          <select
                            value={selectedCategory}
                            onChange={(event) => setSelectedCategory(event.target.value)}
                            className="mt-1 h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                          >
                            {categories.map((c) => (
                              <option key={c} value={c}>
                                {c}
                              </option>
                            ))}
                          </select>
                        </label>
                        <label className="text-xs text-muted-foreground">
                          Style
                          <select
                            value={selectedStyle}
                            onChange={(event) => setSelectedStyle(event.target.value)}
                            className="mt-1 h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                          >
                            {styles.map((s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                        </label>
                        <label className="text-xs text-muted-foreground">
                          Budget
                          <select
                            value={selectedBudget}
                            onChange={(event) => setSelectedBudget(event.target.value)}
                            className="mt-1 h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                          >
                            <option>Any</option>
                            <option>1.0 to 1.2 lac</option>
                            <option>1.3 to 1.5 lac</option>
                            <option>1.7 to 1.9 lac</option>
                            <option>2.0 to 2.5 lac</option>
                          </select>
                        </label>
                        <label className="flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            checked={showWishlistOnly}
                            onChange={(event) => setShowWishlistOnly(event.target.checked)}
                          />
                          Wishlist only
                        </label>
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
              </div>
              <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative w-full md:max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search templates..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-10 w-full rounded-lg border border-input bg-card pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
              </div>
            </div>

            {/* Grid */}
            <div className="mt-10 grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((t) => (
                <TemplateCard key={t.id} template={t} />
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="py-20 text-center">
                <p className="text-muted-foreground">No templates match your current filters.</p>
                <p className="mt-1 text-sm text-muted-foreground">Try clearing filters or searching by another keyword.</p>
              </div>
            )}
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Marketplace;
