import { useCallback } from 'react';
import { useSharedValue, useAnimatedStyle, withTiming, withSequence, cancelAnimation, withRepeat } from 'react-native-reanimated';

export const useTextAnimation = () => {
  const opacity = useSharedValue(1);
  const startAnimate = useCallback(() => {
    opacity.value = withRepeat(withSequence(withTiming(0, { duration: 500 }), withTiming(1, { duration: 500 })), -1);
  }, [opacity]);
  const stopAnimate = useCallback(() => {
    cancelAnimation(opacity);
    opacity.value = 1;
  }, [opacity]);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });
  return { startAnimate, stopAnimate, animatedStyle };
}