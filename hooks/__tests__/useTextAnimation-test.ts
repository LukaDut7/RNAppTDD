import { renderHook, act } from "@testing-library/react-native";
import { useTextAnimation } from "@/hooks/useTextAnimation";
import {
  useSharedValue,
  withTiming,
  withSequence,
  withRepeat,
  cancelAnimation,
} from "react-native-reanimated";

// Mock `react-native-reanimated` functions
jest.mock("react-native-reanimated", () => ({
  useSharedValue: jest.fn(),
  useAnimatedStyle: jest.fn().mockImplementation((style) => style()),
  withTiming: jest.fn((value, options) => ({ value, options })),
  withSequence: jest.fn((...animations) => animations),
  withRepeat: jest.fn((animation, repeatCount) => ({ animation, repeatCount })),
  cancelAnimation: jest.fn(),
}));

describe("useTextAnimation Hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize opacity with a value of 1", () => {
    const initialOpacity = { value: 1 };
    (useSharedValue as jest.Mock).mockReturnValue(initialOpacity);

    const { result } = renderHook(() => useTextAnimation());

    expect(result.current.animatedStyle).toEqual({
      opacity: initialOpacity.value,
    });
  });

  it("should start the animation when startAnimate is called", () => {
    const initialOpacity = { value: 1 };
    const animationSequence = "mockSequence";
    const repeatedAnimation = 0.5;

    (useSharedValue as jest.Mock).mockReturnValue(initialOpacity);
    (withTiming as jest.Mock).mockImplementation((value, options) => ({ value, options }));
    (withSequence as jest.Mock).mockReturnValue(animationSequence);
    (withRepeat as jest.Mock).mockReturnValue(repeatedAnimation);

    const { result } = renderHook(() => useTextAnimation());

    act(() => {
      result.current.startAnimate();
    });

    expect(withSequence).toHaveBeenCalledWith(
      withTiming(0, { duration: 500 }),
      withTiming(1, { duration: 500 })
    );
    expect(withRepeat).toHaveBeenCalledWith(animationSequence, -1);
    expect(initialOpacity.value).toBe(repeatedAnimation);
  });

  it("should stop the animation and reset opacity when stopAnimate is called", () => {
    const initialOpacity = { value: 0 };
    (useSharedValue as jest.Mock).mockReturnValue(initialOpacity);

    const { result } = renderHook(() => useTextAnimation());

    act(() => {
      result.current.stopAnimate();
    });

    expect(cancelAnimation).toHaveBeenCalledWith(initialOpacity);
    expect(initialOpacity.value).toBe(1);
  });

  it("should return a valid animated style object", () => {
    const initialOpacity = { value: 1 };
    (useSharedValue as jest.Mock).mockReturnValue(initialOpacity);

    const { result } = renderHook(() => useTextAnimation());

    const style = result.current.animatedStyle;
    expect(style).toEqual({ opacity: initialOpacity.value });
  });

  it("should handle rapid successive calls to startAnimate and stopAnimate", () => {
    const initialOpacity = { value: 1 };
    const repeatedAnimation = "mockRepeat";

    (useSharedValue as jest.Mock).mockReturnValue(initialOpacity);
    (withRepeat as jest.Mock).mockReturnValue(repeatedAnimation);

    const { result } = renderHook(() => useTextAnimation());

    act(() => {
      result.current.startAnimate();
      result.current.stopAnimate();
    });

    expect(cancelAnimation).toHaveBeenCalledWith(initialOpacity);
    expect(initialOpacity.value).toBe(1);
  });
});
