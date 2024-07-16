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
const data2 = [
  {
    entno: '000001',
    ENTDT: '2023-04-19 00:00:00',
    Party: 'Ibf(Invictor Supplier)',
    partyid: 3358,
    Quality: 'RION...',
    qualityid: '2462',
    DESIGN: 'RION...',
    DESIGNid: '4952',
    SHADE: '713',
    shadeid: '713',
    qty: '50.0000',
    SABROWID: '24701181',
    barcode: '760000186',
    COMPANY: 'Invictor Clothing Llp',
    COMPANYid: 8,
    rate: '.0000',
  },
  {
    entno: '000001',
    ENTDT: '2023-04-19 00:00:00',
    Party: 'Ibf(Invictor Supplier)',
    partyid: 3358,
    Quality: 'RION...',
    qualityid: '2462',
    DESIGN: 'RION...',
    DESIGNid: '4952',
    SHADE: '713',
    shadeid: '713',
    qty: '50.0000',
    SABROWID: '24701181',
    barcode: '760000186',
    COMPANY: 'Invictor Clothing Llp',
    COMPANYid: 8,
    rate: '.0000',
  },
  {
    entno: '000001',
    ENTDT: '2023-04-19 00:00:00',
    Party: 'Ibf(Invictor Supplier)',
    partyid: 3358,
    Quality: 'RION...',
    qualityid: '2462',
    DESIGN: 'RION...',
    DESIGNid: '4952',
    SHADE: '713',
    shadeid: '713',
    qty: '50.0000',
    SABROWID: '24701181',
    barcode: '760000186',
    COMPANY: 'Invictor Clothing Llp',
    COMPANYid: 8,
    rate: '.0000',
  },
  {
    entno: '000001',
    ENTDT: '2023-04-19 00:00:00',
    Party: 'Ibf(Invictor Supplier)',
    partyid: 3358,
    Quality: 'RION...',
    qualityid: '2462',
    DESIGN: 'RION...',
    DESIGNid: '4952',
    SHADE: '713',
    shadeid: '713',
    qty: '50.0000',
    SABROWID: '24701181',
    barcode: '760000186',
    COMPANY: 'Invictor Clothing Llp',
    COMPANYid: 8,
    rate: '.0000',
  },
  {
    entno: '000001',
    ENTDT: '2023-04-19 00:00:00',
    Party: 'Ibf(Invictor Supplier)',
    partyid: 3358,
    Quality: 'RION...',
    qualityid: '2462',
    DESIGN: 'RION...',
    DESIGNid: '4952',
    SHADE: '713',
    shadeid: '713',
    qty: '50.0000',
    SABROWID: '24701181',
    barcode: '760000186',
    COMPANY: 'Invictor Clothing Llp',
    COMPANYid: 8,
    rate: '.0000',
  },
  {
    entno: '000001',
    ENTDT: '2023-04-19 00:00:00',
    Party: 'Ibf(Invictor Supplier)',
    partyid: 3358,
    Quality: 'RION...',
    qualityid: '2462',
    DESIGN: 'RION...',
    DESIGNid: '4952',
    SHADE: '713',
    shadeid: '713',
    qty: '50.0000',
    SABROWID: '24701181',
    barcode: '760000186',
    COMPANY: 'Invictor Clothing Llp',
    COMPANYid: 8,
    rate: '.0000',
  },
  {
    entno: '000001',
    ENTDT: '2023-04-19 00:00:00',
    Party: 'Ibf(Invictor Supplier)',
    partyid: 3358,
    Quality: 'RION...',
    qualityid: '2462',
    DESIGN: 'RION...',
    DESIGNid: '4952',
    SHADE: '713',
    shadeid: '713',
    qty: '50.0000',
    SABROWID: '24701181',
    barcode: '760000186',
    COMPANY: 'Invictor Clothing Llp',
    COMPANYid: 8,
    rate: '.0000',
  },
  {
    entno: '000001',
    ENTDT: '2023-04-19 00:00:00',
    Party: 'Ibf(Invictor Supplier)',
    partyid: 3358,
    Quality: 'RION...',
    qualityid: '2462',
    DESIGN: 'RION...',
    DESIGNid: '4952',
    SHADE: '713',
    shadeid: '713',
    qty: '50.0000',
    SABROWID: '24701181',
    barcode: '760000186',
    COMPANY: 'Invictor Clothing Llp',
    COMPANYid: 8,
    rate: '.0000',
  },
  {
    entno: '000001',
    ENTDT: '2023-04-19 00:00:00',
    Party: 'Ibf(Invictor Supplier)',
    partyid: 3358,
    Quality: 'RION...',
    qualityid: '2462',
    DESIGN: 'RION...',
    DESIGNid: '4952',
    SHADE: '713',
    shadeid: '713',
    qty: '50.0000',
    SABROWID: '24701181',
    barcode: '760000186',
    COMPANY: 'Invictor Clothing Llp',
    COMPANYid: 8,
    rate: '.0000',
  },
];
const Punchorder = ({route}) => {
  const visbles = route.params?.visible;
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [visible, setVisibles] = useState(false);
  const [scanneddata, setScannedData] = useState({});
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [editable, setEditable] = useState(false);
  const [addRole, setAddRolle] = useState(true);
  const [searched, setSeached] = useState('');
  const defferedValue = useDeferredValue(searched);
  const [manuvisble, setMenuVisible] = useState(false);
  const somedata = [
    {
      barcode: '760000186',
      company_name: 'Invictor Clothing Llp',
      companyid: 8,
      design_name: 'RION...',
      designid: 4952,
      entryDate: '2023-04-19 00:00:00',
      id: 33,
      party_name: 'Ibf(Invictor Supplier)',
      partyid: 3358,
      quality_name: 'RION...',
      qualityid: 2462,
      quantity: '505.0000',
      salesman_name: 'Aatish Singh',
      salesmanid: 1,
      shade_name: 'Haldi',
      shadeid: 713,
    },
  ];
  useEffect(() => {
    setVisibles(visbles ?? false);
  }, [visbles]);
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
      return (
        item.party_name.toLowerCase().includes(lowersearch) ||
        item.design_name.includes(lowersearch) ||
        item.quality_name.includes(lowersearch) ||
        item.shade_name.includes(lowersearch) ||
        item.quantity.includes(value) ||
        item.barcode.includes(value)
      );
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
      const has = data.some(item => {
        return item.barcode == e.data;
      });
      const res = await Api.getRequest(endpoint, token);
      if (res.status) {
        setScannedData(res.data[0]);

        setEditable(true);
        setAddRolle(true);
      } else {
        ToastAndroid.show(res.message, ToastAndroid.LONG);
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
  useEffect(() => {
    RolleList();
  }, []);

  const RolleList = async () => {
    const salesman = await storage.getItem(storage.USER);
    const endpoint = `roll-check-list/${salesman.salesmanid}`;
    fetData(endpoint, 'roleList');
  };
  const getRollesForEdit = item => {
    const endpoint = `edit-roll-by-id/${item.id}`;

    fetData(endpoint, 'editRolle', item);
  };
  const fetData = async (endpoint, type, item) => {
    setLoading(true);
    try {
      const token = await storage.getItem(storage.TOKEN);
      const res = await Api.getRequest(endpoint, token);

      if (res.status) {
        setdata(res.data, type, item);
      } else {
        ToastAndroid.show(res.message, ToastAndroid.LONG);
      }
    } catch (err) {
      console.log('is error here', err);
    } finally {
      setLoading(false);
      setMenuVisible(false);
    }
  };
  const setdata = (data, type, item) => {
    if (type == 'roleList') {
      setData(data);
    }
    if (type == 'editRolle') {
      console.log('this is data', data);
      setScannedData({
        ...data,
        Party: item.party_name,
        DESIGN: item.design_name,
        SHADE: item.shade_name,
        qty: item.quantity,
        ...item,
      });
      setEditable(true);
      setAddRolle(false);
    }
  };

  return (
    <View style={styles.container}>
      <EditRoll
        dataList={data}
        addRole={addRole}
        onComplete={() => {
          setEditable(false);
          RolleList();
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
        <FlatList
          data={filteredData}
          style={{marginTop: 20}}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: hp(18),
          }}
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
                  getRollesForEdit(item);
                }}
                style={{right: '3%', position: 'absolute', top: '3%'}}>
                <Text
                  style={{
                    fontSize: 14,
                    color: colors.color1,
                    fontFamily: 'Montserrat-SemiBold',
                    width: '100%',
                  }}>
                  Edit
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
                  {item?.design_name}
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
                  {item?.quality_name}
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
                  {item?.shade_name}
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
                  {item?.quantity}
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
