export const mapObjetKeysToSelectOption = <T>(obj: Object) => {
  return (Object.keys(obj) as T[]).map((key) => ({
    value: key,
    label: (key as string)
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (c) => c.toUpperCase()),
  }));
};

/**
 * Génère un dégradé de N couleurs entre une couleur hex et le blanc
 */
export function gradientToWhite(hex: string, steps = 5): string[] {
  console.log(hex);
  const normalizeHex = (h: string) => h.replace("#", "");

  const toRgb = (h: string) => ({
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  });

  const toHex = ({ r, g, b }: { r: number; g: number; b: number }) =>
    `#${[r, g, b]
      .map((v) => Math.round(v).toString(16).padStart(2, "0"))
      .join("")}`;

  const base = toRgb(normalizeHex(hex));
  const white = { r: 255, g: 255, b: 255 };

  return Array.from({ length: steps }, (_, i) => {
    const t = i / (steps - 1);

    return toHex({
      r: base.r + (white.r - base.r) * t,
      g: base.g + (white.g - base.g) * t,
      b: base.b + (white.b - base.b) * t,
    });
  }).reverse();
}
