import React from 'react';
import {Text} from 'react-native';

// constants
import {AppColors} from '../../../constants/AppColors';

export default function BaseText({
  fontSize = 16,
  fontWeight = '600',
  color = AppColors().BLACK,
  align = 'left',
  marginTop = 0,
  marginBottom = 0,
  marginVertical = 0,
  numberOfLines = null,
  style = {},
  children,
}) {
  const styles = {
    fontSize: fontSize,
    fontWeight: fontWeight,
    color: color,
    textAlign: align,
    marginTop: marginTop,
    marginBottom: marginBottom,
    marginVertical: marginVertical,
  };

  return (
    <Text style={[styles, style]} numberOfLines={numberOfLines}>
      {children}
    </Text>
  );
}
