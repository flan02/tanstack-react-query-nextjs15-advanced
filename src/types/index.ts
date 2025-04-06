export const ButtonTypes = ["technology", "design", "productivity", "nonexistent"] as const;
// as const converts ButtonTypes in a readonly array (tuple)
export type ButtonTypes = (typeof ButtonTypes)[number]; // extracts ButtonTypes values as a type

export type CardData = {
  title: string;
  description: string;
  href: string;
}