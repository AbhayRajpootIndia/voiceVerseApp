import React from 'react';
import {SafeAreaView} from 'react-native';

// screens
import Onboarding from '../screens/Onboarding/Onboarding';
import MainBottomNavigator from './MainBottomNavigator';

// navigator
import {createStackNavigator} from '@react-navigation/stack';

// Nav config
import {NAV} from './navigationConfig';

// constants
import {AppColors} from '../constants/AppColors';

// redux
import {useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';

const MainStack = createStackNavigator();

export default function AppNavigator() {
  const theme = useSelector(state => state.theme.theme);

  const containerStyle = {
    flex: 1,
    backgroundColor: AppColors(theme).BODY,
  };

  const idToken = useSelector(state => state.user.idToken);

  const initialRouteName = (() => {
    if (idToken) {
      return NAV.MAIN_BOTTOM_NAVIGATOR;
    }

    return NAV.ONBOARDING;
  })();

  return (
    <SafeAreaView style={containerStyle}>
      <NavigationContainer>
        <MainStack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName={initialRouteName}>
          <MainStack.Screen name={NAV.ONBOARDING} component={Onboarding} />

          <MainStack.Screen
            name={NAV.MAIN_BOTTOM_NAVIGATOR}
            component={MainBottomNavigator}
          />
        </MainStack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
