import { useState, type ChangeEvent } from "react";
import { Sparkles, RotateCcw, Wand2, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { TemplateTheme } from "@/data/templates";

export type LayoutStyle = "Classic" | "Modern Grid" | "Full Width" | "Minimal";

type ThemeSnapshot = {
  id: string;
  label: string;
  theme: TemplateTheme;
  layoutStyle: LayoutStyle;
};

interface AICustomizePanelProps {
  theme: TemplateTheme;
  originalTheme: TemplateTheme;
  layoutStyle: LayoutStyle;
  history: ThemeSnapshot[];
  onThemeChange: (theme: TemplateTheme | null) => void;
  onLayoutStyleChange: (style: LayoutStyle) => void;
  onRestoreHistory: (id: string) => void;
}

const FONT_PAIRS = [
  { label: "Elegant Serif", heading: "'Playfair Display', serif", body: "'Inter', sans-serif" },
  { label: "Modern Sans", heading: "'Inter', sans-serif", body: "'Inter', sans-serif" },
  { label: "Classic Contrast", heading: "'Georgia', serif", body: "'Helvetica Neue', sans-serif" },
  { label: "Premium Editorial", heading: "'Times New Roman', serif", body: "'Arial', sans-serif" },
  { label: "Friendly Rounded", heading: "'Trebuchet MS', sans-serif", body: "'Verdana', sans-serif" },
  { label: "Minimal Clean", heading: "'Segoe UI', sans-serif", body: "'Arial', sans-serif" },
] as const;

const MOOD_PRESETS: Array<{
  label: string;
  theme: Pick<TemplateTheme, "primary" | "secondary" | "accent" | "background" | "foreground" | "cardBg">;
  suggestedBrand: string;
}> = [
  {
    label: "Cozy & Warm",
    suggestedBrand: "Hearth & Spoon",
    theme: { primary: "#b45309", secondary: "#7c2d12", accent: "#f59e0b", background: "#fff7ed", foreground: "#3f1d0f", cardBg: "#ffedd5" },
  },
  {
    label: "Luxury & Elegant",
    suggestedBrand: "Velvet Table",
    theme: { primary: "#a16207", secondary: "#1f2937", accent: "#fbbf24", background: "#111827", foreground: "#f9fafb", cardBg: "#1f2937" },
  },
  {
    label: "Fresh & Natural",
    suggestedBrand: "GreenFork",
    theme: { primary: "#16a34a", secondary: "#14532d", accent: "#22c55e", background: "#f0fdf4", foreground: "#14532d", cardBg: "#dcfce7" },
  },
  {
    label: "Modern & Bold",
    suggestedBrand: "Pulse Kitchen",
    theme: { primary: "#ef4444", secondary: "#1f2937", accent: "#f97316", background: "#f8fafc", foreground: "#0f172a", cardBg: "#e2e8f0" },
  },
  {
    label: "Vintage & Rustic",
    suggestedBrand: "Copper Oven",
    theme: { primary: "#92400e", secondary: "#78350f", accent: "#d97706", background: "#fffbeb", foreground: "#451a03", cardBg: "#fef3c7" },
  },
  {
    label: "Minimal & Clean",
    suggestedBrand: "Plain Plate",
    theme: { primary: "#334155", secondary: "#64748b", accent: "#0ea5e9", background: "#ffffff", foreground: "#0f172a", cardBg: "#f8fafc" },
  },
];

function isDark(hex: string) {
  const c = hex.replace("#", "");
  const full = c.length === 3 ? c.split("").map((x) => x + x).join("") : c;
  const r = Number.parseInt(full.substring(0, 2), 16);
  const g = Number.parseInt(full.substring(2, 4), 16);
  const b = Number.parseInt(full.substring(4, 6), 16);
  const brightness = 0.299 * r + 0.587 * g + 0.114 * b;
  return brightness < 140;
}

function pickPresetFromPrompt(prompt: string) {
  const p = prompt.toLowerCase();
  if (p.includes("cozy") || p.includes("warm")) return MOOD_PRESETS[0];
  if (p.includes("luxury") || p.includes("elegant")) return MOOD_PRESETS[1];
  if (p.includes("fresh") || p.includes("natural") || p.includes("green")) return MOOD_PRESETS[2];
  if (p.includes("bold") || p.includes("modern")) return MOOD_PRESETS[3];
  if (p.includes("vintage") || p.includes("rustic")) return MOOD_PRESETS[4];
  return MOOD_PRESETS[5];
}

function suggestBrandName(prompt: string, fallback: string) {
  const words = prompt
    .replace(/[^a-zA-Z\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase() + w.slice(1).toLowerCase());
  if (words.length === 0) return fallback;
  if (words.length === 1) return `${words[0]} Kitchen`;
  return `${words[0]} ${words[1]}`;
}

const AICustomizePanel = ({
  theme,
  originalTheme,
  layoutStyle,
  history,
  onThemeChange,
  onLayoutStyleChange,
  onRestoreHistory,
}: AICustomizePanelProps) => {
  const [prompt, setPrompt] = useState("");

  const handleChange =
    (field: keyof TemplateTheme) => (event: ChangeEvent<HTMLInputElement>) => {
      onThemeChange({
        ...theme,
        [field]: event.target.value,
      });
    };

  const applyMoodPreset = (label: string) => {
    const preset = MOOD_PRESETS.find((item) => item.label === label);
    if (!preset) return;
    onThemeChange({
      ...theme,
      ...preset.theme,
      brandName: preset.suggestedBrand,
    });
  };

  const generateFromPrompt = () => {
    const selected = pickPresetFromPrompt(prompt);
    const brandName = suggestBrandName(prompt, selected.suggestedBrand);
    const autoDark = isDark(selected.theme.background);
    const foreground = autoDark ? "#f9fafb" : selected.theme.foreground;
    onThemeChange({
      ...theme,
      ...selected.theme,
      foreground,
      brandName,
    });
  };

  return (
    <div className="rounded-2xl border border-border bg-background p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Sparkles className="h-4 w-4 text-primary" />
            AI Customize
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Live-edit the brand identity used by the preview pages.
          </p>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => onThemeChange(null)}
          title="Reset theme"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>

      <div className="mt-5 space-y-4">
        <div className="rounded-xl border border-border p-3">
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <Wand2 className="h-3.5 w-3.5" />
            AI Theme Generator
          </div>
          <textarea
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            placeholder='e.g. "cozy Italian pizzeria with warm earth tones"'
            className="h-20 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
          <Button type="button" className="mt-2 w-full" onClick={generateFromPrompt}>
            Generate Theme from Prompt
          </Button>
        </div>

        <div className="rounded-xl border border-border p-3">
          <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Mood Presets
          </div>
          <div className="grid grid-cols-2 gap-2">
            {MOOD_PRESETS.map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => applyMoodPreset(preset.label)}
                className="rounded-lg border border-border px-2 py-2 text-left text-xs hover:bg-secondary/60"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        <label className="block">
          <span className="mb-1 block text-xs font-medium text-muted-foreground">
            Brand name
          </span>
          <input
            value={theme.brandName}
            onChange={handleChange("brandName")}
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-xs font-medium text-muted-foreground">
            Logo URL
          </span>
          <input
            value={theme.logoUrl || ""}
            onChange={(event) =>
              onThemeChange({
                ...theme,
                logoUrl: event.target.value.trim(),
              })
            }
            placeholder="https://your-brand.com/logo.png"
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </label>

        <div className="grid grid-cols-2 gap-3">
          {(
            [
              ["primary", "Primary color"],
              ["secondary", "Secondary color"],
              ["accent", "Accent color"],
              ["background", "Background"],
              ["foreground", "Foreground"],
              ["cardBg", "Card Background"],
            ] as const
          ).map(([field, label]) => (
            <label key={field} className="block">
              <span className="mb-1 block text-xs font-medium text-muted-foreground">
                {label}
              </span>
              <input
                type="color"
                value={theme[field]}
                onChange={handleChange(field)}
                className="h-10 w-full cursor-pointer rounded-lg border border-input bg-background p-1"
              />
            </label>
          ))}
        </div>

        <div className="rounded-xl border border-border p-3">
          <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Typography
          </div>
          <div className="grid grid-cols-1 gap-2">
            {FONT_PAIRS.map((pair) => (
              <button
                key={pair.label}
                type="button"
                onClick={() =>
                  onThemeChange({
                    ...theme,
                    fontHeading: pair.heading,
                    fontBody: pair.body,
                  })
                }
                className="rounded-lg border border-border px-3 py-2 text-left text-xs hover:bg-secondary/60"
              >
                {pair.label}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border p-3">
          <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Layout Style
          </div>
          <div className="grid grid-cols-2 gap-2">
            {(["Classic", "Modern Grid", "Full Width", "Minimal"] as const).map((style) => (
              <button
                key={style}
                type="button"
                onClick={() => onLayoutStyleChange(style)}
                className={`rounded-lg border px-3 py-2 text-xs ${
                  layoutStyle === style ? "border-primary bg-primary/10" : "border-border hover:bg-secondary/60"
                }`}
              >
                {style}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border p-3">
          <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Quick Customize Checklist
          </div>
          <ul className="space-y-1 text-xs text-muted-foreground">
            <li>- Add your logo and brand name</li>
            <li>- Update menu sections and featured items</li>
            <li>- Pick colors and typography</li>
            <li>- Refine hero and about content</li>
          </ul>
        </div>

        <div className="rounded-xl border border-border p-3">
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <History className="h-3.5 w-3.5" />
            Theme History
          </div>
          <div className="space-y-2">
            {history.length === 0 ? (
              <p className="text-xs text-muted-foreground">No history yet.</p>
            ) : (
              history.map((entry) => (
                <button
                  key={entry.id}
                  type="button"
                  onClick={() => onRestoreHistory(entry.id)}
                  className="flex w-full items-center justify-between rounded-lg border border-border px-3 py-2 text-xs hover:bg-secondary/60"
                >
                  <span>{entry.label}</span>
                  <span className="text-muted-foreground">{entry.layoutStyle}</span>
                </button>
              ))
            )}
          </div>
        </div>

        <div className="rounded-xl bg-secondary/60 p-3 text-xs text-muted-foreground">
          Current preset: <span className="font-semibold text-foreground">{originalTheme.brandName}</span>
        </div>
      </div>
    </div>
  );
};

export default AICustomizePanel;
