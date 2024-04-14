/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// screens
import ProfilePage from '../screens/ProfilePage';

// components
import MainBottomTabBar from '../components/Navigation/MainBottomTabBar';

// icons
import ProfileIcon from '../assets/icons/profile';

// NAV
import {NAV} from './navigationConfig';
import {AppColors} from '../constants/AppColors';

// REDUX
import {useSelector} from 'react-redux';
import {Platform} from 'react-native';

// util
import {useKeyboard} from '../hooks/useKeyboard';

// tabBarConfig:
const tabBarIconSize = {width: 28, height: 28};
const tabBarLabelSize = 14;

const MainBottomTabs = createBottomTabNavigator();

export default function MainBottomNavigator() {
  const theme = useSelector(state => state.theme.theme);

  const primaryColor = AppColors(theme).PRIMARY_DARK;
  const disabledColor = AppColors(theme).GRAY;

  const {keyboardShown} = useKeyboard();

  return (
    <MainBottomTabs.Navigator
      initialRouteName={NAV.MOVIES_PAGE}
      screenOptions={{headerShown: false}}
      tabBar={props =>
        keyboardShown && Platform.OS === 'android' ? (
          <></>
        ) : (
          <MainBottomTabBar {...props} />
        )
      }>
      {/* <MainBottomTabs.Screen
        name={NAV.MOVIES_PAGE}
        children={() => <MoviePage />}
        options={{
          activeIcon: (
            <CameraReelIcon color={primaryColor} {...tabBarIconSize} />
          ),
          inactiveIcon: (
            <CameraReelIcon color={disabledColor} {...tabBarIconSize} />
          ),
          tabBarLabel: 'Movies',
          tabBarLabelSize: tabBarLabelSize,
          activeColor: primaryColor,
          inactiveColor: disabledColor,
        }}
      />

      <MainBottomTabs.Screen
        name={NAV.SHOWS_PAGE}
        children={() => <ShowsPage />}
        options={{
          activeIcon: <TvIcon color={primaryColor} width={24} height={28} />,
          inactiveIcon: <TvIcon color={disabledColor} width={24} height={28} />,
          tabBarLabel: 'Shows',
          tabBarLabelSize: tabBarLabelSize,
          activeColor: primaryColor,
          inactiveColor: disabledColor,
        }}
      /> */}

      <MainBottomTabs.Screen
        name={NAV.PROFILE_PAGE}
        children={() => <ProfilePage />}
        options={{
          activeIcon: (
            <ProfileIcon color={primaryColor} width={24} height={28} />
          ),
          inactiveIcon: (
            <ProfileIcon color={disabledColor} width={24} height={28} />
          ),
          tabBarLabel: 'Account',
          tabBarLabelSize: tabBarLabelSize,
          activeColor: primaryColor,
          inactiveColor: disabledColor,
        }}
      />
    </MainBottomTabs.Navigator>
  );
}
