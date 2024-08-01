import React from 'react';
import {Image} from 'react-native';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import SplashScreen from '../screens/Auth/SplashPage';
import Login from '../screens/Auth/LoginPage';

import HomeScreen from '../screens/Main/HomeScreen';
import Drawer from '../components/Drawer';
import PunchOrder from '../screens/Main/HomeComponets/Punchorder';
import BagCheck from '../screens/Main/HomeComponets/BagCheck';
import RollCheck from '../screens/Main/HomeComponets/RollCheck';
import StockCheck from '../screens/Main/HomeComponets/StockCheck';
import UpdateStock from '../screens/Main/HomeComponets/UpdateStock';
import LandingPage from '../screens/Main/LandingPage';
import Notification from '../screens/Main/HomeComponets/Notification';
import StockDetailScreen from '../screens/Main/HomeComponets/StockDetailScreen';
import Punchorder2 from '../screens/Main/HomeComponets/Punchorder2';
import PunchorderList from '../screens/Main/HomeComponets/PunchorderList';
import OrderSuccessful from '../screens/Main/HomeComponets/OrderSuccessful';
import {navigationRef} from '../utils/navigationService';
import PunchOrderHistory from '../screens/Main/HomeComponets/PunchOrderHistory';

const Stack = createNativeStackNavigator();
function Navigate() {
  return (
    <NavigationContainer
      onStateChange={state => {
        const name = state?.routes[state.index].name;
        const fullname = state?.routes;
        console.log('thsis is fullname', JSON.stringify(name));
      }}
      ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Home" component={MyDrawer} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="LandingPage" component={LandingPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const Stack1 = createNativeStackNavigator();

function Home() {
  return (
    <Stack1.Navigator
      initialRouteName="DashBoard"
      screenOptions={{headerShown: false}}>
      <Stack1.Screen name="DashBoard" component={HomeScreen} />
      <Stack1.Screen name="Punchorder2" component={Punchorder2} />
      <Stack1.Screen name="PunchorderList" component={PunchorderList} />
      <Stack1.Screen name="StockDetailScreen" component={StockDetailScreen} />
      <Stack1.Screen name="OrderSuccessful" component={OrderSuccessful} />
      <Stack1.Screen name="PunchOrder" component={PunchOrder} />
      <Stack1.Screen name="History" component={PunchOrderHistory} />
      <Stack1.Screen name="BagCheck" component={BagCheck} />
      <Stack1.Screen name="RollCheck" component={RollCheck} />
      <Stack1.Screen name="StockCheck" component={StockCheck} />
      <Stack1.Screen name="UpdateStock" component={UpdateStock} />
    </Stack1.Navigator>
  );
}

const DrawerStack = createDrawerNavigator();
function MyDrawer() {
  return (
    <DrawerStack.Navigator
      screenOptions={{headerShown: false}}
      drawerContent={() => <Drawer />}>
      <DrawerStack.Screen name="Home1" component={Home} />
    </DrawerStack.Navigator>
  );
}

export default Navigate;
