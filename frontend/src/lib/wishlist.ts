const WISHLIST_KEY = "dinedesign.wishlist";

export function getWishlistIds(): string[] {
  try {
    const raw = window.localStorage.getItem(WISHLIST_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as string[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveWishlistIds(ids: string[]) {
  window.localStorage.setItem(WISHLIST_KEY, JSON.stringify(ids));
}

export function isWishlisted(templateId: string) {
  return getWishlistIds().includes(templateId);
}

export function toggleWishlist(templateId: string) {
  const current = getWishlistIds();
  if (current.includes(templateId)) {
    const next = current.filter((id) => id !== templateId);
    saveWishlistIds(next);
    return false;
  }
  const next = [templateId, ...current];
  saveWishlistIds(next);
  return true;
}
