import {GoogleSignin} from '@react-native-google-signin/google-signin';

import React from 'react';
import {View, ScrollView, StyleSheet, Image} from 'react-native';

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

function DetailsBlock({}) {
  const dispatch = useDispatch();

  const navigation = useNavigation();

  const userInfo = useSelector(state => state.user.user);

  const {keyboardShown} = useKeyboard();

  return (
    <BaseContainer
      style={[
        styles.loginBlock,
        {
          marginTop: keyboardShown ? 10 : 30,
        },
      ]}>
      <BaseText fontSize={36} fontWeight="500" marginBottom={15}>
        Profile
      </BaseText>

      <Image
        source={{uri: userInfo?.photo}}
        style={{width: 100, height: 100}}
      />

      <BaseText fontSize={26} fontWeight="500" marginBottom={-25}>
        {userInfo.name}
      </BaseText>

      <BaseText fontSize={22} fontWeight="400" marginBottom={25}>
        {userInfo.email}
      </BaseText>

      <PrimaryButton
        onPress={async () => {
          try {
            await GoogleSignin.signOut();
            dispatch(logout({}));
            navigation.navigate(NAV.ONBOARDING);

            setTimeout(() => {
              navigation.navigate(NAV.LOGIN);
            }, 200);
          } catch (error) {
            console.error(error);
          }
        }}>
        Sign Out
      </PrimaryButton>

      <View style={styles.footerOptions}>
        <BaseText fontWeight="400" align="center">
          You can sign in again with another account.
        </BaseText>
      </View>
    </BaseContainer>
  );
}

export default function ProfilePage({}) {
  const theme = useSelector(state => state.theme.theme);

  const {keyboardShown} = useKeyboard();

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        {
          backgroundColor: AppColors(theme).PRIMARY,
          paddingTop: keyboardShown ? 10 : 40,
        },
      ]}>
      {!keyboardShown && (
        <View>
          <BaseText fontSize={36} align="center" color={AppColors(theme).WHITE}>
            Voice Verse
          </BaseText>

          <BaseText
            fontSize={12}
            fontWeight="400"
            align="center"
            color={AppColors(theme).WHITE}>
            Convert sound into speech for any language.
          </BaseText>
        </View>
      )}

      <DetailsBlock />
    </ScrollView>
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
