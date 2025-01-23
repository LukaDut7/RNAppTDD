import { isHexColor } from '@/lib';
import { useCallback } from 'react';
import { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

export const useBackgroundAnimation = (color: string) => {
  if (!isHexColor(color)) throw new Error("Invalid color");
  const backgroundColor = useSharedValue(color);
  const startAnimate = useCallback((targetColor: string) => {
    backgroundColor.value = withTiming(targetColor, { duration: 500 });
  }, [color]);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: backgroundColor.value,
    };
  });
  return { startAnimate, animatedStyle };
}