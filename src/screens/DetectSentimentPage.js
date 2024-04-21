import {GoogleSignin} from '@react-native-google-signin/google-signin';

import React from 'react';
import {View, ScrollView, StyleSheet, Image, Button} from 'react-native';

// components
import BaseText from '../components/UI/Text/BaseText';
import BaseContainer from '../components/UI/Containers/BaseContainer';
import PrimaryButton from '../components/UI/PrimaryButton';

// constants
import {AppColors} from '../constants/AppColors';

// redux
import {useDispatch, useSelector} from 'react-redux';

// hooks
import {useKeyboard} from '../hooks/useKeyboard';

// animations
import {useNavigation} from '@react-navigation/native';
import {NAV} from '../navigation/navigationConfig';
import {logout} from '../store/redux/userSlice';
import {useRoute} from '@react-navigation/native';

export default function ProfilePage({}) {
  const theme = useSelector(state => state.theme.theme);

  const params = useRoute()?.params;
  const navigation = useNavigation();
  const emotionData = params?.emotionData;

  console.log(emotionData);

  const {keyboardShown} = useKeyboard();

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        {
          paddingTop: keyboardShown ? 10 : 40
        }
      ]}>
      <BaseText fontSize={20}>Emotion is : {emotionData?.emotion}</BaseText>

      <BaseText fontSize={20}>
        Confidence is : {parseFloat(emotionData?.probability).toFixed(5)}
      </BaseText>

      <BaseText fontSize={20}>Text was : {emotionData?.text}</BaseText>

      <View style={{height: 20}} />

      <Button title="Try another" onPress={() => navigation.goBack()} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 5,
    flexGrow: 1,
    backgroundColor: 'white'
  }
});
