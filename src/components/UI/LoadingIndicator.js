import React from 'react';
import {StyleSheet, ActivityIndicator} from 'react-native';

// Components
import PopUp from './PopUp';
import BaseText from './Text/BaseText';

// Constants
import {AppColors} from '../../constants/AppColors';

// Redux
import {useSelector} from 'react-redux';

export default function LoadingIndicator({
  loading = true,
  setLoading = () => {},
  message = '',
  messageStyle = {},
  backdropOpacity = 0.1,
}) {
  const theme = useSelector(state => state.theme.theme);

  return (
    <PopUp
      visible={loading}
      setVisible={setLoading}
      animationType="fade"
      backdropOpacity={backdropOpacity}
      backdropColor={AppColors(theme).PRIMARY.LIGHT_GREY}
      pointerEvents="none">
      <ActivityIndicator color={AppColors(theme).PRIMARY} size={30} />

      {message && (
        <BaseText
          fontSize={18}
          style={[
            styles.message,
            {color: AppColors(theme).PRIMARY},
            messageStyle,
          ]}>
          {message}
        </BaseText>
      )}
    </PopUp>
  );
}

const styles = StyleSheet.create({
  message: {
    marginTop: 10,
  },
});
