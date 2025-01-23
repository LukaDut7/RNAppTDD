import {
  Directions,
  Gesture,
  SimultaneousGesture,
} from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';

interface GestureHandlers {
  tapHandler: () => void;
  longPressStartHandler: () => void;
  longPressEndHandler: () => void;
  swipeUpHandler: () => void;
}

export const useGestureHandlers = (
  tapHandler: GestureHandlers['tapHandler'],
  longPressStartHandler: GestureHandlers['longPressStartHandler'],
  longPressEndHandler: GestureHandlers['longPressEndHandler'],
  swipeUpHandler: GestureHandlers['swipeUpHandler'],
): SimultaneousGesture => {
  const longPress = Gesture.Pan().onTouchesDown(() => {
    runOnJS(longPressStartHandler)();
  }).onFinalize(() => {
    runOnJS(longPressEndHandler)();
  });
  const tap = Gesture.Tap().onEnd(() => {
    runOnJS(tapHandler)();
  });
  const swipeUp = Gesture.Fling().direction(Directions.UP).onEnd(() => {
    runOnJS(swipeUpHandler)();
  });
  const combinedGesture = Gesture.Exclusive(swipeUp, Gesture.Simultaneous(longPress, tap));
  return combinedGesture;
}