import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ToastAndroid,
  BackHandler,
} from 'react-native';
import Header from '../../../components/CustomHeader';
import {Dropdown} from 'react-native-element-dropdown';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import colors from '../../../assets/colors';
import BackArrow from '../../../assets/Icon/BackArrow.svg';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../../../components/Loader';
import storage from '../../../utils/storageService';
import Api from '../../../Redux/Api';
const useDebounce = (func, delay) => {
  const timeoutRef = useRef(null);

  const debouncedFunc = (...args) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      func(...args);
    }, delay);
  };

  return debouncedFunc;
};
const Punchorder = () => {
  const {} = useSelector(state => state);
  const [isFetching, setIsFetching] = useState(false);
  const dispatch = useDispatch();
  const [totoalPage, setTotalPage] = useState(10);
  const [partyList, setPartyList] = useState([]);
  const navigation = useNavigation();
  const [customer, setCustomer] = useState('');
  const [address, setAddress] = useState('');
  const [remark, setRemark] = useState('');
  const [page, setPage] = useState(1);
  useEffect(() => {
    getPartyName(page);
  }, []);
  const fetchData = async (endpoint, token) => {
    try {
      setIsFetching(true);
      const res = await Api.getRequest(endpoint, token);
      if (res.status) {
        setPartyList(prev => [...prev, ...res.data]);
        setTotalPage(res.totalPages);
      } else {
        ToastAndroid.show(res.data.message, ToastAndroid.SHORT);
      }
    } catch (err) {
      console.log(err);
      ToastAndroid.show(err.message, ToastAndroid.SHORT);
    } finally {
      setIsFetching(false);
    }
  };
  const getPartyName = async page_number => {
    const company = await storage.getItem(storage.COMPANY);
    if (isFetching) {
      return;
    }
    const endpoint = `party-names/${company}`;
    const token = await storage.getItem(storage.TOKEN);
    fetchData(endpoint, token);
    setPage(page_number);
  };

  const onScroll = ({nativeEvent}) => {
    if (!nativeEvent) return;
    const {layoutMeasurement, contentOffset, contentSize} = nativeEvent;
    if (layoutMeasurement.height + contentOffset.y >= contentSize.height - 20) {
      if (page <= totoalPage) {
        getPartyName(page + 1);
      }
    }
  };
  function handleBackButtonClick() {
    // navigation.reset({index: 0, routes: [{name: 'Home'}]});
    return false;
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
    <View style={styles.container}>
      <Header
        nocompany
        title={'Punch Order'}
        onPress={() => navigation.openDrawer()}
      />
      {isFetching && (
        <Loading
          style={{
            zIndex: 100,
          }}
        />
      )}
      <ScrollView style={{marginBottom: 0}}>
        <View style={{paddingHorizontal: 5, marginBottom: 80}}>
          <View style={styles.Main}>
            <Text style={styles.inputText}>Customer Name</Text>
            <View style={styles.dropdown}>
              <Dropdown
                style={{
                  height: 22,
                }}
                flatListProps={{
                  onScroll: onScroll,
                }}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={{color: '#000', fontSize: 14}}
                search
                data={partyList}
                inputSearchStyle={{
                  borderRadius: 10,
                  backgroundColor: '#f0f0f0',
                }}
                itemTextStyle={{color: '#474747'}}
                searchPlaceholder="search.."
                maxHeight={250}
                labelField="Partyname"
                valueField="Partyid"
                placeholder="Customer Name"
                value={customer?.Partyid}
                onScrollEndDrag={() => {}}
                renderItem={item =>
                  item.Partyname === customer?.Partyname ? (
                    <View
                      style={{
                        padding: 17,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: 'grey',
                      }}>
                      <Text style={[styles.selectedTextStyle, {color: '#fff'}]}>
                        {item.Partyname}
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
                        {item.Partyname}
                      </Text>
                    </View>
                  )
                }
                onChange={item => {
                  setCustomer(item);
                  const address = [item.Adr1, item.Adr2, item.Adr3]
                    .filter(Boolean)
                    .join(' ');
                  console.log('now I am on address', address);
                  setAddress(address === '' ? 'NA' : address);
                }}
              />
            </View>
          </View>

          <View style={styles.Main}>
            <Text style={styles.inputText}>Address</Text>
            <View style={styles.dropdown2}>
              <TextInput
                placeholderTextColor={'grey'}
                placeholder="Address"
                style={{color: 'black'}}
                multiline
                value={address}
                onChangeText={setAddress}
              />
            </View>
          </View>

          <View style={styles.Main}>
            <Text style={styles.inputText}>Remark</Text>
            <View style={styles.dropdown2}>
              <TextInput
                placeholder="Remark"
                style={{color: '#000'}}
                value={remark}
                placeholderTextColor={'grey'}
                multiline
                onChangeText={value => {
                  setRemark(value);
                }}
              />
            </View>
          </View>

          <View style={styles.buttonView}>
            <TouchableOpacity
              onPress={async () => {
                if (customer != '') {
                  await storage.setItem(storage.CUSTOMER, {
                    remark,
                    customer,
                    address,
                  });
                  await storage.removeItem(storage.CART);
                  dispatch({
                    type: 'setCustomer',
                    payload: {
                      remark,
                      customer,
                      address,
                      id: undefined,
                    },
                  });
                  navigation.navigate('Punchorder2');
                } else {
                  ToastAndroid.show(
                    'Please Select Customer',
                    ToastAndroid.SHORT,
                  );
                }
              }}
              style={styles.buttonOpen}>
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'Montserrat-Bold',
                  fontSize: 15,
                }}>
                Proceed
              </Text>
            </TouchableOpacity>
          </View>
        </View>
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
      </View>*/}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonOpen: {
    height: hp(5.3),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(3),
    width: wp(91),
    backgroundColor: colors.color1,
    borderRadius: wp(2),
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 13,
  },
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
  placeholderStyle: {
    fontSize: 15,
    color: '#a0a0a0',
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  touch: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 44,
    height: 40,
    backgroundColor: colors.color1,
    borderTopLeftRadius: 80,
    borderTopRightRadius: 40,
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 40,
  },
  dropdown2: {
    marginTop: wp(2),
    borderWidth: 1,
    borderColor: '#979998',
    color: '#000',
    height: hp(15),
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
  },
});
export default Punchorder;
const data1 = [
  {label: 'Vivek', value: 'Vivek', address: '184 Mali bag mumbai'},
  {label: 'Virendra', value: 'Virendra', address: '184 Mali bag mumbai'},
  {label: 'Raju Barde', value: 'Raju Barde', address: '184 Mali bag mumbai'},
  {label: 'Tarun', value: 'Tarun', address: '184 Mali bag mumbai'},
];
const data3 = [
  {label: '184 Mali bag mumbai', value: '184 Mali bag mumbai'},
  {label: '184 Mali bag mumbai', value: '184 Mali bag mumbai'},
  {label: '184 Mali bag mumbai', value: '184 Mali bag mumbai'},
  {label: '184 Mali bag mumbai', value: '184 Mali bag mumbai'},
];

const data2 = [
  {label: '200', value: '200'},
  {label: '300', value: '300'},
  {label: '400', value: '400'},
  {label: '500', value: '500'},
];
