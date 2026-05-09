const router = require("express").Router();
const asyncHandler = require("../../core/utils/asyncHandler");
const { ok } = require("../../core/utils/apiResponse");

const GEMINI_MODEL =
  process.env.GEMINI_MODEL && process.env.GEMINI_MODEL !== "gemini-1.5-flash"
    ? process.env.GEMINI_MODEL
    : "gemini-2.0-flash";
const WEBSITE_CONTEXT = `
You are the AI assistant for DineDesign, a restaurant website builder.

About DineDesign:
- Users can browse restaurant website templates for Restaurant, Cafe, Fastfood, Bakery, Ice Cream, and Tea House businesses.
- Users can preview templates, customize colors, typography, brand name, and layout, then add templates to cart.
- Users can order either a simple template as-is or a customized template.
- Checkout uses demo payment API flows with credit card or debit card inputs, but no real money is charged.
- Clients/users should be guided toward template selection, customization ideas, pricing understanding, checkout help, and dashboard usage.
- Admin access is restricted to allowlisted email addresses configured by the business owner.
- If asked about unsupported features, answer honestly and suggest the closest supported workflow in DineDesign.

Response style:
- Be concise, helpful, and website-specific.
- Prefer practical recommendations over generic AI chatter.
- When recommending templates, mention categories or styles when relevant.
`.trim();

function getWebsiteFallbackReply(message) {
  const text = String(message || "").toLowerCase();

  if (text.includes("bakery")) {
    return "For a bakery business, start with a Bakery template like SweetCrumb, MidnightBake, GoldenCrust, FlourPower, or ButterLane. Choose SweetCrumb or ButterLane for a clean bakery brand, and GoldenCrust for a more premium feel.";
  }

  if (text.includes("cafe") || text.includes("coffee")) {
    return "For cafe brands, CafeAura, BrewHaus, MorningBloom, VelvetBean, and LatteLane are strong matches. BrewHaus suits a darker premium cafe, while MorningBloom fits a fresher modern style.";
  }

  if (text.includes("restaurant")) {
    return "For restaurant brands, UrbanBite, ZenPlate, LuxeDine, SpiceRoute, and HarborFlame are great options. LuxeDine fits luxury dining, while UrbanBite and SpiceRoute suit modern restaurant businesses.";
  }

  if (text.includes("fastfood") || text.includes("fast food") || text.includes("burger") || text.includes("pizza")) {
    return "For fast food businesses, QuickBite, Wrap&Roll, BurgerJoint, PizzaPulse, and FryFactory are the best starting points. BurgerJoint fits a dark burger style and PizzaPulse works well for pizza delivery branding.";
  }

  if (text.includes("price") || text.includes("pricing") || text.includes("cost")) {
    return "DineDesign offers both one-time and monthly-priced templates. You can preview a template, customize it if needed, add it to cart, and complete a demo checkout flow without charging real money.";
  }

  if (text.includes("admin")) {
    return "Admin access is limited to allowlisted email addresses in the backend configuration. Approved admin emails can open the admin dashboard, while all other registered users go to the client dashboard.";
  }

  return "DineDesign helps restaurants, cafes, bakeries, fast food, tea house, and ice cream businesses browse templates, customize branding, add designs to cart, and place demo orders. Tell me your business type or design style and I will suggest the best template.";
}

async function getGeminiReply(message) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return { reply: getWebsiteFallbackReply(message), fallbackUsed: true };
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: WEBSITE_CONTEXT }],
            },
            {
              role: "user",
              parts: [{ text: message || "Hello" }],
            },
          ],
        }),
      }
    );

    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      // Any upstream Gemini/API issue should degrade gracefully for end users.
      return { reply: getWebsiteFallbackReply(message), fallbackUsed: true };
    }

    const generatedReply = payload?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!generatedReply) {
      return { reply: getWebsiteFallbackReply(message), fallbackUsed: true };
    }
    return { reply: generatedReply, fallbackUsed: false };
  } catch {
    // Network/runtime failures should still provide assistant guidance.
    return { reply: getWebsiteFallbackReply(message), fallbackUsed: true };
  }
}

router.post(
  "/chat",
  asyncHandler(async (req, res) => {
    const { message } = req.body || {};
    const result = await getGeminiReply(message);
    return ok(res, result, "AI response");
  })
);

module.exports = router;
