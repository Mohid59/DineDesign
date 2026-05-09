import type { Template, TemplateTheme } from "@/data/templates";

export type CartItem = {
  id: string;
  templateId: string;
  templateName: string;
  price: number;
  priceType: Template["priceType"];
  billingPreference?: "full" | "subscription";
  customizedTheme: TemplateTheme;
  layoutStyle: string;
  isCustomized?: boolean;
  addedAt: string;
};

const CART_KEY = "dinedesign.cart";

export function getCartItems(): CartItem[] {
  try {
    const raw = window.localStorage.getItem(CART_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveCartItems(items: CartItem[]) {
  window.localStorage.setItem(CART_KEY, JSON.stringify(items));
}

export function addCartItem(item: CartItem) {
  const current = getCartItems();
  saveCartItems([item, ...current]);
}

export function removeCartItem(id: string) {
  const current = getCartItems();
  saveCartItems(current.filter((item) => item.id !== id));
}

