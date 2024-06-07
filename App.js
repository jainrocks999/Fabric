import React, { Fragment, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  LogBox,
  Button,
  Platform,
  SafeAreaView,
  FlatList,
} from 'react-native';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import Store from './src/Redux/Store';
import RootApp from './src/navigation';
import colors from "./src/assets/colors";

LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

const App = () => {
  return (
    <Fragment>
      <SafeAreaView style={{ backgroundColor: Platform.OS == 'ios' ? colors.color1 : colors.color1 }} />
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: Platform.OS == 'ios' ? colors.color1 : colors.color1,
        }}>
        <Provider store={Store}>
          <RootApp />
        </Provider>
        {/* <StatusBar /> */}
      </SafeAreaView>
    </Fragment>
  );
};

export default App;

