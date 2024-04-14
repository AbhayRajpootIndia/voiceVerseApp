import React from 'react';
import {View} from 'react-native';

// redux
import {useSelector} from 'react-redux';

// constants
import {AppColors} from '../../../constants/AppColors';

const BaseContainer = React.forwardRef(
  (
    {
      style = {},
      boxShadow = false,
      elevation = 1,
      shadowColor = AppColors().LIGHT_GREY,
      children,
    },
    ref,
  ) => {
    const theme = useSelector(state => state.theme.theme);

    const defaultStyle = {
      backgroundColor: AppColors(theme).BODY,
      borderRadius: 20,
      padding: 10,
    };

    const shadowStyle = boxShadow
      ? {
          shadowColor: shadowColor,
          elevation: elevation,
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.5,
          shadowRadius: 5,
        }
      : {};

    return (
      <View ref={ref} style={[defaultStyle, shadowStyle, style]}>
        {children}
      </View>
    );
  },
);

export default BaseContainer;
