import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Clipboard,
  ToastAndroid,
  Image,
} from 'react-native';
import Header from '../../../components/CustomHeader';
import {Dropdown} from 'react-native-element-dropdown';
import DatePicker from 'react-native-date-picker';
import Modal from 'react-native-modal';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../assets/colors';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Calendar from '../../../assets/Icon/Calendar.svg';
import QRCodeScanner from '../../../components/QRCodeScanner';
import BackArrow from '../../../assets/Icon/backArrow1.svg';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../../components/Loader';
import storage from '../../../utils/storageService';
import Api from '../../../Redux/Api';

const Punchorder = ({route}) => {
  const navigation = useNavigation();
  const visbles = route.params?.visible;
  const {isFetching, bagdata} = useSelector(state => state);
  console.log('thissis', bagdata[0]);
  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [dob, setDob] = useState('');
  const dispatch = useDispatch();
  const [visible, setVisibles] = useState(false);
  const [manuvisble, setMenuVisible] = useState(false);
  const [modal, setModal] = useState(false);
  const sortDataByQuantity = data => {
    return data.sort((a, b) => {
      if (parseFloat(a.qty) < 10 && parseFloat(b.qty) >= 10) {
        return -1;
      } else if (parseFloat(a.qty) >= 10 && parseFloat(b.qty) < 10) {
        return 1;
      } else {
        return 0;
      }
    });
  };

  const FormateDate = da => {
    const date = new Date(da);
    const options = {day: '2-digit', month: 'short', year: 'numeric'};
    const formattedDate = date.toLocaleDateString('en-GB', options);

    return formattedDate;
  };
  useEffect(() => {
    var d = new Date();
    (month = '' + (d.getMonth() + 1)),
      (day = '' + d.getDate()),
      (year = d.getFullYear());

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    var finalDate = [day, month, year].join('/');
    setDob(finalDate);
  }, []);
  const onPressComplete = async () => {
    try {
      dispatch({
        type: 'setFetching',
        payload: true,
      });
      const token = await storage.getItem(storage.TOKEN);

      const barcodes = bagdata
        ?.filter(item => parseFloat(item.qty) >= 10)
        .map(item => item.barcode);

      const barcodesdata = barcodes.join(',');
      const endpoint = `mail-send-to-admin?barcode=${barcodesdata}`;
      const res = await Api.getRequest(endpoint, token);
      console.log(res);
      if (res.status) {
        dispatch({
          type: 'bag_check_success',
          payload: [],
        });
      }
      // dispatch({
      //   type: 'bag_check_success',
      //   payload: [],
      // });
      dispatch({
        type: 'setFetching',
        payload: false,
      });
      ToastAndroid.show(res.message, ToastAndroid.SHORT);
    } catch (err) {
      console.log(err);
      ToastAndroid.show('Failed to send email: ', ToastAndroid.SHORT);
      dispatch({
        type: 'setFetching',
        payload: false,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Header title={'Bag Check'} onPress={() => navigation.openDrawer()} />
      {isFetching && <Loader />}
      <View style={{padding: 0}}>
        <View style={styles.Main}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              position: 'absolute',
              right: '1%',
              marginTop: '-11%',
            }}>
            {/* <TouchableOpacity onPress={() => navigation.goBack()}>
              <BackArrow />
            </TouchableOpacity> */}
            {bagdata.length > 0 && (
              <TouchableOpacity
                style={{
                  backgroundColor: colors.color1,
                  paddingHorizontal: 10,
                  paddingVertical: 4,
                  borderRadius: 6,
                  height: hp(4),
                }}
                onPress={() => {
                  dispatch({
                    type: 'bag_check_success',
                    payload: [],
                  });
                  setVisibles(true);
                }}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 12,
                    fontFamily: 'Montserrat-SemiBold',
                  }}>
                  {' '}
                  + Start New List
                </Text>
              </TouchableOpacity>
            )}
          </View>
          {/* <View style={styles.dropdown}>
            <Dropdown
              style={{
                height: 22,
              }}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={{color: '#000', fontSize: 14}}
              search
              data={data}
              inputSearchStyle={{
                borderRadius: 10,
                backgroundColor: '#f0f0f0',
              }}
              itemTextStyle={{color: '#474747'}}
              searchPlaceholder="search.."
              maxHeight={250}
              labelField="label"
              valueField="value"
              placeholder="Name"
              value={name}
              renderItem={item =>
                item.value === name ? (
                  <View
                    style={{
                      padding: 17,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      backgroundColor: 'grey',
                    }}>
                    <Text style={[styles.selectedTextStyle, {color: '#fff'}]}>
                      {item.label}
                    </Text>
                  </View>
                ) : (
                  <View
                    style={{
                      padding: 17,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Text style={[styles.selectedTextStyle, {color: '#000'}]}>
                      {item.label}
                    </Text>
                  </View>
                )
              }
              onChange={item => {
                setName(item.value);
              }}
            />
          </View> */}
        </View>
        <View style={styles.Main}>
          <Text style={styles.inputText}>Date</Text>

          <TouchableOpacity
            onPress={() => setOpen(true)}
            style={{
              marginTop: wp(2),
              borderWidth: 1,
              borderColor: '#979998',
              height: hp(5.5),
              backgroundColor: 'white',
              borderRadius: wp(2),
              paddingHorizontal: 12,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.2,
              shadowRadius: 1.41,

              elevation: 3,
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text>{dob}</Text>
            <Calendar />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => setVisibles(true)}
          style={{
            height: hp(5.3),
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: hp(3),
            width: wp(91),
            backgroundColor: colors.color1,
            borderRadius: wp(2),
          }}>
          <Text
            style={{
              fontFamily: 'Montserrat-Bold',
              color: '#fff',
              fontSize: 15,
            }}>
            Scan Barcode
          </Text>
        </TouchableOpacity>
      </View>
      <DatePicker
        modal
        open={open}
        date={date}
        mode={'date'}
        maximumDate={date}
        onConfirm={date => {
          setOpen(false);
          // setDate(date)
          var d = date;
          (month = '' + (d.getMonth() + 1)),
            (day = '' + d.getDate()),
            (year = d.getFullYear());

          if (month.length < 2) month = '0' + month;
          if (day.length < 2) day = '0' + day;

          var finalDate = [month, day, year].join('/');
          setDob(finalDate);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />

      <View style={{alignItems: 'center', justifyContent: 'center'}}>
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
                closeHandler={() => {
                  setVisibles(false);
                  setMenuVisible(false);
                  navigation.setParams({visible: false});
                }}
                manuvisble={manuvisble}
                setMenuVisible={setMenuVisible}
              />
            </View>
          </View>
        </Modal>
      </View>
      {/* <View style={{position: 'absolute', bottom: 20, left: 20}}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: 44,
            height: 40,
            backgroundColor: colors.color1,
            borderTopLeftRadius: 80,
            borderTopRightRadius: 40,
            borderBottomLeftRadius: 80,
            borderBottomRightRadius: 40,
          }}>
          <BackArrow />
        </TouchableOpacity>
      </View> */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        style={{
          width: '100%',
          alignSelf: 'center',
          // justifyContent:'flex-start',
          marginHorizontal: 50,
          margin: 0,
        }}
        onRequestClose={() => {}}>
        <View
          style={{
            backgroundColor: '#fff',
            height: '100%',

            paddingHorizontal: 15,
          }}>
          <View style={{flex: 1}}>
            <View style={{alignItems: 'flex-end', paddingVertical: 15}}>
              <TouchableOpacity
                onPress={() => setModal(false)}
                style={{
                  backgroundColor: colors.color1,
                  paddingHorizontal: 10,
                  paddingVertical: 4,
                  borderRadius: 6,
                }}>
                <Text
                  style={{
                    fontSize: 12,
                    color: '#fff',
                    fontFamily: 'Montserrat-SemiBold',
                  }}>
                  CLOSE
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.dropdown}>
              <Dropdown
                style={{
                  height: 22,
                }}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={{color: '#000', fontSize: 14}}
                search
                data={data}
                inputSearchStyle={{
                  borderRadius: 10,
                  backgroundColor: '#f0f0f0',
                }}
                itemTextStyle={{color: '#474747'}}
                searchPlaceholder="search.."
                maxHeight={250}
                labelField="label"
                valueField="value"
                placeholder="Name"
                value={name}
                renderItem={item =>
                  item.value === name ? (
                    <View
                      style={{
                        padding: 17,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: 'grey',
                      }}>
                      <Text style={[styles.selectedTextStyle, {color: '#fff'}]}>
                        {item.label}
                      </Text>
                    </View>
                  ) : (
                    <View
                      style={{
                        padding: 17,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <Text style={[styles.selectedTextStyle, {color: '#000'}]}>
                        {item.label}
                      </Text>
                    </View>
                  )
                }
                onChange={item => {
                  setName(item.value);
                }}
              />
            </View>
            <View style={{marginTop: 10}}>
              <Text style={styles.inputText}>Date</Text>

              <TouchableOpacity
                onPress={() => setOpen(true)}
                style={{
                  marginTop: wp(2),
                  borderWidth: 1,
                  borderColor: '#979998',
                  height: hp(5.5),
                  backgroundColor: 'white',
                  borderRadius: wp(2),
                  paddingHorizontal: 12,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.2,
                  shadowRadius: 1.41,

                  elevation: 3,
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text>{dob}</Text>
                <Calendar />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => {
                setModal(false);
                setVisibles(true);
              }}
              style={{
                height: hp(5.3),
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: hp(3),
                width: wp(91),
                backgroundColor: colors.color1,
                borderRadius: wp(2),
              }}>
              <Text
                style={{
                  fontFamily: 'Montserrat-Bold',
                  color: '#fff',
                  fontSize: 15,
                }}>
                Start List
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={{height: hp(57), paddingTop: 15, marginHorizontal: 10}}>
        <FlatList
          contentContainerStyle={{paddingTop: 5}}
          data={sortDataByQuantity(Array.isArray(bagdata) ? bagdata : [])}
          // style={{marginBottom: 100}}
          renderItem={({item}) => (
            <View>
              {item.qty < 10 && (
                <View>
                  <Text
                    style={{
                      fontSize: 12,

                      color: 'red',
                      marginTop: '-2%',
                    }}>
                    Low Quality
                  </Text>
                </View>
              )}
              <View
                style={{
                  borderWidth: 1,
                  width: '100%',
                  marginBottom: 10,
                  borderRadius: 6,
                  padding: 10,
                  borderColor: item.qty < 10 ? 'red' : null,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    const newdata = bagdata.filter(
                      items => items.barcode != item.barcode,
                    );
                    dispatch({
                      type: 'bag_check_success',
                      payload: newdata,
                    });
                  }}
                  style={{
                    right: '1%',
                    position: 'absolute',
                    top: '1%',
                    padding: '2%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  {item.qty > 10 ? (
                    <Text
                      style={{
                        fontSize: 12,
                        color: colors.color1,
                        fontFamily: 'Montserrat-SemiBold',
                        width: '100%',
                      }}>
                      Remove
                    </Text>
                  ) : (
                    <Image
                      style={{
                        height: 12,
                        width: 12,
                        marginTop: '2%',
                        marginRight: '1%',
                      }}
                      source={require('../../../assets/Icon/close.png')}
                    />
                  )}
                </TouchableOpacity>
                {/* <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                  }}>
                  <View style={{width: '40%', flexDirection: 'row'}}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#000',
                        fontFamily: 'Montserrat-SemiBold',
                        width: '100%',
                      }}>
                      {'Customer Name  '}
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
                    {item?.Party.length > 12
                      ? item?.Party.substring(0, 12) + '...'
                      : item?.Party}
                  </Text>
                </View> */}
                <View style={{flexDirection: 'row', width: '100%'}}>
                  <View style={{width: '40%', flexDirection: 'row'}}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#000',
                        fontFamily: 'Montserrat-SemiBold',
                        width: '100%',
                      }}>
                      {'Barcode'}
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
                    {item?.barcode}
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
                    {item?.DESIGN}
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
                    {item?.SHADE}
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
                    {item?.SHADE}
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
                    {item?.rate}
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
                      {'Qty'}
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
                    {parseFloat(item?.qty ?? '0.000').toFixed(2)}
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
                      {'Date'}
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
                    {dob}
                  </Text>
                </View>
              </View>
            </View>
          )}
        />
      </View>
      {bagdata?.length > 0 && (
        <TouchableOpacity
          onPress={() => onPressComplete()}
          style={{
            height: hp(5.3),
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            width: wp(91),
            backgroundColor: colors.color1,
            borderRadius: wp(2),
            marginTop: '5%',
          }}>
          <Text
            style={{
              fontFamily: 'Montserrat-Bold',
              color: '#fff',
              fontSize: 15,
            }}>
            Complete
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  Main: {marginHorizontal: wp(3), marginTop: wp(3.5)},
  inputText: {
    fontSize: wp(3.5),
    fontWeight: '700',
    color: '#000',
  },
  dropdown: {
    marginTop: wp(2),
    borderWidth: 1,
    borderColor: '#979998',
    color: '#000',
    height: hp(5.5),
    backgroundColor: 'white',
    borderRadius: wp(2),
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    fontSize: 14,
    elevation: 3,
    justifyContent: 'center',
  },
});
export default Punchorder;
const data = [
  {label: 'Lorem Ipsum', value: 'Lorem Ipsum'},
  {label: 'Lorem Ipsum', value: 'Lorem Ipsum'},
  {label: 'Lorem Ipsum', value: 'Lorem Ipsum'},
  {label: 'Lorem Ipsum', value: 'Lorem Ipsum'},
];
