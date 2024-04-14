/* eslint-disable react-native/no-inline-styles */
import 'react-native-gesture-handler';

import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

// Redux
import {Provider} from 'react-redux';
import {store, persistor} from './src/store/redux/store';
import {PersistGate} from 'redux-persist/integration/react';

// Router
import AppRouter from './src/navigation/AppRouter';

// Constants
import {AppColors, THEMES} from './src/constants/AppColors';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const theme = isDarkMode ? THEMES.DARK : THEMES.LIGHT;

  const backgroundStyle = {
    backgroundColor: AppColors(theme).AppBody,
    flex: 1,
  };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView style={{flex: 1}}>
          <SafeAreaView style={backgroundStyle}>
            <StatusBar
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
              backgroundColor={backgroundStyle.backgroundColor}
            />
            <AppRouter />
          </SafeAreaView>
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
}

export default App;
