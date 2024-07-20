import React, {Fragment} from 'react';
import {LogBox, Platform, SafeAreaView} from 'react-native';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import Store from './src/Redux/Store';
import RootApp from './src/navigation';
import colors from './src/assets/colors';

LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

const App = () => {
  return (
    <Fragment>
      <SafeAreaView
        style={{
          backgroundColor: Platform.OS == 'ios' ? colors.color1 : colors.color1,
        }}
      />
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: Platform.OS == 'ios' ? colors.color1 : colors.color1,
        }}>
        <Provider store={Store}>
          <RootApp />
        </Provider>
      </SafeAreaView>
    </Fragment>
  );
};

export default App;
