import React, { useRef } from "react";
import Animated from 'react-native-reanimated';
import {
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import {
  BottomSheetModal,
} from '@gorhom/bottom-sheet';

import { useBackgroundAnimation } from "@/hooks/useBackgroundAnimation";
import { useTextAnimation } from "@/hooks/useTextAnimation";
import { useGestureHandlers } from "@/hooks/useGestureHandlers";

import { generateRandomColor } from "@/lib";
import BottomColorPalette from "@/component/BottomColorPalette";

export default function Index() {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const { animatedStyle: backgroundAnimatedStyle, startAnimate: startBackgroundColorAnimation } = useBackgroundAnimation("#0FFF30");
  const { animatedStyle: textAnimatedStyle, startAnimate: startTextAnimation, stopAnimate: stopTextAnimation } = useTextAnimation();
  const combinedGesture = useGestureHandlers(
    () => startBackgroundColorAnimation(generateRandomColor()),
    () => startTextAnimation(),
    () => stopTextAnimation(),
    () => bottomSheetModalRef.current?.present()
  )
  return (
    <GestureHandlerRootView>
      <Animated.View style={{ flex: 1 }}>
        <GestureDetector gesture={combinedGesture}>
          <Animated.View
            style={[{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }, backgroundAnimatedStyle]}
          >
            <Animated.Text style={[textAnimatedStyle, { fontSize: 50 }]}>Hello there</Animated.Text>
          </Animated.View>
        </GestureDetector>
        <BottomColorPalette ref={bottomSheetModalRef} startBackgroundColorAnimation={startBackgroundColorAnimation} />
      </Animated.View>
    </GestureHandlerRootView>
  );
}