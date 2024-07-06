import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  LayoutAnimation,
  Alert,
} from 'react-native';
import DrawerCross from '../../assets/Icon/DrawerCross.svg';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import {RNCamera} from 'react-native-camera';
import QRCodeScanner from '../../components/QRCodeScanner';
import Modal from 'react-native-modal';
import colors from '../../assets/colors';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../Loader';
import Toast from 'react-native-simple-toast';
import storage from '../../utils/storageService';
const Drawer = () => {
  const navigation = useNavigation();
  const [loader, setLoader] = useState(false);
  const [visible, setVisibles] = useState(false);

  const manageDashboard = () => {
    navigation.dispatch(DrawerActions.closeDrawer());
    navigation.navigate('Home1');
  };

  const managePunch = () => {
    navigation.dispatch(DrawerActions.closeDrawer());
    navigation.navigate('PunchOrder');
  };
  const manageBagCheck = () => {
    navigation.dispatch(DrawerActions.closeDrawer());
    // navigation.navigate('BagCheck')
    setVisibles(true);
  };
  const manageRollCheck = () => {
    navigation.dispatch(DrawerActions.closeDrawer());
    // navigation.navigate('RollCheck')
    setVisibles(true);
  };
  const manageStockCheck = () => {
    navigation.dispatch(DrawerActions.closeDrawer());
    navigation.navigate('StockCheck');
  };
  const manageUpdateStock = () => {
    navigation.dispatch(DrawerActions.closeDrawer());
    navigation.navigate('UpdateStock');
  };
  const manageCompany = () => {
    navigation.dispatch(DrawerActions.closeDrawer());
    navigation.navigate('LandingPage');
  };

  const Loggout = () => {
    Alert.alert(
      'Are you sure you want to log out?',
      '',
      [
        {
          text: 'Cancel',
          onPress: () => {
            cancelable: false;
          },
          style: 'cancel',
        },
        {text: 'ok', onPress: () => Logout()},
      ],
      {cancelable: false},
    );
  };

  const Logout = async () => {
    navigation.dispatch(DrawerActions.closeDrawer());
    const Token = await storage.getItem(storage.TOKEN);
    try {
      setLoader(true);
      const response = await axios({
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://203.123.38.118:8080/admin/index.php/api/logout',
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      });
      if (response.data.status == 'success') {
        setLoader(false);
        Toast.show(response?.data?.message);
        storage.removeItem(storage.TOKEN);
        navigation.replace('Login');
        console.log('hoofogsdog', response.data);
      } else {
        setLoader(false);
        console.log('hoofogsdogghhgf', response.data);
      }
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };

  return (
    <View style={{backgroundColor: '#FFF', flex: 1}}>
      {loader ? <Loading /> : null}
      <View
        style={{
          paddingLeft: 15,
          paddingTop: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingRight: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            marginTop: 15,
          }}>
          <Image
            style={{height: 80, width: 80}}
            source={require('../../assets/Logo/fabric_logo.png')}
          />

          <Text
            style={{
              fontSize: 18,
              color: colors.color1,
              fontFamily: 'Montserrat-Medium',
              marginLeft: 15,
            }}>
            User Name
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}>
          <DrawerCross />
        </TouchableOpacity>
      </View>
      <View
        style={{
          borderBottomWidth: 0.5,
          marginHorizontal: 10,
          borderColor: 'grey',
          marginTop: 10,
        }}
      />
      <View style={{paddingLeft: 15, marginTop: 30}}>
        {/* onPress={()=>manageAbout()} */}
        <TouchableOpacity activeOpacity={0.5} onPress={() => manageDashboard()}>
          <Text
            style={{
              fontSize: 16,
              color: colors.color1,
              fontFamily: 'Montserrat-Medium',
            }}>
            Dashboard
          </Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.5} onPress={() => managePunch()}>
          <Text
            style={{
              fontSize: 16,
              color: colors.color1,
              fontFamily: 'Montserrat-Medium',
              marginTop: 20,
            }}>
            Punch Order
          </Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.5} onPress={() => manageBagCheck()}>
          <Text
            style={{
              fontSize: 16,
              color: colors.color1,
              fontFamily: 'Montserrat-Medium',
              marginTop: 20,
            }}>
            Bag Check
          </Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.5} onPress={() => manageRollCheck()}>
          <Text
            style={{
              fontSize: 16,
              color: colors.color1,
              fontFamily: 'Montserrat-Medium',
              marginTop: 20,
            }}>
            Roll Check
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => manageStockCheck()}>
          <Text
            style={{
              fontSize: 16,
              color: colors.color1,
              fontFamily: 'Montserrat-Medium',
              marginTop: 20,
            }}>
            Stock Stock
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => manageUpdateStock()}>
          <Text
            style={{
              fontSize: 16,
              color: colors.color1,
              fontFamily: 'Montserrat-Medium',
              marginTop: 20,
            }}>
            Update Stock
          </Text>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.5} onPress={() => manageCompany()}>
          <Text
            style={{
              fontSize: 16,
              color: colors.color1,
              fontFamily: 'Montserrat-Medium',
              marginTop: 20,
            }}>
            Change Company
          </Text>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.5} onPress={() => Loggout()}>
          <Text
            style={{
              fontSize: 16,
              color: colors.color1,
              fontFamily: 'Montserrat-Medium',
              marginTop: 20,
            }}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          bottom: 15,
          left: 0,
          right: 0,
          position: 'absolute',
          paddingLeft: 20,
        }}>
        <Text
          style={{
            fontSize: 16,
            color: colors.color1,
            fontFamily: 'Montserrat-Medium',
          }}>
          Version 1.1
        </Text>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        style={{
          width: '100%',
          alignSelf: 'center',
          marginHorizontal: 50,
          margin: 0,
        }}
        onRequestClose={() => {}}>
        <View
          style={{
            //   flex: 1,
            backgroundColor: '#D6E1EC50',
            height: '100%',
          }}>
          <View style={{flex: 1}}>
            <QRCodeScanner
              // completionHandler={this.completionQRViewHandler}
              closeHandler={() => setVisibles(false)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Drawer;
