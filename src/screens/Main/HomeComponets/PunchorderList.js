import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Clipboard,
  ToastAndroid,
} from 'react-native';
import Header from '../../../components/CustomHeader';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../assets/colors';
import storage from '../../../utils/storageService';
import punchOrderPost from '../../../utils/punchOrderPost';
import Api from '../../../Redux/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PunchorderList = () => {
  const navigation = useNavigation();
  const [carts, setCarts] = useState([]);
  Clipboard.setString(JSON.stringify(carts));

  useEffect(() => {
    getCarts();
  }, []);
  const [isLoading, setIsLoading] = useState(false);
  const getCarts = async () => {
    const carts = await storage.getItem(storage.CART);
    if (carts) {
      setCarts(carts);
    }
  };
  const punchorder = async () => {
    try {
      setIsLoading(true);
      const token = await storage.getItem(storage.TOKEN);
      const endpoint = 'punch-order';
      const formData = await punchOrderPost(carts);
      const res = await Api.postRequest(endpoint, formData, token);
      ToastAndroid.show(res.message, ToastAndroid.LONG);
      if (res.status) {
        await storage.removeItem(storage.CART);
        setCarts([]);
        navigation.navigate('OrderSuccessful');
      }
      setIsLoading(false);
    } catch (error) {
      ToastAndroid.show(error.message, ToastAndroid.LONG);
      setIsLoading(false);
      console.log(error);
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Header
        title={'Punch Order List'}
        onPress={() => navigation.goBack()}
        arrow={true}
      />
      <View style={{padding: 15}}>
        {carts.length > 0 ? (
          <FlatList
            data={carts}
            style={{marginBottom: 100}}
            renderItem={({item}) => (
              <View
                style={{
                  borderWidth: 1,
                  width: '100%',
                  marginBottom: 10,
                  borderRadius: 6,
                  padding: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}>
                  <View style={{flexDirection: 'row', width: '75%'}}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#000',
                        fontFamily: 'Montserrat-SemiBold',
                      }}>
                      {'Customer Name : '}
                    </Text>
                    <Text
                      style={{
                        marginLeft: 10,
                        color: '#000',
                        fontFamily: 'Montserrat-Regular',
                        fontSize: 13,
                      }}>
                      {item?.customerName?.Partyname?.substring(0, 20)}
                    </Text>
                  </View>
                  <View style={{alignItems: 'flex-end'}}>
                    <Text
                      style={{
                        color: '#000',
                        fontFamily: 'Montserrat-Regular',
                        fontSize: 13,
                      }}>
                      {item?.date}
                    </Text>
                  </View>
                </View>

                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#000',
                      fontFamily: 'Montserrat-SemiBold',
                    }}>
                    {'Color : '}
                  </Text>
                  <Text
                    style={{
                      marginLeft: 10,
                      color: '#000',
                      fontFamily: 'Montserrat-Regular',
                      fontSize: 13,
                    }}>
                    {item?.color.color}
                  </Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#000',
                      fontFamily: 'Montserrat-SemiBold',
                    }}>
                    {'Design : '}
                  </Text>
                  <Text
                    style={{
                      marginLeft: 10,
                      color: '#000',
                      fontFamily: 'Montserrat-Regular',
                      fontSize: 13,
                    }}>
                    {item?.design?.Design}
                  </Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#000',
                      fontFamily: 'Montserrat-SemiBold',
                    }}>
                    {'Price : '}
                  </Text>
                  <Text
                    style={{
                      marginLeft: 10,
                      color: '#000',
                      fontFamily: 'Montserrat-Regular',
                      fontSize: 13,
                    }}>
                    {item?.price}
                  </Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#000',
                      fontFamily: 'Montserrat-SemiBold',
                    }}>
                    {'Cut : '}
                  </Text>
                  <Text
                    style={{
                      marginLeft: 10,
                      color: '#000',
                      fontFamily: 'Montserrat-Regular',
                      fontSize: 13,
                    }}>
                    {item?.cut}
                  </Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#000',
                      fontFamily: 'Montserrat-SemiBold',
                    }}>
                    {'Shade : '}
                  </Text>
                  <Text
                    style={{
                      marginLeft: 10,
                      color: '#000',
                      fontFamily: 'Montserrat-Regular',
                      fontSize: 13,
                    }}>
                    {item?.shade?.shade}
                  </Text>
                </View>
              </View>
            )}
          />
        ) : (
          <View
            style={{
              height: '100%',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: 'lightgrey',
                fontFamily: 'Montserrat-Bold',
                fontSize: wp(4.5),
                fontWeight: 'bold',
                marginTop: '-15%',
              }}>
              {'There are no items'}
            </Text>
          </View>
        )}
      </View>

      {carts.length > 0 && (
        <View
          style={{
            position: 'absolute',
            bottom: 20,
            left: 0,
            right: 0,
            backgroundColor: '#fff',
          }}>
          <TouchableOpacity
            onPress={() => {
              punchorder();
            }}
            style={{
              height: hp(5.3),
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              width: wp(42),
              backgroundColor: colors.color1,
              borderRadius: wp(2),
            }}
            // onPress={() => navigation.navigate('PunchorderList')}
          >
            <Text
              style={{
                color: 'white',
                fontFamily: 'Montserrat-Bold',
                fontSize: wp(4.5),
                fontWeight: 'bold',
              }}>
              Punch Order
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
export default PunchorderList;
const data = [
  {
    customerName: 'Tarun pal',
    design: 'any',
    price: 300,
    color: 'red',
    cut: 'any',
    shade: 'any',
    date: '01 mar 2024',
  },
  {
    customerName: 'Tarun pal',
    design: 'any',
    price: 300,
    color: 'red',
    cut: 'any',
    shade: 'any',
    date: '01 mar 2024',
  },
  {
    customerName: 'Tarun pal',
    design: 'any',
    price: 300,
    color: 'red',
    cut: 'any',
    shade: 'any',
    date: '01 mar 2024',
  },
  {
    customerName: 'Tarun pal',
    design: 'any',
    price: 300,
    color: 'red',
    cut: 'any',
    shade: 'any',
    date: '01 mar 2024',
  },
  {
    customerName: 'Tarun pal',
    design: 'any',
    price: 300,
    color: 'red',
    cut: 'any',
    shade: 'any',
    date: '01 mar 2024',
  },
  {
    customerName: 'Tarun pal',
    design: 'any',
    price: 300,
    color: 'red',
    cut: 'any',
    shade: 'any',
    date: '01 mar 2024',
  },
];
