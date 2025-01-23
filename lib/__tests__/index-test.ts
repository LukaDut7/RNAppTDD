import { generateRandomColor } from "../index";

describe("tests all utility functions", () => {
  describe("test generateRandomColor function", () => {
    it("should return a random color string", () => {
      const color = generateRandomColor();
      expect(color).toMatch(/^#[0-9A-F]{6}$/);
    });
  });
});