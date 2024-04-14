import React from 'react';

// Navigator
import {createStackNavigator} from '@react-navigation/stack';

// screens
import LoginPage from './LoginPage';
import SignUp from './SignUp';

// Nav config
import {NAV} from '../../navigation/navigationConfig';

const OnboardingStack = createStackNavigator();

export default function Onboarding({}) {
  return (
    <OnboardingStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={NAV.LOGIN}>
      <OnboardingStack.Screen name={NAV.SIGNUP} children={() => <SignUp />} />
      <OnboardingStack.Screen name={NAV.LOGIN} children={() => <LoginPage />} />
    </OnboardingStack.Navigator>
  );
}
