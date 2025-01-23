import React, { useMemo, useCallback, forwardRef } from 'react';
import { StyleSheet } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import {
  BottomSheetModal,
  BottomSheetFlatList,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { generateRandomColor } from '@/lib';

interface BottomColorPaletteProps {
  startBackgroundColorAnimation: (color: string) => void;
}

const BottomColorPalette = forwardRef<BottomSheetModal, BottomColorPaletteProps>(({ startBackgroundColorAnimation }, ref) => {
  const data = useMemo(
    () =>
      Array(50)
        .fill(0)
        .map((_,) => generateRandomColor()),
    []
  );

  const renderItem = useCallback(
    ({ item: color }: { item: string }) => (
      <TouchableWithoutFeedback
        style={[styles.itemContainer, { backgroundColor: color }]}
        onPress={() => {
          (ref as React.RefObject<BottomSheetModal>)?.current?.close();
          startBackgroundColorAnimation(color);
        }}
      >
      </TouchableWithoutFeedback>
    ),
    [ref]
  );

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal ref={ref} snapPoints={['45%']}>
        <BottomSheetFlatList
          data={data}
          keyExtractor={(i) => i}
          renderItem={renderItem}
          contentContainerStyle={styles.contentContainer}
        />
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
});

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: 'white',
  },
  itemContainer: {
    height: 50,
    backgroundColor: '#eee',
  },
});

export default BottomColorPalette;
