import React, {useDeferredValue, useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import Header from '../../../components/CustomHeader';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import colors from '../../../assets/colors';
import Modal from 'react-native-modal';
import QRCodeScanner from '../../../components/QRCodeScanner';
import EditRoll from '../../../components/EditRollcheck';
import storage from '../../../utils/storageService';
import Api from '../../../Redux/Api';
import Loader from '../../../components/Loader';
import {useDispatch, useSelector} from 'react-redux';
const Punchorder = ({route}) => {
  const data = useSelector(state => state.rollelist);
  const visbles = route.params?.visible;
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [visible, setVisibles] = useState(false);
  const [scanneddata, setScannedData] = useState({});
  const [filteredData, setFilteredData] = useState([]);
  const [editable, setEditable] = useState(false);
  const [addRole, setAddRolle] = useState(true);
  const [searched, setSeached] = useState('');
  const defferedValue = useDeferredValue(searched);
  const [manuvisble, setMenuVisible] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    filter(defferedValue, data);
  }, [defferedValue, data]);
  const filter = (value, data) => {
    if (value == '') {
      setFilteredData(data);
      return;
    }

    const lowersearch = value.toLowerCase();
    const newData = data.filter(item => {
      return isNaN(value)
        ? item.Party.toLowerCase().includes(lowersearch) ||
            item.DESIGN.toLowerCase().includes(lowersearch) ||
            item.Quality.toLowerCase().includes(lowersearch) ||
            item.SHADE.toLowerCase().includes(lowersearch) ||
            item.qty.includes(value) ||
            item.barcode.includes(value)
        : item.barcode.includes(value) || item.qty.includes(value);
    });
    setFilteredData(newData);
  };

  const onScann = async e => {
    navigation.setParams({visible: false});
    setVisibles(false);
    setMenuVisible(false);
    setLoading(true);
    try {
      const token = await storage.getItem(storage.TOKEN);
      const endpoint = `barcode/${e.data}`;
      const has =
        Array.isArray(data) &&
        data.some(item => {
          return item.barcode == e.data;
        });
      if (!has) {
        const res = await Api.getRequest(endpoint, token);
        if (res.status) {
          setScannedData(res.data[0]);
          setEditable(true);
          setAddRolle(true);
        } else {
          ToastAndroid.show(res.message, ToastAndroid.LONG);
        }
      } else {
        setEditable(true);
        setAddRolle(false);
        const item = data.find(item => item.barcode == e.data);
        setScannedData(item);
      }
    } catch (err) {
      ToastAndroid.show('Error with Scanning QR code', ToastAndroid.LONG);
      console.log(err);
    } finally {
      setLoading(false);
      setVisibles(false);
      setMenuVisible(false);
    }
  };

  const deleteRoll = value => {
    const newdata = data.filter(item => item.barcode != value.barcode);

    dispatch({
      type: 'add_role_list',
      payload: newdata,
    });
  };

  const onSubmit = async () => {
    try {
      setLoading(true);
      const salesman = (await storage.getItem(storage.USER))?.salesmanid ?? '';
      const token = (await storage.getItem(storage.TOKEN)) ?? '';
      const formData = new FormData();
      data.forEach((item, index) => {
        formData.append(`rollCheckArray[${index}][partyid]`, item.partyid);
        formData.append(`rollCheckArray[${index}][qualityid]`, item.qualityid);
        formData.append(`rollCheckArray[${index}][designid]`, item.DESIGNid);
        formData.append(`rollCheckArray[${index}][shadeid]`, item.shadeid);
        formData.append(`rollCheckArray[${index}][quantity]`, item.qty);
        formData.append(`rollCheckArray[${index}][companyid]`, item.COMPANYid);
        formData.append(`rollCheckArray[${index}][barcode]`, item.barcode);
        formData.append(`rollCheckArray[${index}][entry_date]`, item.ENTDT);
        formData.append(`rollCheckArray[${index}][salesmanid]`, salesman);
      });
      const res = await Api.postRequest('roll-check-barcode', formData, token);
      if (res.status) {
        dispatch({
          type: 'add_role_list',
          payload: [],
        });
      }
      ToastAndroid.show(res.msg, ToastAndroid.LONG);
    } catch (err) {
      console.log(err);
      if (err.response.status != 401)
        ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <EditRoll
        dataList={data}
        addRole={addRole}
        onComplete={value => {
          try {
            console.log('this is value', value);
            if (value) {
              console.log('this is new data');
              if (addRole) {
                console.log('this is new data');
                setEditable(false);
                const newData = Array.isArray(data)
                  ? [...data, {...value}]
                  : [value];
                console.log('this is new datagjvvjvvjvvjv', newData);

                dispatch({
                  type: 'add_role_list',
                  payload: newData,
                });
              } else {
                const newData = data.map(item =>
                  item.barcode === value.barcode ? value : item,
                );

                dispatch({
                  type: 'add_role_list',
                  payload: newData,
                });
              }
            }
            setEditable(false);
            setAddRolle(true);
          } catch (err) {
            console.log('this is error', err);
          }
        }}
        data={scanneddata}
        visible={editable}
      />
      {loading && <Loader />}
      <Header
        title={'Roll Check'}
        onPress={() => navigation.openDrawer()}
        scanner={false}
      />
      <View style={{padding: 10}}>
        <View style={{}}>
          <TextInput
            placeholder="Search"
            placeholderTextColor={'grey'}
            onChangeText={value => {
              setSeached(value);
            }}
            style={{
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
            }}
          />
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
        <View style={{height: hp(60)}}>
          <FlatList
            data={filteredData}
            style={{marginTop: 20}}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{}}
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
                  onPress={() => {
                    deleteRoll(item);
                  }}
                  style={{
                    right: '0%',
                    position: 'absolute',
                    top: '1%',
                    margin: '2%',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: colors.color1,
                      fontFamily: 'Montserrat-SemiBold',
                      width: '100%',
                    }}>
                    Remove
                  </Text>
                </TouchableOpacity>
                {/* <View style={{flexDirection: 'row', width: '100%'}}>
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
                  {item?.party_name.substring(0, 30) + '..'}
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
                      {'Quality'}
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
                    {item?.Quality}
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

                {/* <View style={{flexDirection: 'row', width: '100%'}}>
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
                    {item?.qty}
                  </Text>
                </View>
                {/* <View style={{flexDirection: 'row', width: '100%'}}>
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
              </View> */}
              </View>
            )}
          />
        </View>

        {data?.length > 0 && (
          <TouchableOpacity
            onPress={() => onSubmit()}
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
              Submit
            </Text>
          </TouchableOpacity>
        )}
      </View>
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
                page="rolecheck"
                onScann={onScann}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
export default Punchorder;
const data1 = [
  {label: 'Live', value: 'Live'},
  {label: 'Catalog', value: 'Catalog'},
  {label: 'Live1', value: 'Live1'},
  {label: 'Catalog1', value: 'Catalog1'},
];
const data = [
  {name: 'Shirt', price: '300', color: 'red'},
  {name: 'Shirt', price: '300', color: 'red'},
  {name: 'Shirt', price: '300', color: 'red'},
  {name: 'Shirt', price: '300', color: 'red'},
  {name: 'Shirt', price: '300', color: 'red'},
];
