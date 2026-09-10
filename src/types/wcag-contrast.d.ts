declare module "wcag-contrast" {
  /** Contrast ratio between two hex colours, e.g. "#051A3E" and "#FFFFFF". */
  export function hex(a: string, b: string): number;
  /** Contrast ratio between two [r,g,b] triplets. */
  export function rgb(a: [number, number, number], b: [number, number, number]): number;
  /** Relative luminance of an [r,g,b] triplet. */
  export function luminance(rgb: [number, number, number]): number;
  /** WCAG letter score ("AAA" | "AA" | "AA Large" | "Fail") for a ratio. */
  export function score(ratio: number): string;
}
