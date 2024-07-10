import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import HeaderArrow from '../../assets/Icon/HeaderArrow.svg';
import Menu from '../../assets/Icon/Menu1.svg';
import colors from '../../assets/colors';
import BackArrow from '../../assets/Icon/BackArrow.svg';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';

const CustomHeader = ({title, onPress, source, arrow, scanner, onPress2}) => {
  const navigation = useNavigation();
  return (
    <View>
      <View
        style={{
          height: hp(5.7),
          backgroundColor: colors.color1,
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={onPress}
          style={{
            width: 60,
            height: 45,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {arrow ? <HeaderArrow /> : <Menu />}
        </TouchableOpacity>
        <Text
          style={{fontSize: 16, color: '#FFF', fontFamily: 'Montserrat-Bold'}}>
          {title}
        </Text>
        <TouchableOpacity
          activeOpacity={0.5}
          style={{
            width: 60,
            height: 45,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={onPress2}>
          {scanner ? (
            <Image
              style={{height: 25, width: 25, tintColor: '#fff'}}
              source={require('../../assets/Icon/qrcode2.png')}
            />
          ) : null}
        </TouchableOpacity>
      </View>
      {!arrow ? (
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: 42,
            height: 32,
            backgroundColor: colors.color1,
            borderTopLeftRadius: 80,
            borderTopRightRadius: 40,
            borderBottomLeftRadius: 80,
            borderBottomRightRadius: 40,
            margin: '2%',
          }}>
          <BackArrow />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};
export default CustomHeader;
