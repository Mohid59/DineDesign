import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Check, Monitor, ShoppingCart, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { getTemplateById, getTemplatePreviewData } from "@/lib/api";
import type { TemplateTheme } from "@/data/templates";
import type { Template } from "@/data/templates";
import type { MenuItem } from "@/data/templates";
import AICustomizePanel, { type LayoutStyle } from "@/components/AICustomizePanel";
import { addCartItem } from "@/lib/cart";
import {
  TemplateHome,
  TemplateMenu,
  TemplateCart,
  TemplateCheckout,
  TemplateDashboard,
  TemplateReservation,
} from "@/components/preview/TemplatePages";

const tabs = [
  { id: "home", label: "Home" },
  { id: "menu", label: "Menu" },
  { id: "cart", label: "Cart" },
  { id: "checkout", label: "Checkout" },
  { id: "dashboard", label: "Dashboard" },
  { id: "reservation", label: "Reservation" },
];

type ThemeHistoryEntry = {
  id: string;
  label: string;
  theme: TemplateTheme;
  layoutStyle: LayoutStyle;
};

const historyKey = (templateId: string) => `template-history:${templateId}`;
const customizationKey = (templateId: string) => `template-customization:${templateId}`;

function isDark(hex: string) {
  const c = hex.replace("#", "");
  const full = c.length === 3 ? c.split("").map((x) => x + x).join("") : c;
  const r = Number.parseInt(full.substring(0, 2), 16);
  const g = Number.parseInt(full.substring(2, 4), 16);
  const b = Number.parseInt(full.substring(4, 6), 16);
  const brightness = 0.299 * r + 0.587 * g + 0.114 * b;
  return brightness < 140;
}

