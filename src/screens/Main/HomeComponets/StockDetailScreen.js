import React, {useEffect, useState} from 'react';
import {View, Text, ToastAndroid} from 'react-native';
import Header from '../../../components/CustomHeader';
import {useNavigation} from '@react-navigation/native';
import storage from '../../../utils/storageService';
import Api from '../../../Redux/Api';
import Loader from '../../../components/Loader';
import colors from '../../../assets/colors';

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
            width: '95%',
            alignSelf: 'center',
            borderRadius: 10,
          }}>
          {/* <View style={{flexDirection: 'row', marginTop: 5, width: '100%'}}>
            <View style={{width: '35%'}}>
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
            <View style={{width: '35%'}}>
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
          </View> */}
          <View style={{flexDirection: 'row', marginTop: 5}}>
            <View style={{width: '35%'}}>
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
          <View style={{flexDirection: 'row', marginTop: 5}}>
            <View style={{width: '35%'}}>
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
          {/* <View style={{flexDirection: 'row', marginTop: 5}}>
            <View style={{width: '35%'}}>
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
              {'  ' + parseFloat(data?.rate ?? '0.00').toFixed(2)}
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: 5}}>
            <View style={{width: '35%'}}>
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
              {'  ' + parseFloat(data?.qty ?? '0.000').toFixed(2)}
            </Text>
          </View> */}
        </View>
      ) : null}
    </View>
  );
};
export default StockDetailScreen;

// {!loading ? (
//   <View
//     style={{
//       borderWidth: 1,

//       marginTop: '5%',

//       width: '95%',
//       alignSelf: 'center',
//       borderRadius: 10,
//     }}>

//     <View
//       style={{
//         flexDirection: 'row',

//       }}>
//       <View
//         style={{
//           width: '35%',
//           paddingVertical: '2%',
//           backgroundColor: colors.color1,
//           borderTopLeftRadius: 10,
//           alignItems: 'center',
//           justifyContent: 'center',
//         }}>
//         <Text
//           style={{
//             fontSize: 15,
//             color: '#fff',
//             fontFamily: 'Montserrat-SemiBold',
//           }}>
//           {'Color'}
//         </Text>
//       </View>

//       <View
//         style={{borderWidth: 1, borderColor: 'grey', marginLeft: '0%'}}
//       />
//       <View
//         style={{
//           alignItems: 'center',
//           width: '65%',
//           justifyContent: 'center',
//           alignSelf: 'center',
//         }}>
//         <Text
//           style={{
//             fontSize: 15,
//             color: '#000',
//             fontFamily: 'Montserrat-Medium',
//           }}>
//           {'  ' + data?.color}
//         </Text>
//       </View>
//     </View>

//     <View
//       style={{borderWidth: 0.5, opacity: 0.5, backgroundColor: '#000'}}
//     />
//     <View
//       style={{
//         flexDirection: 'row',

//       }}>
//       <View
//         style={{
//           width: '35%',
//           paddingVertical: '2%',
//           backgroundColor: colors.color1,
//           borderBottomLeftRadius: 10,
//           alignItems: 'center',
//           justifyContent: 'center',
//         }}>
//         <Text
//           style={{
//             fontSize: 15,
//             color: '#fff',
//             fontFamily: 'Montserrat-SemiBold',
//           }}>
//           {'Shade'}
//         </Text>
//       </View>

//       <View
//         style={{borderWidth: 1, borderColor: 'grey', marginLeft: '0%'}}
//       />
//       <View
//         style={{
//           alignItems: 'center',
//           width: '65%',
//           justifyContent: 'center',
//           alignSelf: 'center',
//         }}>
//         <Text
//           style={{
//             fontSize: 15,
//             color: '#000',
//             fontFamily: 'Montserrat-Medium',
//             textAlign: 'center',
//           }}>
//           {'  ' + data?.SHADE}
//         </Text>
//       </View>
//     </View>
//   </View>
// ) : null}
