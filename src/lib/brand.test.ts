import { describe, it, expect } from "vitest";
import { hex } from "wcag-contrast";

const NAVY = "#051A3E";
const AMBER = "#F4A025";
const WHITE = "#FFFFFF";
const MIST = "#F3F6FA";
const SLATE = "#526174";

const AA_NORMAL = 4.5;
const AA_LARGE = 3;

describe("brand colour contrast (WCAG AA)", () => {
  it("white text on navy meets AA for normal text", () => {
    expect(hex(WHITE, NAVY)).toBeGreaterThanOrEqual(AA_NORMAL);
  });

  it("navy text on white meets AA for normal text", () => {
    expect(hex(NAVY, WHITE)).toBeGreaterThanOrEqual(AA_NORMAL);
  });

  it("navy text on mist meets AA for normal text", () => {
    expect(hex(NAVY, MIST)).toBeGreaterThanOrEqual(AA_NORMAL);
  });

  it("slate body text on white meets AA for normal text", () => {
    expect(hex(SLATE, WHITE)).toBeGreaterThanOrEqual(AA_NORMAL);
  });

  it("slate body text on mist meets AA for normal text", () => {
    expect(hex(SLATE, MIST)).toBeGreaterThanOrEqual(AA_NORMAL);
  });

  it("navy text on amber (primary button) meets AA for normal text", () => {
    expect(hex(NAVY, AMBER)).toBeGreaterThanOrEqual(AA_NORMAL);
  });

  it("amber on navy (accents/eyebrows) meets AA for large text at minimum", () => {
    expect(hex(AMBER, NAVY)).toBeGreaterThanOrEqual(AA_LARGE);
  });
});
