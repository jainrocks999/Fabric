import React from 'react';
import {Image} from 'react-native';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SplashScreen from "../screens/Auth/SplashPage";
import Login from "../screens/Auth/LoginPage";

import HomeScreen from "../screens/Main/HomeScreen";
import Drawer from "../components/Drawer";
import PunchOrder from "../screens/Main/HomeComponets/Punchorder";
import BagCheck from "../screens/Main/HomeComponets/BagCheck";
import RollCheck from "../screens/Main/HomeComponets/RollCheck";
import StockCheck from "../screens/Main/HomeComponets/StockCheck";
import UpdateStock from "../screens/Main/HomeComponets/UpdateStock";
import LandingPage from "../screens/Main/LandingPage";
import Notification from "../screens/Main/HomeComponets/Notification";
import StockDetailScreen from "../screens/Main/HomeComponets/StockDetailScreen";
import Punchorder2 from "../screens/Main/HomeComponets/Punchorder2";
import PunchorderList from "../screens/Main/HomeComponets/PunchorderList";
import OrderSuccessful from "../screens/Main/HomeComponets/OrderSuccessful";
import Testing from "../screens/Main/HomeComponets/Testing";
import Test from "../screens/Main/HomeComponets/Test";

const Stack = createNativeStackNavigator();
function Navigate() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        
        <Stack.Screen name="LandingPage" component={LandingPage}/>
        <Stack.Screen name='Test' component={Test}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const Stack1 = createNativeStackNavigator();

function Home(){
  return(
      <Stack1.Navigator         
        initialRouteName="DashBoard"
        screenOptions={{headerShown: false}}>
         <Stack1.Screen name='DashBoard' component={MyDrawer}/>
         <Stack1.Screen name='Punchorder2' component={Punchorder2}/>
         <Stack1.Screen name="PunchorderList" component={PunchorderList}/>
         <Stack1.Screen name='StockDetailScreen' component={StockDetailScreen}/>
         <Stack1.Screen name='OrderSuccessful' component={OrderSuccessful}/>
         <Stack1.Screen name="Test" component={Testing}/>
        
      </Stack1.Navigator>
  )
}

const DrawerStack = createDrawerNavigator();
function MyDrawer() {
  return (
    <DrawerStack.Navigator
    screenOptions={{headerShown:false}}
    drawerContent={() => <Drawer/>}>
         <DrawerStack.Screen name="Home1" component={HomeScreen} />
         <DrawerStack.Screen name="PunchOrder" component={PunchOrder}/>
         <DrawerStack.Screen name="BagCheck" component={BagCheck}/>
         <DrawerStack.Screen name="RollCheck" component={RollCheck}/>
         <DrawerStack.Screen name="StockCheck" component={StockCheck}/>
         <DrawerStack.Screen name="UpdateStock" component={UpdateStock}/>
        
    </DrawerStack.Navigator>
  );
}



export default Navigate;
