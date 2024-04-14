import React from 'react';
import {View, StyleSheet, ScrollView, Platform, Button} from 'react-native';
import BaseText from '../components/UI/Text/BaseText';

import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import RNFetchBlob from 'rn-fetch-blob';

const audioRecorderPlayer = new AudioRecorderPlayer();

export default function VoiceTranscribePage({}) {
  const recordAudio = async () => {
    const dirs = RNFetchBlob.fs.dirs;

    const path = Platform.select({
      ios: 'temp.m4a',
      android: `${dirs.CacheDir}/temp.mp3`,
    });

    const uri = await audioRecorderPlayer.startRecorder(path).catch(err => {
      console.log(err);
    });
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Button onPress={recordAudio} title="asdf" />
      <BaseText>asdf</BaseText>
    </ScrollView>
  );
}
