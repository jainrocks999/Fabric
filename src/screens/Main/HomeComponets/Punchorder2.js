import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import Header from '../../../components/CustomHeader';
import {Dropdown} from 'react-native-element-dropdown';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import colors from '../../../assets/colors';
import QRCodeScanner from '../../../components/QRCodeScanner';
import Modal from 'react-native-modal';
import Api from '../../../Redux/Api';
import storage from '../../../utils/storageService';
import Loading from '../../../components/Loader';

const Punchorder = ({route}) => {
  const {remark, customer, address} = route.params;
  const navigation = useNavigation();
  const [qualityList, setQaulityList] = useState([]);
  const [designList, setDesignList] = useState([]);
  const [colorshadeList, setColorShadeList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const initialstate = {
    customerName: customer ?? '',
    grade: '',
    design: {},
    shade: {},
    color: {},
    price: '',
    matchoption: '',
    cut: '',
    remark: '',
    remark1: remark ?? '',
    quality: {},
    address: address ?? '',
  };
  const [inputs, setInputs] = useState(initialstate);
  useEffect(() => {
    setInputs(prev => {
      return {
        ...prev,
        customerName: customer,
        address: address,
        remark1: remark,
      };
    });
  }, []);

  const handleInputs = (text, input) => {
    setInputs(prev => ({...prev, [text]: input}));
  };
  useEffect(() => {
    fetchQuality();
  }, []);
  const fetchQuality = async () => {
    const {TOKEN, COMPANY} = storage;
    const items = await storage.getMultipleItems([TOKEN, COMPANY]);
    const token = items.find(([key]) => key === TOKEN)?.[1];
    const company = items.find(([key]) => key === COMPANY)?.[1];
    const endpoint = `quality/${company}`;
    fetchData(endpoint, token, 'quality');
  };

  const fetchDesign = async id => {
    const token = await storage.getItem(storage.TOKEN);
    const endpoint = `design/${id}`;
    fetchData(endpoint, token, 'design');
  };
  const fetchColorShade = async id => {
    const token = await storage.getItem(storage.TOKEN);
    const endpoint = `shade/color/${id}`;
    fetchData(endpoint, token, 'colorshade');
  };

  const fetchData = async (endpoint, token, type) => {
    try {
      setIsLoading(true);
      const res = await Api.getRequest(endpoint, token);
      if (res.status) {
        setdata(res.data, type);
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

  const setdata = (data, type) => {
    if (type === 'quality') {
      setQaulityList(data);
    } else if (type === 'design') {
      setDesignList(data);
    } else if (type === 'colorshade') {
      setColorShadeList(data);
    }
  };
  const addToCart = async () => {
    let array = [];
    const date = new Date()
      .toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
      .replace(/ /g, ' ')
      .toLowerCase();

    console.log(date);

    const cartList = await storage.getItem(storage.CART);

    let newId = 1;
    if (cartList != null && cartList.length > 0) {
      newId = Math.max(...cartList.map(item => item.id)) + 1;
      array = [...cartList];
    }

    const newItem = {...inputs, date, id: newId};
    array.push(newItem);

    await storage.setItem(storage.CART, array);
    ToastAndroid.show('Data added to cart', ToastAndroid.SHORT);
    setInputs(initialstate);
  };

  return (
    <View style={styles.container}>
      {isLoading && <Loading />}
      <Header
        title={'Punch Order'}
        onPress={() => navigation.goBack()}
        arrow={true}
        scanner={true}
        onPress2={() => setVisible(true)}
      />
      <ScrollView style={{marginBottom: 0}}>
        <View style={{paddingHorizontal: 5, marginBottom: 80}}>
          <View style={styles.Main}>
            <Text style={styles.inputText}>Quality</Text>
            <View style={styles.dropdown}>
              <Dropdown
                style={{
                  height: 22,
                }}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={{color: '#000', fontSize: 14}}
                search
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
          </View>
          <View style={styles.Main}>
            <Text style={styles.inputText}>Design</Text>
            <View style={styles.dropdown}>
              <Dropdown
                style={{
                  height: 22,
                }}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={{color: '#000', fontSize: 14}}
                search
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
            </View>
          </View>
          <View style={styles.Main}>
            <Text style={styles.inputText}>Shade</Text>
            <View style={styles.dropdown}>
              <Dropdown
                style={{
                  height: 22,
                }}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={{color: '#000', fontSize: 14}}
                search
                data={colorshadeList}
                inputSearchStyle={{
                  borderRadius: 10,
                  backgroundColor: '#f0f0f0',
                }}
                itemTextStyle={{color: '#474747'}}
                searchPlaceholder="search.."
                maxHeight={250}
                labelField="shade"
                valueField="shadeid"
                placeholder="Shade"
                value={inputs.shade?.shadeid}
                renderItem={item =>
                  item.shadeid === inputs.shade?.shadeid ? (
                    <View
                      style={{
                        padding: 17,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: 'grey',
                      }}>
                      <Text style={[styles.selectedTextStyle, {color: '#fff'}]}>
                        {item.shade}
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
                        {item.shade}
                      </Text>
                    </View>
                  )
                }
                onChange={item => {
                  handleInputs('shade', item);
                }}
              />
            </View>
          </View>
          <View style={styles.Main}>
            <Text style={styles.inputText}>Color</Text>
            <View style={styles.dropdown}>
              <Dropdown
                style={{
                  height: 22,
                }}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={{color: '#000', fontSize: 14}}
                search
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
                onChange={item => {
                  handleInputs('color', item);
                }}
              />
            </View>
            {/* <View>
              <TextInput
                style={styles.dropdown}
                placeholder="Color"
              />
            </View> */}
          </View>
          <View style={styles.Main}>
            <Text style={styles.inputText}>Cut</Text>
            <View>
              <TextInput
                style={styles.dropdown}
                value={inputs.cut}
                placeholder="Cut"
                onChangeText={value => {
                  handleInputs('cut', value);
                }}
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
            <View>
              <TextInput
                style={styles.dropdown}
                value={inputs.remark}
                // placeholderTextColor='#C7C7CD'
                onChangeText={value => {
                  handleInputs('remark', value);
                }}
                placeholder="Remark"
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              addToCart();
            }}
            style={styles.buttonOpen1}>
            <Text
              style={{
                color: 'white',
                fontFamily: 'Montserrat-Bold',
                fontSize: 15,
              }}>
              Add To Cart
            </Text>
          </TouchableOpacity>
          <View style={styles.buttonView}>
            <TouchableOpacity style={styles.buttonOpen}>
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
              style={styles.buttonOpen}
              onPress={() => {
                navigation.navigate('PunchorderList');
                setInputs(initialstate);
              }}>
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'Montserrat-Bold',
                  fontSize: 15,
                }}>
                View Cart
              </Text>
            </TouchableOpacity>
          </View>
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
