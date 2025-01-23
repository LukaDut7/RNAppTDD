import { generateRandomColor, isHexColor } from "../index";

describe("tests all utility functions", () => {
  describe("test generateRandomColor function", () => {
    it("should return a random color string", () => {
      const color = generateRandomColor();
      expect(color).toMatch(/^#[0-9A-F]{6}$/);
    });
  });
  describe("test isHexColor function", () => {
    it("should return true if the given value is a valid hex color", () => {
      const color = "#0FFF30";
      expect(isHexColor(color)).toBe(true);
    });
    it("should return false if the given value is not a valid hex color", () => {
      let color = "#0FFF3";
      expect(isHexColor(color)).toBe(false);
      color = "#0FF33F3";
      expect(isHexColor(color)).toBe(false);
      color = "#0DGFF3";
      expect(isHexColor(color)).toBe(false);
    });
  });
});