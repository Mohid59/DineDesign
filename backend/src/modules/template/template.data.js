const baseTemplates = [
  // Restaurant (5)
  { id: "urbanbite", name: "UrbanBite", category: "Restaurant", style: "Modern", price: 15000, priceType: "one-time", tags: ["Modern", "Dark"], description: "Modern city dining.", theme: { primary: "#F97316", secondary: "#1a1a2e", background: "#0f0f1a", foreground: "#ffffff", accent: "#fb923c", cardBg: "#1a1a2e", fontHeading: "'Playfair Display', serif", fontBody: "'Inter', sans-serif", heroImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200", brandName: "UrbanBite" } },
  { id: "zenplate", name: "ZenPlate", category: "Restaurant", style: "Minimal", price: 18000, priceType: "one-time", tags: ["Minimal", "Clean"], description: "Zen minimal dining.", theme: { primary: "#059669", secondary: "#ecfdf5", background: "#ffffff", foreground: "#1a1a1a", accent: "#10b981", cardBg: "#f0fdf4", fontHeading: "'Playfair Display', serif", fontBody: "'Inter', sans-serif", heroImage: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=1200", brandName: "ZenPlate" } },
  { id: "luxedine", name: "LuxeDine", category: "Restaurant", style: "Luxury", price: 25000, priceType: "one-time", tags: ["Luxury", "Gold"], description: "Luxury fine dining.", theme: { primary: "#b8860b", secondary: "#1a1a1a", background: "#0a0a0a", foreground: "#f5f5dc", accent: "#daa520", cardBg: "#1a1a1a", fontHeading: "'Playfair Display', serif", fontBody: "'Inter', sans-serif", heroImage: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200", brandName: "LuxeDine" } },
  { id: "spiceroute", name: "SpiceRoute", category: "Restaurant", style: "Modern", price: 16000, priceType: "monthly", tags: ["Vibrant", "Cultural"], description: "Warm spice palette.", theme: { primary: "#c2410c", secondary: "#431407", background: "#1a0a00", foreground: "#fff7ed", accent: "#ea580c", cardBg: "#2a1a0a", fontHeading: "'Playfair Display', serif", fontBody: "'Inter', sans-serif", heroImage: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=1200", brandName: "SpiceRoute" } },
  { id: "harborflame", name: "HarborFlame", category: "Restaurant", style: "Dark", price: 17000, priceType: "one-time", tags: ["Seafood", "Dark"], description: "Coastal steakhouse vibe.", theme: { primary: "#0ea5e9", secondary: "#0f172a", background: "#020617", foreground: "#e2e8f0", accent: "#38bdf8", cardBg: "#111827", fontHeading: "'Playfair Display', serif", fontBody: "'Inter', sans-serif", heroImage: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200", brandName: "HarborFlame" } },

  // Cafe (5)
  { id: "cafeaura", name: "CafeAura", category: "Cafe", style: "Minimal", price: 10000, priceType: "monthly", tags: ["Warm", "Minimal"], description: "Warm earthy cafe.", theme: { primary: "#92400e", secondary: "#fef3c7", background: "#fffbeb", foreground: "#1c1917", accent: "#d97706", cardBg: "#ffffff", fontHeading: "'Playfair Display', serif", fontBody: "'Inter', sans-serif", heroImage: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200", brandName: "CafeAura" } },
  { id: "brewhaus", name: "BrewHaus", category: "Cafe", style: "Dark", price: 14000, priceType: "one-time", tags: ["Dark", "Industrial"], description: "Industrial coffee shop.", theme: { primary: "#78350f", secondary: "#292524", background: "#1c1917", foreground: "#fafaf9", accent: "#a16207", cardBg: "#292524", fontHeading: "'Playfair Display', serif", fontBody: "'Inter', sans-serif", heroImage: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200", brandName: "BrewHaus" } },
  { id: "morningbloom", name: "MorningBloom", category: "Cafe", style: "Modern", price: 12000, priceType: "one-time", tags: ["Fresh", "Green"], description: "Fresh brunch style.", theme: { primary: "#16a34a", secondary: "#dcfce7", background: "#f0fdf4", foreground: "#14532d", accent: "#22c55e", cardBg: "#ffffff", fontHeading: "'Inter', sans-serif", fontBody: "'Inter', sans-serif", heroImage: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200", brandName: "MorningBloom" } },
  { id: "velvetbean", name: "VelvetBean", category: "Cafe", style: "Luxury", price: 18000, priceType: "one-time", tags: ["Luxury", "Premium"], description: "Premium cafe identity.", theme: { primary: "#7c3aed", secondary: "#2e1065", background: "#0f0720", foreground: "#f5f3ff", accent: "#a78bfa", cardBg: "#1e1040", fontHeading: "'Playfair Display', serif", fontBody: "'Inter', sans-serif", heroImage: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1200", brandName: "VelvetBean" } },
  { id: "lattelane", name: "LatteLane", category: "Cafe", style: "Minimal", price: 11000, priceType: "monthly", tags: ["Simple", "Clean"], description: "Simple coffee bar.", theme: { primary: "#a16207", secondary: "#fef3c7", background: "#ffffff", foreground: "#1f2937", accent: "#d97706", cardBg: "#f8fafc", fontHeading: "'Inter', sans-serif", fontBody: "'Inter', sans-serif", heroImage: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=1200", brandName: "LatteLane" } },

  // Fastfood (5)
  { id: "quickbite", name: "QuickBite", category: "Fastfood", style: "Modern", price: 8000, priceType: "one-time", tags: ["Bold", "Fast"], description: "Bold fast-food branding.", theme: { primary: "#dc2626", secondary: "#fef08a", background: "#ffffff", foreground: "#1a1a1a", accent: "#f59e0b", cardBg: "#fff7ed", fontHeading: "'Inter', sans-serif", fontBody: "'Inter', sans-serif", heroImage: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=1200", brandName: "QuickBite" } },
  { id: "wrapnroll", name: "Wrap&Roll", category: "Fastfood", style: "Minimal", price: 7500, priceType: "one-time", tags: ["Healthy", "Clean"], description: "Healthy fast casual.", theme: { primary: "#0d9488", secondary: "#ccfbf1", background: "#ffffff", foreground: "#134e4a", accent: "#14b8a6", cardBg: "#f0fdfa", fontHeading: "'Inter', sans-serif", fontBody: "'Inter', sans-serif", heroImage: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=1200", brandName: "Wrap&Roll" } },
  { id: "burgerjoint", name: "BurgerJoint", category: "Fastfood", style: "Dark", price: 10000, priceType: "one-time", tags: ["Burger", "Dark"], description: "Dark burger joint.", theme: { primary: "#eab308", secondary: "#1c1917", background: "#0c0a09", foreground: "#fafaf9", accent: "#facc15", cardBg: "#1c1917", fontHeading: "'Inter', sans-serif", fontBody: "'Inter', sans-serif", heroImage: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1200", brandName: "BurgerJoint" } },
  { id: "pizzapulse", name: "PizzaPulse", category: "Fastfood", style: "Modern", price: 9000, priceType: "monthly", tags: ["Pizza", "Vibrant"], description: "Pizza delivery template.", theme: { primary: "#ea580c", secondary: "#fff7ed", background: "#fffbeb", foreground: "#1a1a1a", accent: "#f97316", cardBg: "#ffffff", fontHeading: "'Inter', sans-serif", fontBody: "'Inter', sans-serif", heroImage: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200", brandName: "PizzaPulse" } },
  { id: "fryfactory", name: "FryFactory", category: "Fastfood", style: "Luxury", price: 9500, priceType: "one-time", tags: ["Fries", "Bold"], description: "High-energy snack brand.", theme: { primary: "#f59e0b", secondary: "#78350f", background: "#111827", foreground: "#f9fafb", accent: "#fbbf24", cardBg: "#1f2937", fontHeading: "'Inter', sans-serif", fontBody: "'Inter', sans-serif", heroImage: "https://images.unsplash.com/photo-1520072959219-c595dc870360?w=1200", brandName: "FryFactory" } },

  // Bakery (5)
  { id: "sweetcrumb", name: "SweetCrumb", category: "Bakery", style: "Minimal", price: 12000, priceType: "one-time", tags: ["Soft", "Pastel"], description: "Pastel bakery design.", theme: { primary: "#be185d", secondary: "#fce7f3", background: "#fff1f2", foreground: "#1c1917", accent: "#ec4899", cardBg: "#ffffff", fontHeading: "'Playfair Display', serif", fontBody: "'Inter', sans-serif", heroImage: "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=1200", brandName: "SweetCrumb" } },
  { id: "midnightbake", name: "MidnightBake", category: "Bakery", style: "Dark", price: 14000, priceType: "one-time", tags: ["Moody", "Premium"], description: "Dark premium bakery.", theme: { primary: "#f472b6", secondary: "#1e1b2e", background: "#0f0d1a", foreground: "#fdf2f8", accent: "#ec4899", cardBg: "#1e1b2e", fontHeading: "'Playfair Display', serif", fontBody: "'Inter', sans-serif", heroImage: "https://images.unsplash.com/photo-1555507036-ab1f4159c0d2?w=1200", brandName: "MidnightBake" } },
  { id: "goldencrust", name: "GoldenCrust", category: "Bakery", style: "Luxury", price: 20000, priceType: "one-time", tags: ["Luxury", "Artisan"], description: "Luxury artisan bakery.", theme: { primary: "#a16207", secondary: "#fef9c3", background: "#fffbeb", foreground: "#1c1917", accent: "#ca8a04", cardBg: "#ffffff", fontHeading: "'Playfair Display', serif", fontBody: "'Inter', sans-serif", heroImage: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1200", brandName: "GoldenCrust" } },
  { id: "flourpower", name: "FlourPower", category: "Bakery", style: "Modern", price: 11000, priceType: "monthly", tags: ["Bold", "Modern"], description: "Modern colorful bakery.", theme: { primary: "#e11d48", secondary: "#fecdd3", background: "#ffffff", foreground: "#1a1a1a", accent: "#fb7185", cardBg: "#fff1f2", fontHeading: "'Inter', sans-serif", fontBody: "'Inter', sans-serif", heroImage: "https://images.unsplash.com/photo-1486427944544-d2c246c4d599?w=1200", brandName: "FlourPower" } },
  { id: "butterlane", name: "ButterLane", category: "Bakery", style: "Minimal", price: 11500, priceType: "one-time", tags: ["Clean", "Classic"], description: "Clean artisan bakery look.", theme: { primary: "#d97706", secondary: "#ffedd5", background: "#fffaf0", foreground: "#3f3f46", accent: "#f59e0b", cardBg: "#ffffff", fontHeading: "'Playfair Display', serif", fontBody: "'Inter', sans-serif", heroImage: "https://images.unsplash.com/photo-1464349153735-7db50ed83c84?w=1200", brandName: "ButterLane" } },

  // IceCream (4)
  { id: "gelatoglow", name: "GelatoGlow", category: "IceCream", style: "Modern", price: 9800, priceType: "monthly", tags: ["Gelato", "Pastel"], description: "Playful gelato shop with colorful branding.", theme: { primary: "#0ea5e9", secondary: "#e0f2fe", background: "#f8fbff", foreground: "#082f49", accent: "#38bdf8", cardBg: "#ffffff", fontHeading: "'Inter', sans-serif", fontBody: "'Inter', sans-serif", heroImage: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=1200", brandName: "GelatoGlow" } },
  { id: "frostyswirl", name: "FrostySwirl", category: "IceCream", style: "Minimal", price: 9200, priceType: "one-time", tags: ["Minimal", "Clean"], description: "Minimal frozen dessert storefront.", theme: { primary: "#06b6d4", secondary: "#cffafe", background: "#ffffff", foreground: "#155e75", accent: "#67e8f9", cardBg: "#ecfeff", fontHeading: "'Inter', sans-serif", fontBody: "'Inter', sans-serif", heroImage: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=1200", brandName: "FrostySwirl" } },
  { id: "velvetcone", name: "VelvetCone", category: "IceCream", style: "Luxury", price: 12500, priceType: "one-time", tags: ["Luxury", "Dessert"], description: "Premium dessert lounge with rich gradients.", theme: { primary: "#7c3aed", secondary: "#312e81", background: "#0f1021", foreground: "#f5f3ff", accent: "#c4b5fd", cardBg: "#1f1b3a", fontHeading: "'Playfair Display', serif", fontBody: "'Inter', sans-serif", heroImage: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=1200", brandName: "VelvetCone" } },
  { id: "sundayscoop", name: "SundayScoop", category: "IceCream", style: "Dark", price: 10100, priceType: "one-time", tags: ["Dark", "Creative"], description: "Moody branding for artisan scoop bars.", theme: { primary: "#f472b6", secondary: "#1f2937", background: "#111827", foreground: "#fdf2f8", accent: "#fb7185", cardBg: "#1f2937", fontHeading: "'Playfair Display', serif", fontBody: "'Inter', sans-serif", heroImage: "https://images.unsplash.com/photo-1633934542430-0905ccb5f050?w=1200", brandName: "SundayScoop" } },

  // TeaHouse (4)
  { id: "chaihorizon", name: "ChaiHorizon", category: "TeaHouse", style: "Modern", price: 10800, priceType: "monthly", tags: ["Chai", "Modern"], description: "Modern chai lounge with warm spice tones.", theme: { primary: "#b45309", secondary: "#ffedd5", background: "#fff7ed", foreground: "#431407", accent: "#f59e0b", cardBg: "#ffffff", fontHeading: "'Playfair Display', serif", fontBody: "'Inter', sans-serif", heroImage: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=1200", brandName: "ChaiHorizon" } },
  { id: "leafandkettle", name: "Leaf & Kettle", category: "TeaHouse", style: "Minimal", price: 9900, priceType: "one-time", tags: ["Minimal", "Organic"], description: "Calm tea studio with botanical mood.", theme: { primary: "#16a34a", secondary: "#dcfce7", background: "#f0fdf4", foreground: "#14532d", accent: "#22c55e", cardBg: "#ffffff", fontHeading: "'Inter', sans-serif", fontBody: "'Inter', sans-serif", heroImage: "https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?w=1200", brandName: "Leaf & Kettle" } },
  { id: "imperialsteep", name: "ImperialSteep", category: "TeaHouse", style: "Luxury", price: 14200, priceType: "one-time", tags: ["Luxury", "Heritage"], description: "Elegant tea room with premium visual identity.", theme: { primary: "#a16207", secondary: "#1f2937", background: "#111827", foreground: "#f8fafc", accent: "#eab308", cardBg: "#1f2937", fontHeading: "'Playfair Display', serif", fontBody: "'Inter', sans-serif", heroImage: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=1200", brandName: "ImperialSteep" } },
  { id: "nightinfusion", name: "NightInfusion", category: "TeaHouse", style: "Dark", price: 11300, priceType: "one-time", tags: ["Dark", "Herbal"], description: "Night tea concept with bold dark visuals.", theme: { primary: "#0ea5e9", secondary: "#0f172a", background: "#020617", foreground: "#e2e8f0", accent: "#38bdf8", cardBg: "#1e293b", fontHeading: "'Inter', sans-serif", fontBody: "'Inter', sans-serif", heroImage: "https://images.unsplash.com/photo-1512568400610-62da28bc8a13?w=1200", brandName: "NightInfusion" } },
];

const STYLE_ROTATION = ["Modern", "Minimal", "Luxury", "Dark"];

const pakistaniBrandNames = {
  urbanbite: "Lahori Ember",
  zenplate: "Sukoon Dastarkhwan",
  luxedine: "Noor Mahal Kitchen",
  spiceroute: "Karachi Tandoor Co",
  harborflame: "Clifton Char House",
  cafeaura: "Chai Junction PK",
  brewhaus: "Roast Gali Cafe",
  morningbloom: "Nasta Avenue",
  velvetbean: "Bean Darbar",
  lattelane: "Sip Chowk",
  quickbite: "Bun Kabab Express",
  wrapnroll: "Roll Point PK",
  burgerjoint: "Grill Adda",
  pizzapulse: "Pizza Bazar",
  fryfactory: "Crunch Karahi Bites",
  sweetcrumb: "Mithaas Oven",
  midnightbake: "Shehr-e-Bake",
  goldencrust: "Badshahi Bakers",
  flourpower: "Atta & Artisan",
  butterlane: "Makhan Street Bakehouse",
  gelatoglow: "Kulfi Club",
  frostyswirl: "Sardi Scoop",
  velvetcone: "Royal Kulfi Lounge",
  sundayscoop: "Meetha Moon Scoops",
  chaihorizon: "Chai Mehfil",
  leafandkettle: "Patti & Kettle",
  imperialsteep: "Zaiqa Chai Room",
  nightinfusion: "Raat Ki Chuski",
};

const caseOneCategories = new Set(["Cafe", "IceCream", "TeaHouse"]);
const caseTwoCategories = new Set(["Restaurant", "Bakery", "Fastfood"]);

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
};

function applyCategoryStylePricing(template) {
  const group = caseOneCategories.has(template.category)
    ? "case1"
    : caseTwoCategories.has(template.category)
      ? "case2"
      : null;

  if (!group || !pricingByStyle[group][template.style]) {
    return template;
  }

  const matched = pricingByStyle[group][template.style];
  return {
    ...template,
    price: matched.total,
    priceType: "one-time",
    subscriptionMonthly: matched.monthly,
    subscriptionDuration: matched.duration,
  };
}

function applyPakistaniNaming(template) {
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
}

function ensureMinimumTemplatesPerCategory(input, minimum = 12) {
  const grouped = input.reduce((acc, template) => {
    if (!acc[template.category]) acc[template.category] = [];
    acc[template.category].push(template);
    return acc;
  }, {});

  const expanded = [...input];

  Object.entries(grouped).forEach(([category, list]) => {
    if (list.length === 0) return;
    let variantIndex = 1;

    while (list.length < minimum) {
      const seed = list[(variantIndex - 1) % list.length];
      const suffix = `Variant ${variantIndex}`;
      const style = STYLE_ROTATION[variantIndex % STYLE_ROTATION.length];

      const clone = {
        ...seed,
        id: `${seed.id}-v${variantIndex}`,
        name: `${seed.name} ${suffix}`,
        style,
        tags: Array.from(new Set([...(seed.tags || []), "Variant", style])),
        description: `${seed.description} (${suffix})`,
        theme: {
          ...seed.theme,
          brandName: `${seed.theme.brandName} ${suffix}`,
        },
      };

      list.push(clone);
      expanded.push(clone);
      variantIndex += 1;
    }
  });

  return expanded;
}

const localizedTemplates = baseTemplates.map(applyPakistaniNaming);
const expandedTemplates = ensureMinimumTemplatesPerCategory(localizedTemplates, 12);
const templates = expandedTemplates.map(applyCategoryStylePricing);

const previewMenuItems = [
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

module.exports = { templates, previewMenuItems };

