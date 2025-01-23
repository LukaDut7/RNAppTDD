import { renderHook, act } from "@testing-library/react-native";
import { useBackgroundAnimation } from "@/hooks/useBackgroundAnimation";
import { useSharedValue, withTiming } from "react-native-reanimated";

// Mock `react-native-reanimated` functions
jest.mock("react-native-reanimated", () => ({
  useSharedValue: jest.fn(),
  useAnimatedStyle: jest.fn().mockImplementation((style) => style()),
  withTiming: jest.fn((value, options) => ({ value, options })),
}));

describe("useBackgroundAnimation Hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize backgroundColor with the provided color", () => {
    const initialColor = "#000000";
    const mockSharedValue = { value: initialColor };
    (useSharedValue as jest.Mock).mockReturnValue(mockSharedValue);

    const { result } = renderHook(() => useBackgroundAnimation(initialColor));

    expect(result.current.animatedStyle).toEqual({
      backgroundColor: mockSharedValue.value,
    });
  });

  it("should throw an error if the provided color is invalid", () => {
    const invalidColor = "invalidColor";

    expect(() => {
      useBackgroundAnimation(invalidColor);
    }).toThrow("Invalid color");
  });

  it("should update backgroundColor when startAnimate is called", () => {
    const initialColor = "#000000";
    const targetColor = "#FFFFFF";
    const mockSharedValue = { value: initialColor };
    (useSharedValue as jest.Mock).mockReturnValue(mockSharedValue);
    (withTiming as jest.Mock).mockReturnValue(targetColor);

    const { result } = renderHook(() => useBackgroundAnimation(initialColor));

    act(() => {
      result.current.startAnimate(targetColor);
    });

    expect(mockSharedValue.value).toBe(targetColor);
    expect(withTiming).toHaveBeenCalledWith(targetColor, { duration: 500 });
  });
});
