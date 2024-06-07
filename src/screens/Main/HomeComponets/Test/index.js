import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Platform,
} from 'react-native';
// import Header from '../../../components/CustomHeader';
import { useNavigation } from '@react-navigation/native';
// import Loader from '../../../components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import Toast from 'react-native-simple-toast';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';
import styles from './styles';

const MyCatalogue = () => {
  const navigation = useNavigation();
  const scrollViewRef = useRef();

  const dispatch = useDispatch();
  const selector4 = useSelector(state => state?.Home?.RetailerRequestList);

  const selector1 = useSelector(state => state?.Home?.NetworkList?.networkretailer);

  const selector2 = useSelector(state => state?.Home?.NetworkList1?.partnerApprovedRequest);
  const selector = useSelector(state => state?.State?.StateList);
  const cityList1 = useSelector(state => state?.City?.CityList);
  let cityList = cityList1?.cities;

  const isFocuse = useIsFocused()
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [supplier, setSupplier] = useState('');
  const [show, setShow] = useState(false);
  const [demoData, setData2] = useState('')
  const bannerList = useSelector(state => state?.Home?.BannerList);
  const BannerData = [];


  bannerList?.map((item) => {
    if (item.ImageSection == "supplierHome" && item.isActive == 1) {
      const url = `https://olocker.co/${item.ImageUrl}${item.ImageName
        }`;
      BannerData.push({
        ...item
      });
    }
  })



  const handleScroll = (event) => {


    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const paddingToBottom = 20;
    if (layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom) {

      console.log('end reach of call by function ');

    }
  };


  // const searchFilterFunction = text => {

  //   if (text) {
  //     const newData = masterDataSource.filter(function (item) {
  //       const itemData = `${item.label} `
  //         ? `${item.label}`.toUpperCase()
  //         : ''.toUpperCase();
  //       const textData = text.toUpperCase();
  //       return itemData.indexOf(textData) > -1;
  //     });
  //     setFilteredDataSource(newData);
  //     setSearch(text);
  //   } else {
  //     setFilteredDataSource(masterDataSource);
  //     setSearch(text);
  //   }
  // };

  // const handleSearch = () => {
  //   setSearch('');
  //   setFilteredDataSource(masterDataSource);
  // };
  // useEffect(() => {
  //   setFilteredDataSource()

  // }, [])



  useEffect(() => {

    if (isFocuse) {
      setData2('');
      setShow(false);
      ApiCallWithUseEffect();

    }
  }, [isFocuse]);
  const ApiCallWithUseEffect = async () => {
    const user_id = await AsyncStorage.getItem('user_id');
    dispatch({
      type: 'Network_List_Request',
      url: '/getNetworkRetailer',
      userId: user_id,
      userRole: 6, 
    });
    dispatch({
      type: 'Get_delete_Success',
      payload: undefined
    });
    dispatch({
      type: 'Retailer_RequestList',
      url: '/getReatilerRequest',
      userId: user_id,
      userRole: '6',
    });
    dispatch({
      type: 'Get_delete1_Success',
      payload: undefined
    })
    dispatch({
      type: 'Network_ApprovedRequestList_Request',
      url: '/partnerApprovedRequestList',
      userId: user_id,
      userRole: 6,
    });
  }

  const manageState = val => {
    setCity('');
    setSupplier('');

    dispatch({
      type: 'City_List_Request',
      url: '/getCities',
      stateId: val,
    });
  };


  const supplierprofile = async (id) => {
    const user_id = await AsyncStorage.getItem('user_id');
    console.log('gssjfhsfhskjf', id.isAdd);
    dispatch({
      type: 'get_networkretailerdetail_request',
      partnerId: id.SrNo,
      url: 'getNetworkRetailerDeatils',
      supplierId:user_id,
      isAdd:id.isAdd,
      navigation,
    });
  };

  const demo = (ind, index2) => {
  

    var data = [...selector4].filter((item, index) => {
      return ind != item.SrNo;

    })
    dispatch({
      type: 'Retailer_RequestList_Success',
      payload: data
    })

  }
  const AcceptMEthod = async (id, index) => {
    console.log('dddddd', index, id);
    const Token = await AsyncStorage.getItem('loginToken');
    setVisible2(true);
    const axios = require('axios');
    let data = new FormData();
    data.append('hSrNo', id?.SrNo);
    data.append('ddlStatus', '1');
    data.append('ddlCategory', id?.CategoryType);
    data.append('txtRejectReason', '');
    data.append('partnerId', id?.PartnerSrNo);
    data.append('supplierId', id?.SupplierSrNo);
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://olocker.co/api/supplier/retailerStatusUpdate',
      headers: {
        'Olocker': `Bearer ${Token}`,
        // ...data.getHeaders()
      },
      data: data
    };

    axios.request(config)
      .then((response) => {
        console.log('response,,,,,,,,,,', response.data);
        if (response?.data?.status == "success") {
          setVisible2(false);
          demo(id.SrNo, index);

        }

      })
      .catch((error) => {
        setVisible2(false);
        console.log(error);
      });


  }
  const RejectMEthod = async (id, index) => {

    const Token = await AsyncStorage.getItem('loginToken');
    setVisible2(true)
    const axios = require('axios');
    let data = new FormData();
    data.append('hSrNo', id?.SrNo);
    data.append('ddlStatus', '2');
    data.append('ddlCategory', '');
    data.append('txtRejectReason', '');
    data.append('partnerId', id?.PartnerSrNo);
    data.append('supplierId', id?.SupplierSrNo);
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://olocker.co/api/supplier/retailerStatusUpdate',
      headers: {
        'Olocker': `Bearer ${Token}`,
        // ...data.getHeaders()
      },
      data: data
    };

    axios.request(config)
      .then((response) => {
        console.log('response,,,,,,,,,,', response.data);
        if (response.data.status == "success") {
          setVisible2(false);
          demo(id.SrNo, index);
          // Toast.show(response?.data?.msg);


        }

      })
      .catch((error) => {
        setVisible2(false);
        console.log('tjisssi', error);
      });

  }





  const scrollToIndex = (index) => {
    const ITEM_HEIGHT = 50;
    scrollViewRef.current.scrollTo({ y: index * ITEM_HEIGHT, animated: true });
  };


  const getSupplier = async () => {
    const user_id = await AsyncStorage.getItem('user_id');
    const Token = await AsyncStorage.getItem('loginToken');

    // if (city != '' || state != '' || search != '') {
    setVisible1(true);
    const axios = require('axios');
    let data = new FormData();
    console.log('search input data,,,,', city, state, supplier, user_id);
    let config = {
      method: 'get',
      maxBodyLength: Infinity,

      url: `https://olocker.co/api/supplier/searchRetailer?userRole=6&userId=${user_id}&stateId=${state}&cityId=${city}&retailerName=${supplier}`,
      headers: {
        'Olocker': `Bearer ${Token}`,

      },
    
    };
console.log('api url ,,,',config.url);
    axios.request(config)
      .then((response) => {
        if (response.data.status == true) {
          console.log('heeeyeygyyrg', JSON.stringify(response.data.data?.searchpartner));
          setData2(response?.data?.data?.searchpartner);
          setVisible1(false);
          setShow(true);
        }

      })
      .catch((error) => {
        setVisible1(false);
        console.log('error.....', error);
      });









    // dispatch({
    //   type: 'Search_Retailer_Request',
    //   url: '/searchRetailer',
    //   userId: user_id,
    //   userRole: '6',
    //   city: city,
    //   state: state,
    //   Rname: search,
    //   // navigation: navigation,
    //   start: 1,
    //   length: 10,
    // });
    // }
  };





  return (
    <View style={styles.container}>
      {/* <Header
        source1={require('../../../assets/Fo.png')}
        source2={require('../../../assets/Image/dil.png')}
        title={'My Network '}
        onPress={() => navigation.goBack()}
        onPress1={() => navigation.navigate('Message')}
        onPress2={() => navigation.navigate('FavDetails')}
      /> */}
      {/* {isFetching || isFetching1 || visible || visiable1 ? <Loader /> : null} */}
      <ScrollView ref={scrollViewRef}>

        <View
          style={styles.container1}>
          {/* {lenght > 0 ? */}


          {/* <FlatListSlider
                data={images}
                height={170}
                timer={3000}
                contentContainerStyle={{ marginVertical: 0, paddingHorizontal: 16 }}
                indicatorContainerStyle={{ position: 'absolute', bottom: -16 }}
                indicatorActiveColor={'#032e63'}
                indicatorInActiveColor={'#ffffff'}
                indicatorActiveWidth={10}
                animation
                component={<Preview />}
                separatorWidth={15}
                width={300}
                autoscroll={true}
                loop={false}
              /> */}
          {/* <SliderBanner data={BannerData} bottom={-15} height={9} width={9} borderRadius={5} /> */}

          {/* : null} */}

          <View style={{ height: 150 }} />
        </View>
        <View style={{ marginTop: -135, paddingHorizontal: 15 }}>
          <Text
            style={styles.text2}>
            Search Retailer
          </Text>
          <View
            style={styles.main2}>
            <View
              style={styles.main1}>
              <View style={{ paddingTop: 10 }}>
                <Text
                  style={{
                    fontFamily: 'Acephimere',
                    fontSize: 12,
                    color: '#595959',
                  }}>
                  Search by name of jeweller Retailer's
                </Text>
                <TextInput
                  style={{
                    height: 40,
                    marginTop: -5,
                    fontFamily: 'Acephimere',
                    fontSize: 15,
                    color: '#032e63',
                    marginRight: 5,
                    width: '100%',
                  }}
                  value={supplier}
                  placeholderTextColor='#474747'
                  onChangeText={val => setSupplier(val)}
                  placeholder="Enter Jeweller Partner Name"
                />
              </View>

            </View>
            <View style={{ borderWidth: 0.5, borderColor: 'grey' }} />
            <View
              style={styles.liner}>
              <View
                style={[styles.linerview,]}>
                <View
                  style={[styles.linert]}>

                  <Dropdown
                    style={{
                      color: '#032e63',
                      width: '100%',
                      marginBottom: -1, height: 40,
                      marginTop: 0,

                    }}
                    // renderInputSearch={renderInputSearch}
                    placeholderStyle={{
                      color: '#032e63',
                      width: '100%', fontWeight: '600',
                      alignSelf: 'center',
                      fontFamily: 'Acephimere', fontSize: 15,
                      paddingLeft: '10%'
                    }}
                    selectedTextStyle={{
                      color: '#032e63',
                      alignSelf: 'center',
                      fontFamily: 'Acephimere',
                      fontSize: 15,
                      paddingLeft: '6%'
                      //  textAlign:'center',


                      // borderWidth:1
                    }}
                    mode='default'
                    iconStyle={{ tintColor: '#474747', position: 'absolute', right: '-5%' }}
                    data={City}
                    inputSearchStyle={{
                      borderRadius: 10,
                      color: '#474747',
                      backgroundColor: '#f0f0f0',
                    }}
                    dropdownPosition='top'
                    itemTextStyle={{ color: '#474747' }}
                    itemContainerStyle={{ marginBottom: -15, }}
                    searchPlaceholder="search.."

                    maxHeight={200}
                    search
                    labelField="label"
                    valueField="value"
                    placeholder="Select state"

                    value={state}

                    onChange={item => {
                      manageState(item.value), setState(item.value);
                    }}
                  />


                </View>

              </View>

              <View
                style={{
                  borderWidth: 0.5,
                  height: 100,
                  borderColor: 'grey',
                  marginTop: 0,
                  marginLeft: '10%'
                }}
              />
              {/* <View
                style={{
                  padding: 0,
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  width: '42%',
                }}> */}

              {/* <View
                  style={{
                    height: 45,
                    width: '100%',
                    borderWidth: 0,
                    marginRight: 10,
                  }}> */}

              {/* <View style={{width:'42%'}}> */}
              <Dropdown
                style={{
                  color: '#032e63',
                  //  width:150,
                  width: '100%',
                  marginBottom: -1,
                  height: 40,
                  marginTop: -10,
                  marginRight: '30%'


                }}

                placeholderStyle={{
                  color: '#032e63',
                  width: '100%', fontWeight: '600',
                  alignSelf: 'center',
                  fontFamily: 'Acephimere', fontSize: 15,
                  paddingLeft: '10%'
                }}
                selectedTextStyle={{
                  color: '#032e63',
                  width: '100%',
                  alignSelf: 'center',
                  fontFamily: 'Acephimere', fontSize: 15,
                  paddingLeft: '10%'
                }}
                iconStyle={{ tintColor: '#474747', position: 'absolute', left: '38%' }}
                // data={Metal}
                data={City}
                inputSearchStyle={{
                  borderRadius: 10,
                  color: '#474747',
                  backgroundColor: '#f0f0f0',
                }}
                dropdownPosition='top'
                itemContainerStyle={{ marginBottom: -10 }}
                searchPlaceholder="search.."
                maxHeight={200}
                itemTextStyle={{ color: '#474747' }}

                search
                labelField="label"
                valueField="value"
                placeholder="Select city"
                value={city}

                onChange={item => {
                  setCity(item.value)
                }}
              />
              {/* </View>


                </View> */}


              {/* </View> */}
            </View>
          </View>
          <View style={{ alignItems: 'center', marginTop: -11 }}>
            <TouchableOpacity
              onPress={() => getSupplier()}
              style={{
                height: 40,
                width: 130,
                backgroundColor: '#e9056b',
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{ color: '#fff', fontFamily: 'Acephimere', fontSize: 15 }}>
                Search
              </Text>
            </TouchableOpacity>
          </View>


          {show && demoData?.length <= 0 ? (
            <Text
              style={{
                alignSelf: 'center',
                marginTop: 10,
                fontSize: 13,
                color: 'red', marginBottom: 10
              }}>
              {'SEARCHED JEWELLER NOT FOUND'}
            </Text>
          ) : (
            <View style={{ paddingVertical: 10 }}>
              <View style={{ height: demoData?.length == 0 ? hp(0) : hp(35), zIndex: 2 }}>
                <ScrollView nestedScrollEnabled
                  ref={scrollViewRef}
                  onScroll={handleScroll}
                  scrollEventThrottle={400}
                >
                  <FlatList
                    data={demoData}
                    scrollEnabled={false}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        onPress={() => supplierprofile(item)}
                        style={{
                          elevation: 5,
                          backgroundColor: '#fff',
                          paddingVertical: 15,
                          paddingHorizontal: 10,
                          marginTop: 10,
                          borderRadius: 8,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>

                        <View>
                          <Text
                            style={{
                              fontSize: 16,
                              color: '#000',
                              fontFamily: 'Acephimere',
                            }}>
                            {item.CompanyName}
                          </Text>
                          <View style={{}}>
                            <Text
                              style={{
                                color: '#595959',
                                fontFamily: 'Acephimere',
                                fontSize: 11,
                              }}>
                              {item.city_name}
                            </Text>
                            <Text
                              style={{
                                color: '#595959',
                                fontFamily: 'Acephimere',
                                fontSize: 11,
                              }}>
                              {item.state_name}
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    )}
                  />
                </ScrollView>
              </View>
            </View>
          )}

          <View
            style={{
              width: '100%',
              backgroundColor: '#fff',
              marginTop: 0,
              elevation: 5,
              borderRadius: 10,
            }}>
            <View style={{ paddingHorizontal: 10, paddingVertical: 10, }}>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: 'Philosopher-Regular',
                  color: '#032e63',
                }}>
                My Network{' '}
              </Text>
            </View>
            <View style={{ borderWidth: 0.5, borderColor: 'grey' }} />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('MyNetworks1')}
                style={{
                  padding: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '33%',
                }}>
                {selector2?.length == 0 ?
                  <View>
                    <Text style={{ color: '#565656', fontFamily: 'Acephimere' }}>{''}</Text>
                  </View> :
                  <View style={{ height: 18, width: 30, bottom: -4, backgroundColor: '#e9056b', alignSelf: 'flex-end', borderRadius: 10 }}>
                    <Text style={{ color: '#fff', textAlign: 'center', marginTop: -1 }}>{`${selector2?.length}`}</Text>
                  </View>}

                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                  {/* <Image
                    style={{ height: 40, width: 42, tintColor: '#032e63' }}
                    source={require('../../../assets/PartnerImage/4.png')}
                  /> */}
                  <Text>one</Text>
                </View>
                <Text
                  style={{
                    fontSize: 11,
                    marginTop: 5,
                    color: '#343434',
                    fontFamily: 'Acephimere',
                  }}>
                  My Network
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  borderWidth: 0.3,
                  height: '100%',
                  borderColor: 'grey',
                  marginTop: 0,
                }}
              />
              <TouchableOpacity
                onPress={() => navigation.navigate('PendingRequest')}
                style={{
                  padding: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '33%',
                }}>


                { selector4?.length == 0 ?
                  <View>
                    <Text style={{ color: '#565656', fontFamily: 'Acephimere' }}>{''}</Text>
                  </View> :

                  <View style={{ height: 18, width: 30, bottom: -5, backgroundColor: '#da062f', alignSelf: 'flex-end', borderRadius: 10 }}>
                    <Text style={{ color: '#fff', textAlign: 'center' }}>{`${selector4?.length}`}</Text>
                  </View>
                }
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                  {/* <Image
                    style={{ height: 42, width: 50 }}
                    source={require('../../../assets/PartnerImage/2.png')}
                  /> */}
                   <Text>one</Text>
                </View>
                <Text
                  style={{
                    fontSize: 11,
                    marginTop: 5,
                    color: '#343434',
                    fontFamily: 'Acephimere',
                  }}>
                  Pending Request
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  borderWidth: 0.3,
                  height: '100%',
                  borderColor: 'grey',
                  marginTop: 0,
                }}
              />

              <TouchableOpacity
                onPress={() => navigation.navigate('SentRequest')}
                style={{
                  padding: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '33%',
                }}>

                {selector1?.length == 0 ?
                  <View>
                    <Text style={{ color: '#565656', fontFamily: 'Acephimere' }}>{''}</Text>
                  </View> :
                  <View style={{ height: 18, width: 30, bottom: -4, backgroundColor: '#e9056b', alignSelf: 'flex-end', borderRadius: 10 }}>
                    <Text style={{ color: '#fff', textAlign: 'center', marginTop: -1 }}>{`${selector1?.length}`}</Text>
                  </View>}
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                  {/* <Image
                    style={{ height: 42, width: 52 }}
                    source={require('../../../assets/PartnerImage/3.png')}
                  /> */}
                   <Text>one</Text>
                </View>
                <Text
                  style={{
                    fontSize: 11,
                    marginTop: 5,
                    color: '#343434',
                    fontFamily: 'Acephimere',
                  }}>
                  Sent Request
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ paddingVertical: 10 }}>
            { selector4?.length == 0 ?

              <View>
                <Text style={{ color: '#565656', fontFamily: 'Acephimere' }}>{''}</Text>
              </View>
              :
              <View>
                <Text style={{ color: '#565656', fontFamily: 'Acephimere' }}>{`${ selector4?.length==1? `${selector4?.length} Notification`:`${selector4?.length} Notifications`}`}</Text>
                <FlatList
                  data={(selector4)?.slice(0, 3)}

                  renderItem={({ item, index }) => (
                    <View
                      style={{
                        elevation: 5,
                        backgroundColor: '#fff',
                        paddingVertical: 15,
                        paddingHorizontal: 10,
                        marginTop: 10,
                        borderRadius: 8,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <View>
                        <Text
                          style={{
                            fontSize: 16,
                            color: '#000',
                            fontFamily: 'Acephimere',
                          }}>
                          {item.CompanyName}
                        </Text>
                        <Text
                          style={{
                            color: '#000',
                            fontFamily: 'Acephimere',
                            fontSize: 13,
                          }}>
                          {item.city_name}
                        </Text>
                      </View>
                      <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity
                          onPress={() => AcceptMEthod(item, index)}
                          style={{ height: 40, width: 40 }}>
                          {/* <Image
                            style={{ height: '100%', width: '100%' }}
                            source={require('../../../assets/PartnerImage/6.png')}
                          /> */}
                           <Text>one</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => RejectMEthod(item, index)}
                          style={{ height: 40, width: 40, marginLeft: 10 }}>
                          {/* <Image
                            style={{ height: '100%', width: '100%' }}
                            source={require('../../../assets/PartnerImage/5.png')}
                          /> */}
                           <Text>one</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                />
              </View>
            }
          </View>
        </View>

        <View style={{ height: 185 }} />
      </ScrollView>


    </View>
  );
};
export default MyCatalogue;
const data = [
  { title: 'Hello' },
  { title: 'Hello' },
  { title: 'Hello' },
  { title: 'Hello' },
  { title: 'Hello' },
  { title: 'Hello' },
  { title: 'Hello' },
  { title: 'Hello' },
  { title: 'Hello', type: 'add' },
];
const data1 = [
  { name: 'Milind Jeweller', city: 'Mumbai' },
  { name: 'Milind Jeweller', city: 'Mumbai' },
  { name: 'Milind Jeweller', city: 'Mumbai' },
];

const City = [
  { label: 'Mumbai', value: 'Mumbai' },
  { label: 'Indore', value: 'Indore' },
  { label: 'Bangalore', value: 'Bangalore' },
  { label: 'Mumbai', value: 'Mumbai' },
  { label: 'Indore', value: 'Indore' },
  { label: 'Bangalore', value: 'Bangalore' },
];
const Metal = [
  { label: 'Select Metal', value: 'Select Metal' },
  { label: 'Diamond', value: 'Diamond' },
  { label: 'Gold', value: 'Gold' },
  { label: 'Platinum', value: 'Platinum' },
  { label: 'Silver', value: 'Silver' },
  { label: 'Mumbai', value: 'Mumbai' },
  { label: 'Indore', value: 'Indore' },
  { label: 'Bangalore', value: 'Bangalore' },
  { label: 'Mumbai', value: 'Mumbai' },
  { label: 'Indore', value: 'Indore' },
  { label: 'Bangalore', value: 'Bangalore' },

];

const images = [
  {
    image:
      'https://images.unsplash.com/photo-1455620611406-966ca6889d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1130&q=80',
    desc: 'Red fort in India New Delhi is a magnificient masterpeiece of humans',
  },
  {
    image:
      'https://images.unsplash.com/photo-1455620611406-966ca6889d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1130&q=80',
    desc: 'Red fort in India New Delhi is a magnificient masterpeiece of humans',
  },
  {
    image:
      'https://images.unsplash.com/photo-1455620611406-966ca6889d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1130&q=80',
    desc: 'Red fort in India New Delhi is a magnificient masterpeiece of humans',
  },
  {
    image:
      'https://images.unsplash.com/photo-1455620611406-966ca6889d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1130&q=80',
    desc: 'Red fort in India New Delhi is a magnificient masterpeiece of humans',
  },
  {
    image:
      'https://images.unsplash.com/photo-1455620611406-966ca6889d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1130&q=80',
    desc: 'Red fort in India New Delhi is a magnificient masterpeiece of humans',
  },
  {
    image:
      'https://images.unsplash.com/photo-1455620611406-966ca6889d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1130&q=80',
    desc: 'Red fort in India New Delhi is a magnificient masterpeiece of humans',
  },
  {
    image:
      'https://images.unsplash.com/photo-1455620611406-966ca6889d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1130&q=80',
    desc: 'Red fort in India New Delhi is a magnificient masterpeiece of humans',
  },
];
