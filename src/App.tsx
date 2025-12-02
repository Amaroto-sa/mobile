import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {RootNavigator} from '@navigation/index';
import {SessionProvider} from '@hooks/useSession';
import {theme} from '@theme/index';

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <SessionProvider>
          <StatusBar
            barStyle="light-content"
            backgroundColor={theme.palette.night}
          />
          <RootNavigator />
        </SessionProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
