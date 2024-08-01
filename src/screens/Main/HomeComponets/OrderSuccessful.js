import React, {useEffect} from 'react';
import {View, Text, Image, BackHandler, TouchableOpacity} from 'react-native';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import colors from '../../../assets/colors';

const Success = () => {
  const navigation = useNavigation();

  function handleBackButtonClick() {
    // navigation.push('DashBoard');
    return true;
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          style={{height: 50, width: 50}}
          source={require('../../../assets/Icon/save.png')}
        />
        <Text
          style={{
            fontSize: 16,
            color: '#000',
            fontFamily: 'Montserrat-SemiBold',
            marginTop: 10,
          }}>
          Your Order has been punched.
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: '#000',
            fontFamily: 'Montserrat-SemiBold',
            marginTop: 2,
          }}>
          Thank you
        </Text>
        <TouchableOpacity
          //  onPress={()=>navigation.}
          onPress={() => navigation.reset({index: 0, routes: [{name: 'Home'}]})}
          style={{
            backgroundColor: colors.color1,
            width: 90,
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 6,
            borderRadius: 6,
            marginTop: 40,
          }}>
          <Text
            style={{
              color: '#fff',
              fontSize: 14,
              fontFamily: 'Montserrat-SemiBold',
            }}>
            OK
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Success;