const TemplatePreview = () => {
  const { toast } = useToast();
  const { role } = useAuth();
  const canOrder = role === "client";
  const { id } = useParams<{ id: string }>();
  const [template, setTemplate] = useState<Template | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("home");
  const [isMobile, setIsMobile] = useState(false);
  const [customTheme, setCustomTheme] = useState<TemplateTheme | null>(null);
  const [previewMenuItems, setPreviewMenuItems] = useState<MenuItem[]>([]);
  const [layoutStyle, setLayoutStyle] = useState<LayoutStyle>("Classic");
  const [compareMode, setCompareMode] = useState(false);
  const [comparePosition, setComparePosition] = useState(50);
  const [history, setHistory] = useState<ThemeHistoryEntry[]>([]);
  const isCustomized = customTheme !== null;
  const lastCustomizationSignature = useRef("");

  useEffect(() => {
    const run = async () => {
      if (!id) return;
      setLoading(true);
      setError("");
      try {
        const res = await getTemplateById(id);
        const nextTemplate = res?.data || null;
        setTemplate(nextTemplate);
        const preview = await getTemplatePreviewData(id);
        setPreviewMenuItems(Array.isArray(preview?.data?.menuItems) ? preview.data.menuItems : []);
        if (nextTemplate) {
          const raw = window.localStorage.getItem(historyKey(nextTemplate.id));
          if (raw) {
            try {
              setHistory(JSON.parse(raw) as ThemeHistoryEntry[]);
            } catch {
              setHistory([]);
            }
          } else {
            setHistory([]);
          }
        }
      } catch (e) {
        setTemplate(null);
        setError(e instanceof Error ? e.message : "Failed to load template");
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [id]);

  const activeTheme = customTheme || template?.theme || null;
  const isDarkMode = useMemo(() => (activeTheme ? isDark(activeTheme.background) : false), [activeTheme]);

  useEffect(() => {
    if (!template || !customTheme) return;

    setHistory((prev) => {
      const nextEntry: ThemeHistoryEntry = {
        id: `${Date.now()}`,
        label: `${customTheme.brandName} ${new Date().toLocaleTimeString()}`,
        theme: customTheme,
        layoutStyle,
      };
      const last = prev[0];
      if (last && JSON.stringify(last.theme) === JSON.stringify(nextEntry.theme) && last.layoutStyle === nextEntry.layoutStyle) {
        return prev;
      }
      const next = [nextEntry, ...prev].slice(0, 10);
      window.localStorage.setItem(historyKey(template.id), JSON.stringify(next));
      window.localStorage.setItem(
        customizationKey(template.id),
        JSON.stringify({ theme: customTheme, layoutStyle }),
      );
      return next;
    });
  }, [customTheme, layoutStyle, template]);

  useEffect(() => {
    if (!customTheme) return;
    const nextSignature = JSON.stringify({ theme: customTheme, layoutStyle });
    if (lastCustomizationSignature.current === nextSignature) return;
    lastCustomizationSignature.current = nextSignature;
    toast({
      title: "Customized changes saved",
      description: "Your template updates are applied successfully.",
    });
  }, [customTheme, layoutStyle, toast]);

  const restoreHistory = (entryId: string) => {
    const found = history.find((h) => h.id === entryId);
    if (!found) return;
    setCustomTheme(found.theme);
    setLayoutStyle(found.layoutStyle);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading template...</div>;
  }

  if (!template || !activeTheme) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Template not found</h1>
          {error ? <p className="mt-2 text-sm text-destructive">{error}</p> : null}
          <Button asChild className="mt-4">
            <Link to="/marketplace">Back to Marketplace</Link>
          </Button>
        </div>
      </div>
    );
  }

  const previewLayoutClass = (() => {
    switch (layoutStyle) {
      case "Modern Grid":
        return "p-4";
      case "Full Width":
        return "p-0";
      case "Minimal":
        return "p-2";
      default:
        return "p-3";
    }
  })();

  const renderPage = (theme: TemplateTheme) => {
    const meta = { style: template.style, category: template.category };
    switch (activeTab) {
      case "home": return <TemplateHome theme={theme} menuItems={previewMenuItems} meta={meta} />;
      case "menu": return <TemplateMenu theme={theme} menuItems={previewMenuItems} meta={meta} />;
      case "cart": return <TemplateCart theme={theme} menuItems={previewMenuItems} />;
      case "checkout": return <TemplateCheckout theme={theme} menuItems={previewMenuItems} />;
      case "dashboard": return <TemplateDashboard theme={theme} />;
      case "reservation": return <TemplateReservation theme={theme} />;
      default: return <TemplateHome theme={theme} menuItems={previewMenuItems} meta={meta} />;
    }
  };

  return (
    <div className="min-h-screen bg-muted/50">
      {/* Top bar */}
      <div className={`sticky top-0 z-50 border-b border-border ${isDarkMode ? "bg-slate-900 text-slate-100" : "bg-background"}`}>
        <div className="container flex items-center justify-between h-14">
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" size="sm">
              <Link to="/marketplace">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
              </Link>
            </Button>
            <div className="hidden sm:block">
              <h1 className="text-sm font-semibold">{activeTheme.brandName}</h1>
              <p className="text-xs text-muted-foreground">
                {template.category} • {template.style} • {layoutStyle}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-1 bg-muted rounded-lg p-1">
              <button
                onClick={() => setIsMobile(false)}
                className={`p-1.5 rounded-md transition-all ${!isMobile ? "bg-background shadow-sm" : ""}`}
              >
                <Monitor className="h-4 w-4" />
              </button>
              <button
                onClick={() => setIsMobile(true)}
                className={`p-1.5 rounded-md transition-all ${isMobile ? "bg-background shadow-sm" : ""}`}
              >
                <Smartphone className="h-4 w-4" />
              </button>
            </div>
            {canOrder ? (
              <>
                <Button asChild size="sm" className="bg-hero-gradient text-primary-foreground hover:opacity-90">
                  <Link
                    to={`/checkout/${template.id}`}
                    state={{
                      customizedTheme: isCustomized ? activeTheme : undefined,
                      layoutStyle: isCustomized ? layoutStyle : undefined,
                      isCustomized,
                    }}
                  >
                    <Check className="h-4 w-4 mr-1" />
                    {isCustomized ? "Proceed with customized template" : "Proceed with template"} - PKR{" "}
                    {template.price.toLocaleString()}
                  </Link>
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    addCartItem({
                      id: `${template.id}-${Date.now()}`,
                      templateId: template.id,
                      templateName: template.name,
                      price: template.price,
                      priceType: template.priceType,
                      customizedTheme: activeTheme,
                      layoutStyle,
                      isCustomized,
                      addedAt: new Date().toISOString(),
                    });
                    toast({
                      title: "Added to cart",
                      description: isCustomized
                        ? `${activeTheme.brandName} customization saved in your cart.`
                        : `${template.name} template added to your cart.`,
                    });
                  }}
                >
                  Save to cart
                </Button>
              </>
            ) : (
              <span className="rounded-md border border-border px-3 py-1.5 text-xs text-muted-foreground">
                Ordering is available for client accounts only
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Tab bar */}
      <div className="bg-background border-b border-border">
        <div className="container flex gap-0 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-all ${
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.id === "cart" && <ShoppingCart className="h-3.5 w-3.5 inline mr-1.5" />}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Preview area with customization sidebar */}
      <div className="container py-6">
        <div className="mb-4 rounded-xl border border-border bg-card px-4 py-3 text-sm text-muted-foreground">
          Preview page: <span className="font-semibold text-foreground">{tabs.find((t) => t.id === activeTab)?.label}</span>.
          Customize brand, colors, typography, and layout from the right panel.
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setCompareMode((prev) => !prev)}
              className={`rounded-md border px-2.5 py-1.5 text-xs ${
                compareMode ? "border-primary bg-primary/10 text-foreground" : "border-border"
              }`}
            >
              {compareMode ? "Hide before/after" : "Show before/after"}
            </button>
            {compareMode ? (
              <input
                type="range"
                min={0}
                max={100}
                value={comparePosition}
                onChange={(event) => setComparePosition(Number(event.target.value))}
                className="w-44"
              />
            ) : null}
          </div>
        </div>
        <div className="flex gap-6">
          {/* Preview */}
          <div className={`flex-1 min-w-0 transition-all duration-500`}>
            <div className={`mx-auto transition-all duration-500 ${isMobile ? "max-w-[375px]" : "max-w-5xl"}`}>
              <div className="rounded-xl overflow-hidden shadow-elevated bg-card">
                <div className="flex items-center gap-2 px-4 py-2.5 bg-muted/80 border-b border-border">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-destructive/60" />
                    <div className="w-3 h-3 rounded-full bg-warm/60" />
                    <div className="w-3 h-3 rounded-full bg-primary/30" />
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="bg-background rounded-md px-3 py-1 text-xs text-muted-foreground text-center">
                      {activeTheme.brandName.toLowerCase().replace(/\s/g, "")}.dinedesign.pk
                    </div>
                  </div>
                </div>
                <div className={`overflow-y-auto ${previewLayoutClass} relative`} style={{ height: isMobile ? 667 : 600 }}>
                  {compareMode ? (
                    <>
                      <div className="absolute inset-0 overflow-hidden">
                        {renderPage(template.theme)}
                      </div>
                      <div
                        className="absolute inset-y-0 left-0 overflow-hidden border-r border-primary/50"
                        style={{ width: `${comparePosition}%` }}
                      >
                        <div className="h-full min-w-[1000px]">{renderPage(activeTheme)}</div>
                      </div>
                      <div
                        className="absolute inset-y-0 w-0.5 bg-primary/70"
                        style={{ left: `${comparePosition}%` }}
                      />
                    </>
                  ) : (
                    renderPage(activeTheme)
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Customization sidebar - desktop */}
          <div className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-20">
              <AICustomizePanel
                theme={activeTheme}
                onThemeChange={setCustomTheme}
                originalTheme={template.theme}
                layoutStyle={layoutStyle}
                onLayoutStyleChange={setLayoutStyle}
                history={history}
                onRestoreHistory={restoreHistory}
              />
            </div>
          </div>
        </div>

        {/* Customization panel - mobile/tablet */}
        <div className="lg:hidden mt-6">
          <AICustomizePanel
            theme={activeTheme}
            onThemeChange={setCustomTheme}
            originalTheme={template.theme}
            layoutStyle={layoutStyle}
            onLayoutStyleChange={setLayoutStyle}
            history={history}
            onRestoreHistory={restoreHistory}
          />
        </div>
      </div>
    </div>
  );
};

export default TemplatePreview;
