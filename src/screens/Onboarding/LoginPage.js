/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */

import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId:
    '985372675855-ipsknnbg3romu6n9oqhnl7fe37lqqlb2.apps.googleusercontent.com',
});

import React, {useEffect} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';

// components
import BaseText from '../../components/UI/Text/BaseText';
import BaseContainer from '../../components/UI/Containers/BaseContainer';
import PrimaryButton from '../../components/UI/PrimaryButton';

// constants
import {AppColors} from '../../constants/AppColors';

// redux
import {useDispatch, useSelector} from 'react-redux';

// hooks
import {useKeyboard} from '../../hooks/useKeyboard';

// animations
import Animated, {useSharedValue, withTiming} from 'react-native-reanimated';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {NAV} from '../../navigation/navigationConfig';
import {setIdToken, setUserInfo} from '../../store/redux/userSlice';

function LoginBlock({}) {
  const theme = useSelector(state => state.theme.theme);

  const navigation = useNavigation();

  const dispatch = useDispatch();

  const {keyboardShown} = useKeyboard();

  const handleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      Alert.alert(
        'Voice Verse',
        `Welcome, ${userInfo?.user?.name}!\nYou can transcrive voice from any language into English and detect it's emotion!`,
      );

      dispatch(setIdToken({idToken: userInfo.idToken}));
      dispatch(setUserInfo({user: userInfo.user}));

      navigation.navigate(NAV.MAIN_BOTTOM_NAVIGATOR);

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: NAV.MAIN_BOTTOM_NAVIGATOR}],
        }),
      );
    } catch (error) {
      console.log('GOOGLE SIGN IN', error);

      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  const handleSignOut = async () => {
    try {
      await GoogleSignin.signOut();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    return () => {
      handleSignOut();
    };
  }, []);

  return (
    <BaseContainer
      style={[
        styles.loginBlock,
        {
          marginTop: keyboardShown ? 10 : 30,
        },
      ]}>
      <BaseText fontSize={36} fontWeight="500" marginBottom={15}>
        Log In
      </BaseText>

      <BaseText fontSize={20} fontWeight="400" marginBottom={25}>
        Click to login via Google:
      </BaseText>

      <PrimaryButton onPress={handleLogin}>Login</PrimaryButton>

      <View style={styles.footerOptions}>
        <BaseText fontWeight="400" align="center">
          Don't have an account?
        </BaseText>

        <TouchableOpacity onPress={handleLogin}>
          <BaseText color={AppColors(theme).PRIMARY}> Sign up</BaseText>
        </TouchableOpacity>
      </View>
    </BaseContainer>
  );
}

export default function LoginPage({}) {
  const theme = useSelector(state => state.theme.theme);

  const {keyboardShown} = useKeyboard();

  // animations for the header text:
  const headerOpacity = useSharedValue(1);
  const headerMarginBottom = useSharedValue(0);

  useEffect(() => {
    if (keyboardShown) {
      // when keyboard opens
      headerOpacity.value = withTiming(0, {duration: 200});
      headerMarginBottom.value = withTiming(-100, {duration: 200});
    }
    if (!keyboardShown) {
      // when keyboard closes
      headerOpacity.value = withTiming(1, {duration: 200});
      headerMarginBottom.value = withTiming(0, {duration: 200});
    }
  }, [keyboardShown]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.wrapper}>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          {
            backgroundColor: AppColors(theme).PRIMARY,
            paddingTop: keyboardShown ? 10 : 40,
          },
        ]}>
        {!keyboardShown && (
          <Animated.View
            style={{opacity: headerOpacity, marginBottom: headerMarginBottom}}>
            <BaseText
              fontSize={36}
              align="center"
              color={AppColors(theme).WHITE}>
              Voice Verse
            </BaseText>

            <BaseText
              fontSize={12}
              fontWeight="400"
              align="center"
              color={AppColors(theme).WHITE}>
              Convert sound into speech for any language.
            </BaseText>
          </Animated.View>
        )}

        <LoginBlock />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrapper: {flex: 1},
  container: {
    justifyContent: 'flex-end',
    rowGap: 5,
    flexGrow: 1,
  },
  loginBlock: {
    borderRadius: 40,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    paddingTop: 45,
    paddingHorizontal: 20,
    minHeight: '80%',
    rowGap: 40,
  },
  passwordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingRight: 4,
  },
  footerOptions: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingBottom: 20,
  },
  textFieldIcons: {
    justifyContent: 'center',
    paddingLeft: 10,
  },
});
