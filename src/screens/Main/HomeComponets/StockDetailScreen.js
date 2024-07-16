import React, {useEffect, useState} from 'react';
import {View, Text, ToastAndroid} from 'react-native';
import Header from '../../../components/CustomHeader';
import {useNavigation} from '@react-navigation/native';
import storage from '../../../utils/storageService';
import Api from '../../../Redux/Api';
import Loader from '../../../components/Loader';

const StockDetailScreen = ({route}) => {
  const [loading, setIsLoading] = useState(false);
  // const [data, setData] = useState(false);
  const {data} = route.params;
  const barcode = data.barcode;

  const navigation = useNavigation();
  return (
    <View style={{flex: 1}}>
      {loading && <Loader />}
      <Header
        title={'Stock Details'}
        onPress={() => navigation.goBack()}
        arrow={true}
      />
      {!loading ? (
        <View
          style={{
            borderWidth: 1,
            padding: '2%',
            marginTop: '5%',
            width: '99%',
            alignSelf: 'center',
          }}>
          {/* <View style={{flexDirection: 'row', marginTop: 5}}>
          <Text
            style={{
              fontSize: 15,
              color: '#000',
              fontFamily: 'Montserrat-SemiBold',
            }}>
            {'Name : '}
          </Text>
          <Text
            style={{
              fontSize: 15,
              color: '#000',
              fontFamily: 'Montserrat-Medium',
            }}>
            {'Lorem Ipsum'}
          </Text>
        </View> */}

          <View style={{flexDirection: 'row', marginTop: 5, width: '100%'}}>
            <View style={{width: '42%'}}>
              <Text
                style={{
                  fontSize: 15,
                  color: '#000',
                  fontFamily: 'Montserrat-SemiBold',
                }}>
                {'Barcode'}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 15,
                color: '#000',
                fontFamily: 'Montserrat-SemiBold',
              }}>
              {':'}
            </Text>
            <Text
              style={{
                fontSize: 15,
                color: '#000',
                fontFamily: 'Montserrat-Medium',
              }}>
              {'  ' + barcode}
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: 5}}>
            <View style={{width: '42%'}}>
              <Text
                style={{
                  fontSize: 15,
                  color: '#000',
                  fontFamily: 'Montserrat-SemiBold',
                }}>
                {'Company'}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 15,
                color: '#000',
                fontFamily: 'Montserrat-SemiBold',
              }}>
              {':'}
            </Text>
            <Text
              style={{
                fontSize: 15,
                color: '#000',
                fontFamily: 'Montserrat-Medium',
              }}>
              {'  ' + data?.COMPANY}
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: 5}}>
            <View style={{width: '42%'}}>
              <Text
                style={{
                  fontSize: 15,
                  color: '#000',
                  fontFamily: 'Montserrat-SemiBold',
                }}>
                {'Shade'}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 15,
                color: '#000',
                fontFamily: 'Montserrat-SemiBold',
              }}>
              {':'}
            </Text>
            <Text
              style={{
                fontSize: 15,
                color: '#000',
                fontFamily: 'Montserrat-Medium',
              }}>
              {'  ' + data?.SHADE}
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: 5}}>
            <View style={{width: '42%'}}>
              <Text
                style={{
                  fontSize: 15,
                  color: '#000',
                  fontFamily: 'Montserrat-SemiBold',
                }}>
                {'Color'}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 15,
                color: '#000',
                fontFamily: 'Montserrat-SemiBold',
              }}>
              {':'}
            </Text>
            <Text
              style={{
                fontSize: 15,
                color: '#000',
                fontFamily: 'Montserrat-Medium',
              }}>
              {'  ' + data?.color}
            </Text>
          </View>
          {/* <View style={{flexDirection: 'row', marginTop: 5}}>
          <Text
            style={{
              fontSize: 15,
              color: '#000',
              fontFamily: 'Montserrat-SemiBold',
            }}>
            {'Cut : '}
          </Text>
          <Text
            style={{
              fontSize: 15,
              color: '#000',
              fontFamily: 'Montserrat-Medium',
            }}>
            {'Lorem Ipsum'}
          </Text>
        </View> */}
          <View style={{flexDirection: 'row', marginTop: 5}}>
            <View style={{width: '42%'}}>
              <Text
                style={{
                  fontSize: 15,
                  color: '#000',
                  fontFamily: 'Montserrat-SemiBold',
                }}>
                {'Price'}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 15,
                color: '#000',
                fontFamily: 'Montserrat-SemiBold',
              }}>
              {':'}
            </Text>
            <Text
              style={{
                fontSize: 15,
                color: '#000',
                fontFamily: 'Montserrat-Medium',
              }}>
              {'  ' + data?.rate}
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: 5}}>
            <View style={{width: '42%'}}>
              <Text
                style={{
                  fontSize: 15,
                  color: '#000',
                  fontFamily: 'Montserrat-SemiBold',
                }}>
                {'Qty'}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 15,
                color: '#000',
                fontFamily: 'Montserrat-SemiBold',
              }}>
              {':'}
            </Text>
            <Text
              style={{
                fontSize: 15,
                color: '#000',
                fontFamily: 'Montserrat-Medium',
              }}>
              {'  ' + data?.qty}
            </Text>
          </View>
          {/* <View style={{marginTop: 5}}>
          <Text
            style={{
              fontSize: 15,
              color: '#000',
              fontFamily: 'Montserrat-SemiBold',
            }}>
            {'Description : '}
          </Text>
          <Text
            style={{
              fontSize: 15,
              color: '#000',
              fontFamily: 'Montserrat-Regular',
            }}>
            {
              'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum'
            }
          </Text>
        </View> */}
        </View>
      ) : null}
    </View>
  );
};
export default StockDetailScreen;
