import React, {useEffect, useState, useDeferredValue} from 'react';
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
import Autocomplete from '../../../components/AutoComplete';

const Punchorder = ({route}) => {
  const {remark, customer, address, id} = useSelector(state => state.customer);

  const navigation = useNavigation();
  const [qualityList, setQaulityList] = useState([]);
  const [designList, setDesignList] = useState([]);
  const [colorshadeList, setColorShadeList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [carts, setCats] = useState([]);
  const [filteredDesigns, setFilteredDesigns] = useState([]);
  const [filteredColored, setFilteredColors] = useState([]);
  console.log('filteredDesigns>>>>', filteredDesigns);

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
    piece: '',
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
    id == undefined && fetchDesign();
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
    const {TOKEN, COMPANY} = storage;
    const items = await storage.getMultipleItems([TOKEN, COMPANY]);
    const token = items.find(([key]) => key === TOKEN)?.[1];
    const company = items.find(([key]) => key === COMPANY)?.[1];
    const endpoint = `design/${company}`;
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
      // console.log('log......', res);
      if (res.status) {
        setdata(res.data, type, item);
      } else {
        setIsLoading(false);
        ToastAndroid.show(res.message, ToastAndroid.SHORT);
      }
    } catch (err) {
      console.log(endpoint, err);
      setIsLoading(false);

      if (err.response.status != 401)
        ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
    } finally {
      setIsLoading(false);
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
      setQaulityList(data);
    } else if (type === 'design') {
      setDesignList(data);
    } else if (type === 'colorshade') {
      setColorShadeList(data);
    }
  };
  const addToCart = async () => {
    const companyid = await storage.getItem(storage.COMPANY);
    let array = [];

    const cartList = await storage.getItem(storage.CART);
    console.log('dfbjshjsbjsvbjvmvmv', cartList);
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
      color: inputs?.color,

      shade: inputs.shade,
    };
    array.push(newItem);

    console.log('virenrtssr,,,,, ', array);
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
      design: 'Please select Design',
      color: 'Please select color',
      cut: 'Please enter a valid Cut',
      price: 'Please enter a valid Price',
      piece: 'Please enter a valid piece',
    };

    for (const key in messages) {
      console.log('ssjngjksnskjnsdkf', inputs);
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
    if (inputs.piece === '' || isNaN(Number(inputs.piece))) {
      ToastAndroid.show(messages.piece, ToastAndroid.SHORT);
      return;
    }

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
          color: inputs?.color,
          // ?.colorid
          //   ? inputs?.color
          //   : {
          //       colorid: '',
          //       color: 'NA',
          //     },
          shade: inputs.shade,
          // ?.shadeid
          //   ? inputs.shade
          //   : {
          //       shadeid: '',
          //       shade: 'NA',
          //     },
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
  const deffered = useDeferredValue(inputs.design);
  console.log('dfgdfdfd', inputs.design);
  useEffect(() => {
    filterDesigns(deffered);
  }, [deffered]);
  const filterDesigns = async query => {
    console.log('this is called');
    if (query) {
      const token = await storage.getItem(storage.TOKEN);
      const compay = await storage.getItem(storage.COMPANY);
      const endpoint = `search-design/${compay}/${query}`;

      // Check if the query is numeric
      if (query.length > 2) {
        const filtered = await Api.getRequest(endpoint, token);
        setFilteredDesigns(filtered.data);
      }
      // console.log(filtered);
    } else {
      setFilteredDesigns([]);
    }
  };
  const filterColor = query => {
    if (query && !isNaN(query)) {
      const filtered = colorshadeList.filter(item =>
        item.colorid.toString().includes(query),
      );
      setFilteredColors(filtered);
    } else {
      setFilteredColors([]);
    }
  };
  console.log(colorshadeList);
  return (
    <View style={styles.container}>
      {isLoading && <Loading />}
      <Header
        title={'Punch Order'}
        onPress={() => navigation.goBack()}
        arrow={true}
        scanner={true}
        onPress2={() => setVisible(true)}
        nocompany
      />
      <ScrollView style={{marginBottom: 0}}>
        <View style={{paddingHorizontal: 5, marginBottom: 80}}>
          <View style={styles.Main}>
            <Text style={styles.inputText}>Design</Text>
            <Autocomplete
              autoCapitalize="none"
              listContainerStyle={{
                zIndex: 12,
              }}
              autoCorrect={false}
              data={filteredDesigns}
              defaultValue={inputs.design}
              valuekey="Design"
              onChangeText={text => {
                handleInputs('design', text);
              }}
              onPress={item => {
                console.log('this is item', item);
                setFilteredDesigns([]);
                handleInputs('design', item.Designid);
                fetchColorShade(item.Designid);
              }}
              placeholder="Design"
            />
          </View>

          <View style={styles.Main}>
            <Text style={styles.inputText}>Color</Text>

            <Autocomplete
              autoCapitalize="none"
              autoCorrect={false}
              data={filteredColored}
              defaultValue={inputs.color}
              valuekey="colorid"
              onChangeText={text => {
                handleInputs('color', text);
                filterColor(text);
              }}
              onPress={item => {
                setFilteredColors([]);

                console.log('gfdgddhdh???????', item);

                handleInputs('color', item.colorid);
              }}
              placeholder="Color"
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
            <Text style={styles.inputText}>Piece</Text>
            <View>
              <TextInput
                style={styles.dropdown}
                value={inputs.piece}
                onChangeText={value => {
                  handleInputs('piece', value);
                }}
                placeholder="Piece"
                keyboardType="number-pad"
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
  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
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
