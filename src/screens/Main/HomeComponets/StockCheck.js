import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import Modal from 'react-native-modal';
import Header from '../../../components/CustomHeader';
import {useNavigation} from '@react-navigation/native';
import {Dropdown} from 'react-native-element-dropdown';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../assets/colors';
import BackArrow from '../../../assets/Icon/BackArrow.svg';
import storage from '../../../utils/storageService';
import Api from '../../../Redux/Api';
import Loader from '../../../components/Loader';
import QRCodeScanner from '../../../components/QRCodeScanner';
const Punchorder = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [manuvisble, setMenuVisible] = useState(false);
  const [loading, setIsLoading] = useState(false);
  useEffect(() => {
    fetchData();
  }, []);
  const [visble, setVisible] = useState(false);
  const [data, setData] = useState(false);

  const [stockList, setStockList] = useState([]);
  const fetchData = async () => {
    try {
      const token = await storage.getItem(storage.TOKEN);
      const endpoint = 'stock-list';
      setIsLoading(true);
      const res = await Api.getRequest(endpoint, token);
      if (res.status) {
        setdata(res.data);
      } else {
        ToastAndroid.show(res.message, ToastAndroid.SHORT);
      }
    } catch (err) {
      console.log(err);
      ToastAndroid.show(err.message, ToastAndroid.SHORT);
    } finally {
      setIsLoading(false);
    }
  };
  const setdata = data => {
    const formated = data.map(item => {
      return {label: item.barcode, value: item.barcode};
    });
    setStockList(formated);
  };
  const onScann = e => {
    console.log(e.data);
    setMenuVisible(false);
    setVisible(false);
    fetchData1(e.data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData1 = async barcode => {
    try {
      const token = await storage.getItem(storage.TOKEN);
      const endpoint = `stock-details/${barcode}`;
      setIsLoading(true);
      const res = await Api.getRequest(endpoint, token);
      if (res.status) {
        setdata1(res.data);
      } else {
        ToastAndroid.show(res.message, ToastAndroid.SHORT);
      }
    } catch (err) {
      console.log(err);
      ToastAndroid.show(err.message, ToastAndroid.SHORT);
    } finally {
      setIsLoading(false);
    }
  };
  const setdata1 = data => {
    navigation.navigate('StockDetailScreen', {data: data[0]});
  };
  const test = (value = false) => {
    return value;
  };
  return (
    <View style={styles.container}>
      {loading && <Loader />}
      <Header title={'Stock Check'} onPress={() => navigation.openDrawer()} />
      <ScrollView>
        <View style={{paddingHorizontal: 15, marginTop: 10}}>
          <View style={styles.dropdown}>
            <Dropdown
              style={{
                height: 22,
              }}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={{color: '#000', fontSize: 14}}
              search
              data={stockList}
              inputSearchStyle={{
                borderRadius: 10,
                backgroundColor: '#f0f0f0',
              }}
              itemTextStyle={{color: '#474747'}}
              searchPlaceholder="search.."
              maxHeight={250}
              labelField="label"
              valueField="value"
              placeholder="Enter Stock Name"
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
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 40,
          }}>
          <TouchableOpacity
            onPress={() => {
              if (name != '') fetchData1(name);
              else {
                ToastAndroid.show('Please Select a Stock', ToastAndroid.SHORT);
              }
            }}
            style={{
              height: hp(5.3),
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              // marginTop: hp(3),
              width: wp(91),
              backgroundColor: colors.color1,
              borderRadius: wp(2),
            }}>
            <Text style={{fontFamily: 'Montserrat-Bold', color: '#fff'}}>
              Get Details
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: hp(10),
            justifyContent: 'center',
          }}>
          <Text
            style={{
              alignSelf: 'center',
              fontFamily: 'Montserrat-SemiBold',
              fontSize: wp(4),
              color: 'grey',
            }}>
            OR
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => setVisible(true)}
          style={{
            height: hp(5.3),
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            // marginTop: hp(3),
            width: wp(91),
            backgroundColor: colors.color1,
            borderRadius: wp(2),
          }}>
          <Text
            style={{
              fontFamily: 'Montserrat-Bold',
              color: '#fff',
              // fontSize: 15,
            }}>
            Scan Barcode
          </Text>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          visible={visble}
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
                  setVisible(false);
                  setMenuVisible(false);
                }}
                manuvisble={manuvisble}
                setMenuVisible={setMenuVisible}
              />
            </View>
          </View>
        </Modal>
      </ScrollView>
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
const data1 = [
  {label: 'Live', value: 'Live'},
  {label: 'Catalog', value: 'Catalog'},
  {label: 'Live1', value: 'Live1'},
  {label: 'Catalog1', value: 'Catalog1'},
];
const data = [
  {label: 'Lorem Ipsum', value: 'Lorem Ipsum'},
  {label: 'Lorem Ipsum', value: 'Lorem Ipsum'},
  {label: 'Lorem Ipsum', value: 'Lorem Ipsum'},
  {label: 'Lorem Ipsum', value: 'Lorem Ipsum'},
];
