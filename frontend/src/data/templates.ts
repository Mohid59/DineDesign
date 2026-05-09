export interface Template {
  id: string;
  name: string;
  category: string;
  style: string;
  price: number;
  priceType: "monthly" | "one-time";
  subscriptionMonthly?: number;
  subscriptionDuration?: string;
  tags: string[];
  description: string;
  theme: TemplateTheme;
}

export interface TemplateTheme {
  primary: string;
  secondary: string;
  background: string;
  foreground: string;
  accent: string;
  cardBg: string;
  fontHeading: string;
  fontBody: string;
  heroImage: string;
  brandName: string;
  logoUrl?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

export const menuItems: MenuItem[] = [
  { id: "1", name: "Grilled Salmon", description: "Atlantic salmon with lemon butter sauce", price: 2400, category: "Main Course", image: "🐟" },
  { id: "2", name: "Caesar Salad", description: "Romaine lettuce, croutons, parmesan", price: 1200, category: "Starters", image: "🥗" },
  { id: "3", name: "Beef Tenderloin", description: "Premium beef with mushroom sauce", price: 3200, category: "Main Course", image: "🥩" },
  { id: "4", name: "Bruschetta", description: "Toasted bread with tomato and basil", price: 800, category: "Starters", image: "🍞" },
  { id: "5", name: "Tiramisu", description: "Classic Italian coffee dessert", price: 900, category: "Desserts", image: "🍰" },
  { id: "6", name: "Mango Lassi", description: "Creamy yogurt mango drink", price: 500, category: "Drinks", image: "🥤" },
  { id: "7", name: "Chicken Biryani", description: "Aromatic basmati rice with tender chicken", price: 1800, category: "Main Course", image: "🍛" },
  { id: "8", name: "Garlic Bread", description: "Butter garlic bread with herbs", price: 600, category: "Starters", image: "🧄" },
  { id: "9", name: "Chocolate Lava Cake", description: "Warm chocolate cake with molten center", price: 1100, category: "Desserts", image: "🍫" },
  { id: "10", name: "Fresh Lime Soda", description: "Refreshing lime with soda water", price: 350, category: "Drinks", image: "🍋" },
  { id: "11", name: "Pasta Carbonara", description: "Creamy pasta with bacon and parmesan", price: 1600, category: "Main Course", image: "🍝" },
  { id: "12", name: "Cappuccino", description: "Rich espresso with steamed milk foam", price: 450, category: "Drinks", image: "☕" },
];

const rawTemplates: Template[] = [
  // ── Restaurant (4) ──
  {
    id: "urbanbite",
    name: "UrbanBite",
    category: "Restaurant",
    style: "Modern",
    price: 15000,
    priceType: "one-time",
    tags: ["Modern", "Dark", "Trendy"],
    description: "A sleek, modern dark-themed restaurant template perfect for urban dining experiences.",
    theme: {
      primary: "#F97316",
      secondary: "#1a1a2e",
      background: "#0f0f1a",
      foreground: "#ffffff",
      accent: "#fb923c",
      cardBg: "#1a1a2e",
      fontHeading: "'Playfair Display', serif",
      fontBody: "'Inter', sans-serif",
      heroImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200",
      brandName: "UrbanBite",
    },
  },
  {
    id: "luxedine",
    name: "LuxeDine",
    category: "Restaurant",
    style: "Luxury",
    price: 25000,
    priceType: "one-time",
    tags: ["Luxury", "Elegant", "Gold"],
    description: "An elegant luxury restaurant template with gold accents and refined typography.",
    theme: {
      primary: "#b8860b",
      secondary: "#1a1a1a",
      background: "#0a0a0a",
      foreground: "#f5f5dc",
      accent: "#daa520",
      cardBg: "#1a1a1a",
      fontHeading: "'Playfair Display', serif",
      fontBody: "'Inter', sans-serif",
      heroImage: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200",
      brandName: "LuxeDine",
    },
  },
  {
    id: "zenplate",
    name: "ZenPlate",
    category: "Restaurant",
    style: "Minimal",
    price: 18000,
    priceType: "one-time",
    tags: ["Minimal", "Clean", "Elegant"],
    description: "A zen-inspired minimal restaurant template with lots of whitespace and subtle details.",
    theme: {
      primary: "#059669",
      secondary: "#ecfdf5",
      background: "#ffffff",
      foreground: "#1a1a1a",
      accent: "#10b981",
      cardBg: "#f0fdf4",
      fontHeading: "'Playfair Display', serif",
      fontBody: "'Inter', sans-serif",
      heroImage: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=1200",
      brandName: "ZenPlate",
    },
  },
  {
    id: "spiceroute",
    name: "SpiceRoute",
    category: "Restaurant",
    style: "Modern",
    price: 16000,
    priceType: "monthly",
    tags: ["Vibrant", "Spicy", "Cultural"],
    description: "A vibrant, culturally-rich restaurant template with warm spice tones.",
    theme: {
      primary: "#c2410c",
      secondary: "#431407",
      background: "#1a0a00",
      foreground: "#fff7ed",
      accent: "#ea580c",
      cardBg: "#2a1a0a",
      fontHeading: "'Playfair Display', serif",
      fontBody: "'Inter', sans-serif",
      heroImage: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=1200",
      brandName: "SpiceRoute",
    },
  },

  // ── Café (4) ──
  {
    id: "cafeaura",
    name: "CaféAura",
    category: "Café",
    style: "Minimal",
    price: 10000,
    priceType: "monthly",
    tags: ["Minimal", "Warm", "Café"],
    description: "A warm, minimal café template with earthy tones and clean typography.",
    theme: {
      primary: "#92400e",
      secondary: "#fef3c7",
      background: "#fffbeb",
      foreground: "#1c1917",
      accent: "#d97706",
      cardBg: "#ffffff",
      fontHeading: "'Playfair Display', serif",
      fontBody: "'Inter', sans-serif",
      heroImage: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200",
      brandName: "CaféAura",
    },
  },
  {
    id: "brewhaus",
    name: "BrewHaus",
    category: "Café",
    style: "Dark",
    price: 14000,
    priceType: "one-time",
    tags: ["Dark", "Coffee", "Industrial"],
    description: "An industrial dark-themed café template for specialty coffee shops.",
    theme: {
      primary: "#78350f",
      secondary: "#292524",
      background: "#1c1917",
      foreground: "#fafaf9",
      accent: "#a16207",
      cardBg: "#292524",
      fontHeading: "'Playfair Display', serif",
      fontBody: "'Inter', sans-serif",
      heroImage: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200",
      brandName: "BrewHaus",
    },
  },
  {
    id: "morningbloom",
    name: "MorningBloom",
    category: "Café",
    style: "Modern",
    price: 12000,
    priceType: "one-time",
    tags: ["Fresh", "Green", "Modern"],
    description: "A fresh, green-themed modern café template perfect for brunch spots and juice bars.",
    theme: {
      primary: "#16a34a",
      secondary: "#dcfce7",
      background: "#f0fdf4",
      foreground: "#14532d",
      accent: "#22c55e",
      cardBg: "#ffffff",
      fontHeading: "'Inter', sans-serif",
      fontBody: "'Inter', sans-serif",
      heroImage: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200",
      brandName: "MorningBloom",
    },
  },
  {
    id: "velvetbean",
    name: "VelvetBean",
    category: "Café",
    style: "Luxury",
    price: 18000,
    priceType: "one-time",
    tags: ["Luxury", "Velvet", "Premium"],
    description: "A premium luxury café template with deep plum tones and sophisticated aesthetics.",
    theme: {
      primary: "#7c3aed",
      secondary: "#2e1065",
      background: "#0f0720",
      foreground: "#f5f3ff",
      accent: "#a78bfa",
      cardBg: "#1e1040",
      fontHeading: "'Playfair Display', serif",
      fontBody: "'Inter', sans-serif",
      heroImage: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1200",
      brandName: "VelvetBean",
    },
  },

  // ── Fast Food (4) ──
  {
    id: "quickbite",
    name: "QuickBite",
    category: "Fast Food",
    style: "Modern",
    price: 8000,
    priceType: "one-time",
    tags: ["Bold", "Fast Food", "Energetic"],
    description: "A bold, energetic fast food template with vibrant colors and playful design.",
    theme: {
      primary: "#dc2626",
      secondary: "#fef08a",
      background: "#ffffff",
      foreground: "#1a1a1a",
      accent: "#f59e0b",
      cardBg: "#fff7ed",
      fontHeading: "'Inter', sans-serif",
      fontBody: "'Inter', sans-serif",
      heroImage: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=1200",
      brandName: "QuickBite",
    },
  },
  {
    id: "burgerjoint",
    name: "BurgerJoint",
    category: "Fast Food",
    style: "Dark",
    price: 10000,
    priceType: "one-time",
    tags: ["Dark", "Burgers", "Gritty"],
    description: "A gritty, dark-themed burger joint template with bold typography and neon accents.",
    theme: {
      primary: "#eab308",
      secondary: "#1c1917",
      background: "#0c0a09",
      foreground: "#fafaf9",
      accent: "#facc15",
      cardBg: "#1c1917",
      fontHeading: "'Inter', sans-serif",
      fontBody: "'Inter', sans-serif",
      heroImage: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1200",
      brandName: "BurgerJoint",
    },
  },
  {
    id: "pizzapulse",
    name: "PizzaPulse",
    category: "Fast Food",
    style: "Modern",
    price: 9000,
    priceType: "monthly",
    tags: ["Pizza", "Fun", "Vibrant"],
    description: "A fun, vibrant pizza delivery template with energetic orange-red color scheme.",
    theme: {
      primary: "#ea580c",
      secondary: "#fff7ed",
      background: "#fffbeb",
      foreground: "#1a1a1a",
      accent: "#f97316",
      cardBg: "#ffffff",
      fontHeading: "'Inter', sans-serif",
      fontBody: "'Inter', sans-serif",
      heroImage: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200",
      brandName: "PizzaPulse",
    },
  },
  {
    id: "wrapnroll",
    name: "Wrap&Roll",
    category: "Fast Food",
    style: "Minimal",
    price: 7500,
    priceType: "one-time",
    tags: ["Minimal", "Clean", "Healthy"],
    description: "A clean, minimal fast food template ideal for wraps, salads, and healthy fast casual.",
    theme: {
      primary: "#0d9488",
      secondary: "#ccfbf1",
      background: "#ffffff",
      foreground: "#134e4a",
      accent: "#14b8a6",
      cardBg: "#f0fdfa",
      fontHeading: "'Inter', sans-serif",
      fontBody: "'Inter', sans-serif",
      heroImage: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=1200",
      brandName: "Wrap&Roll",
    },
  },

  // ── Bakery (4) ──
  {
    id: "sweetcrumb",
    name: "SweetCrumb",
    category: "Bakery",
    style: "Minimal",
    price: 12000,
    priceType: "one-time",
    tags: ["Soft", "Bakery", "Pastel"],
    description: "A soft, pastel bakery template with delicate design and warm aesthetics.",
    theme: {
      primary: "#be185d",
      secondary: "#fce7f3",
      background: "#fff1f2",
      foreground: "#1c1917",
      accent: "#ec4899",
      cardBg: "#ffffff",
      fontHeading: "'Playfair Display', serif",
      fontBody: "'Inter', sans-serif",
      heroImage: "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=1200",
      brandName: "SweetCrumb",
    },
  },
  {
    id: "goldencrust",
    name: "GoldenCrust",
    category: "Bakery",
    style: "Luxury",
    price: 20000,
    priceType: "one-time",
    tags: ["Luxury", "Gold", "Artisan"],
    description: "A luxurious artisan bakery template with warm gold tones and elegant typography.",
    theme: {
      primary: "#a16207",
      secondary: "#fef9c3",
      background: "#fffbeb",
      foreground: "#1c1917",
      accent: "#ca8a04",
      cardBg: "#ffffff",
      fontHeading: "'Playfair Display', serif",
      fontBody: "'Inter', sans-serif",
      heroImage: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1200",
      brandName: "GoldenCrust",
    },
  },
  {
    id: "flourpower",
    name: "FlourPower",
    category: "Bakery",
    style: "Modern",
    price: 11000,
    priceType: "monthly",
    tags: ["Modern", "Bold", "Colorful"],
    description: "A bold, modern bakery template with bright colors and playful layouts.",
    theme: {
      primary: "#e11d48",
      secondary: "#fecdd3",
      background: "#ffffff",
      foreground: "#1a1a1a",
      accent: "#fb7185",
      cardBg: "#fff1f2",
      fontHeading: "'Inter', sans-serif",
      fontBody: "'Inter', sans-serif",
      heroImage: "https://images.unsplash.com/photo-1486427944544-d2c246c4d599?w=1200",
      brandName: "FlourPower",
    },
  },
  {
    id: "midnightbake",
    name: "MidnightBake",
    category: "Bakery",
    style: "Dark",
    price: 14000,
    priceType: "one-time",
    tags: ["Dark", "Moody", "Premium"],
    description: "A moody, dark bakery template with dramatic lighting and premium feel.",
    theme: {
      primary: "#f472b6",
      secondary: "#1e1b2e",
      background: "#0f0d1a",
      foreground: "#fdf2f8",
      accent: "#ec4899",
      cardBg: "#1e1b2e",
      fontHeading: "'Playfair Display', serif",
      fontBody: "'Inter', sans-serif",
      heroImage: "https://images.unsplash.com/photo-1555507036-ab1f4159c0d2?w=1200",
      brandName: "MidnightBake",
    },
  },
];

const caseOneCategories = new Set(["Café", "Cafe", "IceCream", "TeaHouse"]);
const caseTwoCategories = new Set(["Restaurant", "Bakery", "Fast Food", "Fastfood"]);

const pricingByStyle = {
  case1: {
    Minimal: { total: 100000, monthly: 10000, duration: "10 months" },
    Dark: { total: 120000, monthly: 10000, duration: "12 months" },
    Modern: { total: 130000, monthly: 12000, duration: "11 months" },
    Luxury: { total: 150000, monthly: 12000, duration: "13 months" },
  },
  case2: {
    Minimal: { total: 170000, monthly: 15000, duration: "11.33 months" },
    Dark: { total: 190000, monthly: 15000, duration: "12.67 months" },
    Modern: { total: 200000, monthly: 17000, duration: "11.76 months" },
    Luxury: { total: 250000, monthly: 17000, duration: "14.71 months" },
  },
} as const;

const pakistaniBrandNames: Record<string, string> = {
  urbanbite: "Lahori Ember",
  zenplate: "Sukoon Dastarkhwan",
  luxedine: "Noor Mahal Kitchen",
  spiceroute: "Karachi Tandoor Co",
  cafeaura: "Chai Junction PK",
  brewhaus: "Roast Gali Cafe",
  morningbloom: "Nasta Avenue",
  velvetbean: "Bean Darbar",
  quickbite: "Bun Kabab Express",
  wrapnroll: "Roll Point PK",
  burgerjoint: "Grill Adda",
  pizzapulse: "Pizza Bazar",
  sweetcrumb: "Mithaas Oven",
  midnightbake: "Shehr-e-Bake",
  goldencrust: "Badshahi Bakers",
  flourpower: "Atta & Artisan",
};

const applyPakistaniNaming = (template: Template): Template => {
  const nextName = pakistaniBrandNames[template.id];
  if (!nextName) return template;

  return {
    ...template,
    name: nextName,
    theme: {
      ...template.theme,
      brandName: nextName,
    },
  };
};

const applyCategoryStylePricing = (template: Template): Template => {
  const normalizedStyle = template.style as keyof (typeof pricingByStyle)["case1"];
  const group = caseOneCategories.has(template.category)
    ? "case1"
    : caseTwoCategories.has(template.category)
      ? "case2"
      : null;

  if (!group || !(normalizedStyle in pricingByStyle[group])) {
    return template;
  }

  const matched = pricingByStyle[group][normalizedStyle];
  return {
    ...template,
    price: matched.total,
    priceType: "one-time",
    subscriptionMonthly: matched.monthly,
    subscriptionDuration: matched.duration,
  };
};

export const templates: Template[] = rawTemplates.map(applyPakistaniNaming).map(applyCategoryStylePricing);

export const categories = ["All", "Restaurant", "Café", "Fast Food", "Bakery"];
export const styles = ["All", "Modern", "Minimal", "Luxury", "Dark"];
