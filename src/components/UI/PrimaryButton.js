import React, {useState} from 'react';
import {Pressable, StyleSheet} from 'react-native';

// components
import BaseText from './Text/BaseText';

// constants
import {AppColors} from '../../constants/AppColors';

// redux
import {useSelector} from 'react-redux';

export default function PrimaryButton({
  onPress = () => {},
  style = {},
  labelStyle = {},
  children,
}) {
  const theme = useSelector(state => state.theme.theme);

  const [pressed, setPressed] = useState(false);

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        {
          backgroundColor: pressed
            ? AppColors(theme).PRIMARY_LIGHT
            : AppColors(theme).PRIMARY,
        },
        style,
      ]}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}>
      <BaseText color={AppColors(theme).WHITE} style={labelStyle}>
        {children}
      </BaseText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 10,
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});
