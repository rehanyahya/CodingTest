import React from 'react';
import {View} from 'react-native';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {store} from './src/store';
import FlashMessage from 'react-native-flash-message';
import MainNavigation from './src/navigation';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider style={{flex: 1}}>
        <MainNavigation />
        <FlashMessage position="top" />
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
