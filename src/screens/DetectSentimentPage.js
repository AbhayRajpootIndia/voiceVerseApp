import React from 'react';
import {View, ScrollView, StyleSheet, Button} from 'react-native';

// components
import BaseText from '../components/UI/Text/BaseText';
import BaseContainer from '../components/UI/Containers/BaseContainer';

// hooks
import {useKeyboard} from '../hooks/useKeyboard';

// animations
import {useNavigation} from '@react-navigation/native';
import {useRoute} from '@react-navigation/native';

export default function ProfilePage({}) {
  const params = useRoute()?.params;
  const navigation = useNavigation();
  const emotionData = params?.emotionData;

  const {keyboardShown} = useKeyboard();

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        {
          paddingTop: keyboardShown ? 10 : 40,
          paddingHorizontal: 20,
          rowGap: 20
        }
      ]}>
      <BaseText fontSize={16} align="center" style={{paddingVertical: 5}}>
        Emotion is : {'\n'}
        <BaseText fontSize={20}>{emotionData?.emotion}</BaseText>
      </BaseText>

      <BaseText fontSize={16} align="center" style={{paddingVertical: 5}}>
        Confidence is : {'\n'}
        <BaseText fontSize={20}>
          {parseFloat(emotionData?.probability).toFixed(5)}
        </BaseText>
      </BaseText>

      <BaseContainer style={{backgroundColor: 'wheat'}}>
        <BaseText fontSize={16} align="center" style={{paddingVertical: 5}}>
          Text was : {'\n'}
          <BaseText fontSize={20}>{emotionData?.text}</BaseText>
        </BaseText>
      </BaseContainer>

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
