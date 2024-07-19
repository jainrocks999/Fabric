import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  StatusBar,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Eye from '../../../assets/Icon/eye.svg';
import Eye1 from '../../../assets/Icon/eye1.svg';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../../assets/colors';
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import Loading from '../../../components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import storage from '../../../utils/storageService';
import Api from '../../../Redux/Api';
import Constants from '../../../Redux/Constants';
const Login = () => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const HandaleLogin = async () => {
    if (re.test(email) == '') {
      Toast.show('Please enter the valid email');
      return;
    } else if (password == '') {
      Toast.show('Please enter the valid password');
      return;
    } else {
      try {
        let data = new FormData();
        data.append('email', email);
        data.append('password', password);
        setLoading(true);
        let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: Constants.mainUrl + '/login',
          headers: {},
          data: data,
        };

        axios
          .request(config)
          .then(response => {
            if (response.data.status == 200) {
              setLoading(false);

              storage.setItem(storage.TOKEN, response.data.token);
              storage.setItem(storage.USER, response.data.user);
              ToastAndroid.show('Login Success', ToastAndroid.SHORT);
              navigation.replace('LandingPage');
            } else {
              setLoading(false);
              console.log(JSON.stringify(response.data));
            }
          })
          .catch(err => {
            if (err.response.status === 400) {
              ToastAndroid.show(
                'invalid username or password',
                ToastAndroid.SHORT,
              );
            }
            throw err;
          })
          .finally(() => {
            setLoading(false);
          });
      } catch (error) {
        setLoading(false);
        console.log('error,,', error);
      }
    }
  };

  return (
    <LinearGradient colors={['#FFF', '#FFF8']} style={{flex: 1}}>
      <StatusBar backgroundColor={'#fff'} />
      <KeyboardAwareScrollView
        style={{flex: 1}}
        extraScrollHeight={0}
        enableOnAndroid={true}
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{flexGrow: 1}}>
        {loading ? <Loading /> : null}
        <View style={{flex: 1}}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 70,
            }}>
            <Image
              style={{height: 200, width: '50%'}}
              source={require('../../../assets/Logo/fabric_logo.png')}
            />
          </View>
          <View style={{marginTop: 50, paddingHorizontal: 15}}>
            <Text
              style={{
                fontFamily: 'Montserrat-SemiBold',
                fontSize: 15,
                color: colors.color1,
              }}>
              Email Address
            </Text>
            <View
              style={{
                borderWidth: 1,
                height: 36,
                paddingHorizontal: 10,
                borderRadius: 8,
                marginTop: 6,
                fontFamily: 'Montserrat-SemiBold',
                justifyContent: 'center',
              }}>
              <TextInput
                style={{fontSize: 14, marginBottom: -2, color: '#000'}}
                placeholder="Email Address"
                keyboardType="email-address"
                //  placeholderTextColor={'#000'}
                value={email}
                onChangeText={text => setEmail(text)}
              />
            </View>
            <Text
              style={{
                fontFamily: 'Montserrat-SemiBold',
                fontSize: 15,
                color: colors.color1,
                marginTop: 30,
              }}>
              Password
            </Text>
            <View
              style={{
                borderWidth: 1,
                height: 36,
                paddingHorizontal: 10,
                borderRadius: 8,
                marginTop: 6,
                fontFamily: 'Montserrat-SemiBold',
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <TextInput
                style={{fontSize: 14, marginBottom: -2, color: '#000'}}
                placeholder="Password"
                keyboardType="default"
                // placeholderTextColor={'#000'}
                value={password}
                onChangeText={text => setPassword(text)}
                secureTextEntry={visible}
              />
              {visible ? (
                <TouchableOpacity
                  onPress={() => setVisible(!visible)}
                  style={{padding: 6}}>
                  <Eye />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => setVisible(!visible)}
                  style={{padding: 6}}>
                  <Eye1 />
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View style={{marginTop: 40, marginHorizontal: 15}}>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => HandaleLogin()}
              style={{
                height: 45,
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: colors.color1,
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: 18,
                  fontFamily: 'Montserrat-Bold',
                  marginRight: 14,
                }}>
                Login
              </Text>
              {/* <Arrow /> */}
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
      <View></View>
    </LinearGradient>
    // </View>
  );
};
export default Login;
