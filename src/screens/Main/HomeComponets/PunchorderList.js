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
import Trash from '../../../assets/Icon/trash.svg';
import PenCile from '../../../assets/Icon/pencil.svg';
const PunchorderList = () => {
  const navigation = useNavigation();
  const [carts, setCarts] = useState([]);

  // console.log(carts);

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
      console.log('yyjyyj', res);
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
  const handleDelete = async item => {
    setCarts(prev => {
      const newdata = prev.filter(items => items.id !== item.id);
      return newdata;
    });
    try {
      const newdata = carts.filter(items => items.id !== item.id);
      await storage.setItem(storage.CART, newdata);
    } catch (error) {
      console.error('Error storing data:', error);
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
                <TouchableOpacity
                  onPress={async () => {
                    handleDelete(item);
                  }}
                  style={{
                    right: '2%',
                    position: 'absolute',
                    top: '1%',
                    padding: '2%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Trash height={18} width={18} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigation.replace('Punchorder2', {
                      remark: item?.remark,
                      customer: item?.customerName,
                      address: item?.address,
                      id: item.id,
                    });
                  }}
                  style={{
                    right: '2%',
                    position: 'absolute',
                    top: '26%',
                    padding: '2%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 5,
                  }}>
                  <PenCile height={18} width={18} />
                </TouchableOpacity>

                <View
                  style={{flexDirection: 'row', width: '100%', marginTop: 0}}>
                  <View style={{width: '40%', flexDirection: 'row'}}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#000',
                        fontFamily: 'Montserrat-SemiBold',
                        width: '100%',
                      }}>
                      {'Customer Name'}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#000',
                        fontFamily: 'Montserrat-SemiBold',
                      }}>
                      {':'}
                    </Text>
                  </View>
                  <Text
                    style={{
                      marginLeft: 10,
                      color: '#000',
                      fontFamily: 'Montserrat-Regular',
                      fontSize: 13,
                    }}>
                    {item?.customerName?.Partyname?.length > 13
                      ? item.customerName.Partyname.substring(0, 13) + '...'
                      : item.customerName.Partyname}
                  </Text>
                </View>
                <View style={{flexDirection: 'row', width: '100%'}}>
                  <View style={{width: '40%', flexDirection: 'row'}}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#000',
                        fontFamily: 'Montserrat-SemiBold',
                        width: '100%',
                      }}>
                      {'Design'}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#000',
                        fontFamily: 'Montserrat-SemiBold',
                      }}>
                      {':'}
                    </Text>
                  </View>
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
                <View style={{flexDirection: 'row', width: '100%'}}>
                  <View style={{width: '40%', flexDirection: 'row'}}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#000',
                        fontFamily: 'Montserrat-SemiBold',
                        width: '100%',
                      }}>
                      {'Color'}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#000',
                        fontFamily: 'Montserrat-SemiBold',
                      }}>
                      {':'}
                    </Text>
                  </View>
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
                <View style={{flexDirection: 'row', width: '100%'}}>
                  <View style={{width: '40%', flexDirection: 'row'}}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#000',
                        fontFamily: 'Montserrat-SemiBold',
                        width: '100%',
                      }}>
                      {'Shade'}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#000',
                        fontFamily: 'Montserrat-SemiBold',
                      }}>
                      {':'}
                    </Text>
                  </View>
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
                <View style={{flexDirection: 'row', width: '100%'}}>
                  <View style={{width: '40%', flexDirection: 'row'}}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#000',
                        fontFamily: 'Montserrat-SemiBold',
                        width: '100%',
                      }}>
                      {'Cut'}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#000',
                        fontFamily: 'Montserrat-SemiBold',
                      }}>
                      {':'}
                    </Text>
                  </View>
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
                <View style={{flexDirection: 'row', width: '100%'}}>
                  <View style={{width: '40%', flexDirection: 'row'}}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#000',
                        fontFamily: 'Montserrat-SemiBold',
                        width: '100%',
                      }}>
                      {'Price'}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#000',
                        fontFamily: 'Montserrat-SemiBold',
                      }}>
                      {':'}
                    </Text>
                  </View>
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
                <View style={{flexDirection: 'row', width: '100%'}}>
                  <View style={{width: '40%', flexDirection: 'row'}}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#000',
                        fontFamily: 'Montserrat-SemiBold',
                        width: '100%',
                      }}>
                      {'Remark'}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#000',
                        fontFamily: 'Montserrat-SemiBold',
                      }}>
                      {':'}
                    </Text>
                  </View>
                  <Text
                    style={{
                      marginLeft: 10,
                      color: '#000',
                      fontFamily: 'Montserrat-Regular',
                      fontSize: 13,
                    }}>
                    {item?.remark}
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
