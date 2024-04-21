import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Platform,
  PermissionsAndroid,
  TouchableOpacity,
  Button,
  Dimensions,
  Linking,
} from 'react-native';
import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSourceAndroidType,
  OutputFormatAndroidType,
} from 'react-native-audio-recorder-player';

import RNFetchBlob from 'rn-fetch-blob';
import {extractEmotionFromAudio, welcome} from '../services/audio';
import axios from 'axios';
import {API_STATUS} from '../constants/StatusCodes';

const audioRecorderPlayer = new AudioRecorderPlayer();

const screenWidth = Dimensions.get('screen').width;

export default function VoiceTranscribePage({}) {
  const dirs = RNFetchBlob.fs.dirs;

  const path = Platform.select({
    ios: 'temp.m4a',
    android: `${dirs.CacheDir}/temp.mp3`,
  });

  const [state, setState] = useState({
    isLoggingIn: false,
    recordSecs: 0,
    recordTime: '00:00:00',
    currentPositionSec: 0,
    currentDurationSec: 0,
    playTime: '00:00:00',
    duration: '00:00:00',
  });

  let playWidth =
    (state.currentPositionSec / state.currentDurationSec) * (screenWidth - 56);

  if (!playWidth) {
    playWidth = 0;
  }

  const onStatusPress = e => {
    const touchX = e.nativeEvent.locationX;
    console.log(`touchX: ${touchX}`);

    const playWidth =
      (state.currentPositionSec / state.currentDurationSec) *
      (screenWidth - 56);
    console.log(`currentPlayWidth: ${playWidth}`);

    const currentPosition = Math.round(state.currentPositionSec);

    if (playWidth && playWidth < touchX) {
      const addSecs = Math.round(currentPosition + 1000);
      audioRecorderPlayer.seekToPlayer(addSecs);
      console.log(`addSecs: ${addSecs}`);
    } else {
      const subSecs = Math.round(currentPosition - 1000);
      audioRecorderPlayer.seekToPlayer(subSecs);
      console.log(`subSecs: ${subSecs}`);
    }
  };

  const onStartRecord = async () => {
    if (Platform.OS === 'android') {
      try {
        const grants = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ]);

        console.log('write external stroage', grants);

        if (
          grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.READ_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.RECORD_AUDIO'] ===
            PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log('permissions granted');
        } else {
          console.log('All required permissions not granted');

          Linking.openSettings();

          return;
        }
      } catch (err) {
        console.warn(err);

        return;
      }
    }

    const audioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
      OutputFormatAndroid: OutputFormatAndroidType.AAC_ADTS,
    };

    console.log('audioSet', audioSet);

    const uri = await audioRecorderPlayer
      .startRecorder(path, audioSet)
      .catch(err => {
        console.log(err);
      });

    audioRecorderPlayer.addRecordBackListener(e => {
      // console.log('record-back', e);
      setState({
        recordSecs: e.currentPosition,
        recordTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
      });
    });
    console.log(`uri: ${uri}`);
  };

  const onPauseRecord = async () => {
    try {
      const r = await audioRecorderPlayer.pauseRecorder();
      console.log(r);
    } catch (err) {
      console.log('pauseRecord', err);
    }
  };

  const onResumeRecord = async () => {
    await audioRecorderPlayer.resumeRecorder();
  };

  const onStopRecord = async () => {
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    setState({
      recordSecs: 0,
    });
    console.log(result);
  };

  const onStartPlay = async () => {
    console.log('onStartPlay', path);

    try {
      const msg = await audioRecorderPlayer.startPlayer(path);

      //? Default path
      // const msg = await audioRecorderPlayer.startPlayer();
      const volume = await audioRecorderPlayer.setVolume(1.0);
      console.log(`path: ${msg}`, `volume: ${volume}`);

      audioRecorderPlayer.addPlayBackListener(e => {
        console.log('playBackListener', e);
        setState({
          currentPositionSec: e.currentPosition,
          currentDurationSec: e.duration,
          playTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
          duration: audioRecorderPlayer.mmssss(Math.floor(e.duration)),
        });
      });
    } catch (err) {
      console.log('startPlayer error', err);
    }
  };

  const onPausePlay = async () => {
    await audioRecorderPlayer.pausePlayer();
  };

  const onResumePlay = async () => {
    await audioRecorderPlayer.resumePlayer();
  };

  const onStopPlay = async () => {
    console.log('onStopPlay');
    audioRecorderPlayer.stopPlayer();
    audioRecorderPlayer.removePlayBackListener();
  };

  const transcribeAudio = async () => {
    console.log(path);
    await welcome(path)
      .then(res => {
        const {data, status} = res;
        if (status === API_STATUS.SUCCESS) {
          console.log(data);
        }
      })
      .catch(err => {
        console.log(err);
      });
    await extractEmotionFromAudio(path)
      .then(res => {
        const {data, status} = res;
        if (status === API_STATUS.SUCCESS) {
          console.log(data);
        }
      })
      .catch(err => {
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
      <Text style={styles.titleTxt}>Record Your Audio</Text>
      <Text style={styles.txtRecordCounter}>{state.recordTime}</Text>
      <View style={styles.viewRecorder}>
        <View style={styles.recordBtnWrapper}>
          <Button
            title="Record"
            style={styles.btn}
            onPress={onStartRecord}
            textStyle={styles.txt}
          />

          <Button
            title="Pause"
            style={[
              styles.btn,
              {
                marginLeft: 12,
              },
            ]}
            onPress={onPauseRecord}
            textStyle={styles.txt}
          />
          <Button
            title="Resume"
            style={[
              styles.btn,
              {
                marginLeft: 12,
              },
            ]}
            onPress={onResumeRecord}
            textStyle={styles.txt}
          />

          <Button
            title="Stop"
            style={[styles.btn, {marginLeft: 12}]}
            onPress={onStopRecord}
            textStyle={styles.txt}
          />
        </View>
      </View>

      <View style={styles.viewPlayer}>
        <TouchableOpacity style={styles.viewBarWrapper} onPress={onStatusPress}>
          <View style={styles.viewBar}>
            <View style={[styles.viewBarPlay, {width: playWidth}]} />
          </View>
        </TouchableOpacity>
        <Text style={styles.txtCounter}>
          {state.playTime} / {state.duration}
        </Text>
        <View style={styles.playBtnWrapper}>
          <Button
            title="Play"
            style={styles.btn}
            onPress={onStartPlay}
            textStyle={styles.txt}
          />
          <Button
            title="Pause"
            style={[
              styles.btn,
              {
                marginLeft: 12,
              },
            ]}
            onPress={onPausePlay}
            textStyle={styles.txt}
          />

          <Button
            title="Resume"
            style={[
              styles.btn,
              {
                marginLeft: 12,
              },
            ]}
            onPress={onResumePlay}
            textStyle={styles.txt}
          />
          <Button
            title="Stop"
            style={[
              styles.btn,
              {
                marginLeft: 12,
              },
            ]}
            onPress={onStopPlay}
            textStyle={styles.txt}
          />
        </View>
      </View>

      <Button title="Transcribe" onPress={transcribeAudio} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#455A64',
    flexDirection: 'column',
    alignItems: 'center',
  },
  titleTxt: {
    marginTop: 100,
    color: 'black',
    fontSize: 28,
  },
  viewRecorder: {
    marginTop: 40,
    width: '100%',
    alignItems: 'center',
  },
  recordBtnWrapper: {
    flexDirection: 'row',
    columnGap: 10,
  },
  viewPlayer: {
    marginTop: 60,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  viewBarWrapper: {
    marginTop: 28,
    marginHorizontal: 28,
    alignSelf: 'center',
  },
  viewBar: {
    backgroundColor: '#ccc',
    height: 4,
    alignSelf: 'stretch',
  },
  viewBarPlay: {
    backgroundColor: 'white',
    height: 4,
    width: 0,
  },
  playStatusTxt: {
    marginTop: 8,
    color: '#ccc',
  },
  playBtnWrapper: {
    flexDirection: 'row',
    marginTop: 40,
    columnGap: 10,
  },
  btn: {
    borderColor: 'black',
    borderWidth: 1,
  },
  txt: {
    color: 'black',
    fontSize: 14,
    marginHorizontal: 8,
    marginVertical: 4,
  },
  txtRecordCounter: {
    marginTop: 32,
    color: 'black',
    fontSize: 20,
    textAlignVertical: 'center',
    fontWeight: '200',
    fontFamily: 'Helvetica Neue',
    letterSpacing: 3,
  },
  txtCounter: {
    marginTop: 12,
    color: 'black',
    fontSize: 20,
    textAlignVertical: 'center',
    fontWeight: '200',
    fontFamily: 'Helvetica Neue',
    letterSpacing: 3,
  },
});
