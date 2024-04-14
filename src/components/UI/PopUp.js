import React from 'react';
import {View, Modal, StyleSheet, Dimensions} from 'react-native';

export default function PopUp({
  visible = true,
  setVisible = () => {},
  animationType = 'slide',
  transparent = true,
  showBackdrop = true,
  backdropStyle = {},
  backdropColor = 'white',
  backdropOpacity = 0.8,
  onRequestClose = () => {},
  pointerEvents = 'auto',
  children,
}) {
  return (
    <Modal
      animationType={animationType}
      transparent={transparent}
      visible={visible}
      onRequestClose={() => {
        setVisible(prev => !prev);
        onRequestClose();
      }}>
      <View style={styles.container} pointerEvents={pointerEvents}>
        {children}
      </View>
      {showBackdrop && (
        <View
          style={[
            styles.backdrop,
            {backgroundColor: backdropColor, opacity: backdropOpacity},
            backdropStyle,
          ]}
          pointerEvents={pointerEvents}
        />
      )}
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    position: 'absolute',
    zIndex: -1,
  },
});
