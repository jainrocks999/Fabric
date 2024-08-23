import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
  Alert,
} from 'react-native';
import Header from '../../../components/CustomHeader';
import {Dropdown} from 'react-native-element-dropdown';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import colors from '../../../assets/colors';
import QRCodeScanner from '../../../components/QRCodeScanner';
import Modal from 'react-native-modal';
import Api from '../../../Redux/Api';
import storage from '../../../utils/storageService';
import Loading from '../../../components/Loader';
import punchOrderPost from '../../../utils/punchOrderPost';
import {useSelector} from 'react-redux';

const Punchorder = ({route}) => {
  const {remark, customer, address, id} = useSelector(state => state.customer);

  const navigation = useNavigation();
  const [qualityList, setQaulityList] = useState([]);
  const [designList, setDesignList] = useState([]);
  const [colorshadeList, setColorShadeList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [carts, setCats] = useState([]);

  useEffect(() => {
    getCarts();
  }, [useIsFocused()]);
  const getCarts = async () => {
    const data = await storage.getItem(storage.CART);
    setCats(data == null ? [] : data);
  };
  const initialstate = {
    customerName: customer ?? '',
    grade: '',
    design: '',
    shade: '',
    color: '',
    price: '',
    matchoption: '',
    cut: '',
    remark: remark ?? 'NA',
    remark1: remark ?? 'NA',
    quality: '',
    address: address ?? '',
  };
  const [inputs, setInputs] = useState(initialstate);
  useEffect(() => {
    setInputs(prev => {
      return {
        ...prev,
        customerName: customer,
        address: address ?? 'NA',
        remark1: remark ?? 'NA',
      };
    });
  }, []);

  const handleInputs = (text, input) => {
    setInputs(prev => ({...prev, [text]: input}));
  };
  useEffect(() => {
    id == undefined && fetchQuality();
  }, []);
  const fetchQuality = async item => {
    const {TOKEN, COMPANY} = storage;
    const items = await storage.getMultipleItems([TOKEN, COMPANY]);
    const token = items.find(([key]) => key === TOKEN)?.[1];
    const company = items.find(([key]) => key === COMPANY)?.[1];
    const endpoint = `quality/${company}`;
    fetchData(endpoint, token, 'quality', item);
  };

  const fetchDesign = async (id, item) => {
    const token = await storage.getItem(storage.TOKEN);
    const endpoint = `design/${id}`;
    fetchData(endpoint, token, 'design', item);
  };
  const fetchColorShade = async (id, item) => {
    const token = await storage.getItem(storage.TOKEN);
    const endpoint = `shade/color/${id}`;
    fetchData(endpoint, token, 'colorshade', item);
  };

  const fetchData = async (endpoint, token, type, item) => {
    try {
      setIsLoading(true);
      const res = await Api.getRequest(endpoint, token);
      if (res.status) {
        setdata(res.data, type, item);
      } else {
        if (type === 'quality') {
          setQaulityList([]);
        } else if (type === 'design') {
          setDesignList([]);
        } else if (type === 'colorshade') {
          setColorShadeList([]);
        }
        ToastAndroid.show(res.message, ToastAndroid.SHORT);
      }
    } catch (err) {
      console.log(endpoint, err);
      if (type === 'quality') {
        setQaulityList([]);
      } else if (type === 'design') {
        setDesignList([]);
      } else if (type === 'colorshade') {
        setColorShadeList([]);
      }
      if (err.response.status != 401)
        ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
    } finally {
      !item && setIsLoading(false);
    }
  };
  useEffect(() => {
    id && getEditData();
  }, []);
  const getEditData = async () => {
    const cartData = await storage.getItem(storage.CART);
    setCats(cartData);
    const orderItem = cartData.find(items => items.id == id);
    fetchEdit(orderItem);
  };
  const fetchEdit = item => {
    fetchQuality(item);
  };
  const setdata = (data, type, item) => {
    if (type === 'quality') {
      item && fetchDesign(item.quality?.Qualityid, item);
      setQaulityList(data);
      setDesignList([]);
    } else if (type === 'design') {
      item && fetchColorShade(item?.design?.Designid, item);
      setDesignList(data);
      setColorShadeList([]);
      setInputs(prev => ({
        ...prev,
        color: '',
        shade: '',
      }));
    } else if (type === 'colorshade') {
      setColorShadeList(data);
      setInputs(prev => ({
        ...prev,
        ...item,
      }));
      item && setIsLoading(false);
    }
  };
  const addToCart = async () => {
    const companyid = await storage.getItem(storage.COMPANY);
    let array = [];

    const cartList = await storage.getItem(storage.CART);

    let newId = 1;
    if (cartList != null && cartList.length > 0) {
      newId = Math.max(...cartList.map(item => item.id)) + 1;
      array = [...cartList];
    }
    const newItem = {
      ...inputs,
      currentDate: dateFromate(),
      id: newId,
      compId: companyid,
      color: inputs?.color?.colorid
        ? inputs?.color
        : {
            colorid: '',
            color: 'NA',
          },
      shade: inputs.shade?.shadeid
        ? inputs.shade
        : {
            shadeid: '',
            shade: 'NA',
          },
    };
    array.push(newItem);
    await storage.setItem(storage.CART, array);
    const mycart = await storage.getItem(storage.CART);
    setCats(mycart);

    ToastAndroid.show('Data added to cart', ToastAndroid.SHORT);
    setInputs(initialstate);
  };
  const validate = async bool => {
    const customerdata = await storage.getItem(storage.CUSTOMER);
    await storage.setItem(storage.CUSTOMER, {
      ...customerdata,
      remark: inputs.remark,
    });
    const messages = {
      quality: 'Please select Quality',
      design: 'Please select Design',
      shade: 'Please select shade',
      cut: 'Please enter a valid Cut',
      price: 'Please enter a valid Price',
    };

    // Check if 'cut' is a valid number

    // Check if required fields are filled
    for (const key in messages) {
      if (
        !inputs[key] ||
        (typeof inputs[key] === 'string' && inputs[key].trim() === '')
      ) {
        ToastAndroid.show(messages[key], ToastAndroid.SHORT);
        return;
      }
    }

    if (inputs.cut === '' || isNaN(Number(inputs.cut))) {
      ToastAndroid.show(messages.cut, ToastAndroid.SHORT);
      return;
    }

    // Check if 'price' is a valid number
    if (inputs.price === '' || isNaN(Number(inputs.price))) {
      ToastAndroid.show(messages.price, ToastAndroid.SHORT);
      return;
    }

    if (id == undefined)
      if (bool) {
        addToCart();
      } else {
        punchorder();
      }
    else {
      const newcart = carts.map(item => {
        if (item.id == id) {
          return inputs;
        } else {
          return item;
        }
      });

      await storage.setItem(storage.CART, newcart);
      ToastAndroid.show('Order Updated', ToastAndroid.SHORT);
      setInputs(initialstate);
      setTimeout(() => {
        navigation.navigate('PunchorderList');
      }, 500);
    }
  };

  const dateFromate = () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];
    return formattedDate;
  };
  console.log('thdiududu');
  const punchorder = async () => {
    try {
      setIsLoading(true);
      const token = await storage.getItem(storage.TOKEN);
      const companyid = await storage.getItem(storage.COMPANY);
      const endpoint = 'punch-order';

      const formData = await punchOrderPost([
        {
          ...inputs,
          currentDate: dateFromate(),
          compId: companyid,
          color: inputs?.color?.colorid
            ? inputs?.color
            : {
                colorid: '',
                color: 'NA',
              },
          shade: inputs.shade?.shadeid
            ? inputs.shade
            : {
                shadeid: '',
                shade: 'NA',
              },
        },
      ]);

      console.log('this is formdata', JSON.stringify(formData));
      const res = await Api.postRequest(endpoint, formData, token);
      ToastAndroid.show(res.message, ToastAndroid.LONG);
      console.log(res);
      if (res.status) {
        navigation.navigate('OrderSuccessful', {data: res});
        setInputs(initialstate);
      }
      setIsLoading(false);
    } catch (error) {
      ToastAndroid.show(error.message, ToastAndroid.LONG);
      setIsLoading(false);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {isLoading && <Loading />}
      <Header
        title={'Punch Order'}
        onPress={() => navigation.goBack()}
        arrow={true}
        scanner={false}
        onPress2={() => setVisible(true)}
        nocompany
      />
      <ScrollView style={{marginBottom: 0}}>
        <View style={{paddingHorizontal: 5, marginBottom: 80}}>
          {/* <View style={styles.Main}>
            <Text style={styles.inputText}>Quality</Text>
            <View style={styles.dropdown}>
              <Dropdown
                style={{
                  height: 22,
                }}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={{color: '#000', fontSize: 14}}
                search={qualityList.length > 0}
                data={qualityList}
                inputSearchStyle={{
                  borderRadius: 10,
                  backgroundColor: '#f0f0f0',
                }}
                itemTextStyle={{color: '#474747'}}
                searchPlaceholder="search.."
                maxHeight={250}
                labelField="Quality"
                valueField="Qualityid"
                placeholder="Quality"
                value={inputs.quality?.Qualityid}
                renderItem={item =>
                  item.Qualityid === inputs.quality?.Qualityid ? (
                    <View
                      style={{
                        padding: 17,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: 'grey',
                      }}>
                      <Text style={[styles.selectedTextStyle, {color: '#fff'}]}>
                        {item.Quality}
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
                        {item.Quality}
                      </Text>
                    </View>
                  )
                }
                onChange={item => {
                  handleInputs('quality', item);
                  fetchDesign(item.Qualityid);
                }}
              />
            </View>
          </View> */}
          <View style={styles.Main}>
            <Text style={styles.inputText}>Design</Text>
            {/* <View style={styles.dropdown}>
              <Dropdown
                style={{
                  height: 22,
                }}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={{color: '#000', fontSize: 14}}
                search={designList.length > 4}
                data={designList}
                inputSearchStyle={{
                  borderRadius: 10,
                  backgroundColor: '#f0f0f0',
                }}
                itemTextStyle={{color: '#474747'}}
                searchPlaceholder="search.."
                maxHeight={250}
                labelField="Design"
                valueField="Designid"
                placeholder="Design"
                value={inputs.design?.Designid}
                renderItem={item =>
                  item.Designid === inputs.design?.Designid ? (
                    <View
                      style={{
                        padding: 17,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: 'grey',
                      }}>
                      <Text style={[styles.selectedTextStyle, {color: '#fff'}]}>
                        {item.Design}
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
                        {item.Design}
                      </Text>
                    </View>
                  )
                }
                onChange={item => {
                  handleInputs('design', item);
                  fetchColorShade(item.Designid);
                }}
              />
            </View> */}
            <TextInput
              style={styles.dropdown}
              value={inputs.design}
              placeholder="Design"
              onChangeText={value => {
                handleInputs('design', value);
              }}
            />
          </View>
          {/* <View style={styles.Main}>
            <Text style={styles.inputText}>Color</Text>
            <View style={styles.dropdown}>
              <Dropdown
                disable
                style={{
                  height: 22,
                }}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={{color: '#000', fontSize: 14}}
                search={colorshadeList.length > 1}
                data={colorshadeList}
                inputSearchStyle={{
                  borderRadius: 10,
                  backgroundColor: '#f0f0f0',
                }}
                itemTextStyle={{color: '#474747'}}
                searchPlaceholder="search.."
                maxHeight={250}
                labelField="color"
                valueField="colorid"
                placeholder="Color"
                value={inputs.color?.colorid}
                renderItem={item =>
                  item.colorid === inputs.color?.colorid ? (
                    <View
                      style={{
                        padding: 17,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: 'grey',
                      }}>
                      <Text style={[styles.selectedTextStyle, {color: '#fff'}]}>
                        {item.color}
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
                        {item.color}
                      </Text>
                    </View>
                  )
                }
                onChange={item => {}}
              />
            </View>
           
          </View> */}
          {/* <View style={styles.Main}>
            <Text style={styles.inputText}>Color</Text>
            <View>
              <TextInput
                editable={false}
                style={styles.dropdown}
                value={inputs?.color?.color}
                onChangeText={value => {
                  // handleInputs('prcolorice', value);
                }}
                placeholder="Color"
                keyboardType="number-pad"
              />
            </View>
          </View> */}
          <View style={styles.Main}>
            <Text style={styles.inputText}>Color</Text>
            {/* <View style={styles.dropdown}>
              <Dropdown
                style={{
                  height: 22,
                }}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={{color: '#000', fontSize: 14}}
                search={colorshadeList?.length > 1}
                data={colorshadeList}
                inputSearchStyle={{
                  borderRadius: 10,
                  backgroundColor: '#f0f0f0',
                }}
                itemTextStyle={{color: '#474747'}}
                searchPlaceholder="search.."
                maxHeight={250}
                labelField="color"
                valueField="colorid"
                placeholder="Color"
                value={inputs.color?.colorid}
                renderItem={item =>
                  item.color === inputs.color?.colorid ? (
                    <View
                      style={{
                        padding: 17,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: 'grey',
                      }}>
                      <Text style={[styles.selectedTextStyle, {color: '#fff'}]}>
                        {item.color}
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
                        {item.color}
                      </Text>
                    </View>
                  )
                }
                onChange={item => {
                  handleInputs('color', item);
                  handleInputs('shade', item);
                }}
              />
              
            </View> */}
            <TextInput
              style={styles.dropdown}
              value={inputs.color}
              placeholder="Color"
              onChangeText={value => {
                handleInputs('color', value);
              }}
            />
          </View>

          <View style={styles.Main}>
            <Text style={styles.inputText}>Cut{' ( in meter )'}</Text>
            <View>
              <TextInput
                style={styles.dropdown}
                value={inputs.cut}
                placeholder="Cut"
                onChangeText={value => {
                  // Only allow numbers and a single decimal point
                  const regex = /^\d*\.?\d{0,2}$/;
                  if (regex.test(value)) {
                    handleInputs('cut', value);
                  }
                }}
                keyboardType="decimal-pad"
              />
            </View>
          </View>

          <View style={styles.Main}>
            <Text style={styles.inputText}>Price</Text>
            <View>
              <TextInput
                style={styles.dropdown}
                value={inputs.price}
                onChangeText={value => {
                  handleInputs('price', value);
                }}
                placeholder="Price"
                keyboardType="number-pad"
              />
            </View>
          </View>
          <View style={styles.Main}>
            <Text style={styles.inputText}>Remark</Text>
            <View
              style={[styles.dropdown, {height: hp(15), justifyContent: null}]}>
              <TextInput
                multiline
                placeholderTextColor={'grey'}
                style={{
                  color: '#000',
                }}
                value={inputs.remark == 'NA' ? '' : inputs.remark}
                // placeholderTextColor='#C7C7CD'
                onChangeText={value => {
                  handleInputs('remark', value == '' ? 'NA' : value);
                }}
                placeholder="Remark"
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              validate(true);
            }}
            style={styles.buttonOpen1}>
            <Text
              style={{
                color: 'white',
                fontFamily: 'Montserrat-Bold',
                fontSize: 15,
              }}>
              {!id ? 'Add To Cart' : 'Edit Order'}
            </Text>
          </TouchableOpacity>
          {!id && (
            <View style={styles.buttonView}>
              <TouchableOpacity
                onPress={() => {
                  validate(false);
                }}
                style={styles.buttonOpen}>
                <Text
                  style={{
                    color: 'white',
                    fontFamily: 'Montserrat-Bold',
                    fontSize: 15,
                  }}>
                  Punch Order
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.buttonOpen, {flexDirection: 'row'}]}
                onPress={() => {
                  navigation.replace('PunchorderList');
                  setInputs(initialstate);
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontFamily: 'Montserrat-Bold',
                    fontSize: 15,
                  }}>
                  {`View Cart` + ' ' + '('}
                  <Text style={{fontSize: 12}}>{`${carts.length}`}</Text>
                  <Text>{')'}</Text>
                </Text>
                {/* <View
                  style={{
                    marginLeft: '5%',
                    height: 24,
                    width: 24,
                    backgroundColor: '#fff',
                    borderRadius: 12,
                    alignItems: 'center',
                    justifyContent: 'center',
                    elevation: 5,
                    position: 'absolute',
                    right: -10,
                    top: -10,
                  }}>
                  <Text
                    style={{
                      color: 'black',
                      fontFamily: 'Montserrat-Bold',
                      fontSize: 15,
                      marginTop: -3,
                    }}>
                    {carts.length}
                  </Text>
                </View> */}
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
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
                closeHandler={() => setVisible(false)}
              />
            </View>
          </View>
        </Modal>
      </View>
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
    width: wp(42),
    backgroundColor: colors.color1,
    borderRadius: wp(2),
  },
  buttonOpen1: {
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
    // paddingHorizontal:15
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
});
export default Punchorder;
const data1 = [
  {label: 'Lorem Ipsum', value: 'Lorem Ipsum'},
  {label: 'Lorem Ipsum', value: 'Lorem Ipsum'},
  {label: 'Lorem Ipsum', value: 'Lorem Ipsum'},
  {label: 'Lorem Ipsum', value: 'Lorem Ipsum'},
];
const data3 = [
  {label: '184 Mali bag mumbai', value: '184 Mali bag mumbai'},
  {label: '184 Mali bag mumbai', value: '184 Mali bag mumbai'},
  {label: '184 Mali bag mumbai', value: '184 Mali bag mumbai'},
  {label: '184 Mali bag mumbai', value: '184 Mali bag mumbai'},
];

const data2 = [
  {label: 'Lorem Ipsum', value: 'Lorem Ipsum'},
  {label: 'Lorem Ipsum', value: 'Lorem Ipsum'},
  {label: 'Lorem Ipsum', value: 'Lorem Ipsum'},
  {label: 'Lorem Ipsum', value: 'Lorem Ipsum'},
];
