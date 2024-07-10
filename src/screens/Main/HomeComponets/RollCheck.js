import React, {useEffect, useState} from 'react';
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
} from 'react-native';
import Header from '../../../components/CustomHeader';
import {Dropdown} from 'react-native-element-dropdown';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import colors from '../../../assets/colors';
import Modal from 'react-native-modal';
import QRCodeScanner from '../../../components/QRCodeScanner';
import BackArrow from '../../../assets/Icon/BackArrow.svg';
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
const Punchorder = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [visible, setVisibles] = useState(false);
  const [scanneddata, setScannedData] = useState({});
  const [data, setData] = useState([]);
  const [editable, setEditable] = useState(false);
  const onScann = async e => {
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
        setVisibles(false);
        setEditable(true);
      } else {
        ToastAndroid.show(res.message, ToastAndroid.LONG);
      }
    } catch (err) {
      ToastAndroid.show('Error with Scanning QR code', ToastAndroid.LONG);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    RolleList();
  }, []);
  const RolleList = async () => {
    setLoading(true);
    try {
      const token = await storage.getItem(storage.TOKEN);
      const endpoint = `roll-check-list`;

      const res = await Api.getRequest(endpoint, token);
      console.log(res);
      if (res.status) {
        setData(res.data);
        console.log(res);
      } else {
        ToastAndroid.show(res.message, ToastAndroid.LONG);
      }
    } catch (err) {
      console.log('is error here', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <EditRoll
        dataList={data}
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
        scanner={true}
        onPress2={() => setVisibles(true)}
      />
      <View style={{padding: 10}}>
        <View style={{}}>
          <TextInput
            placeholder="Search"
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
        <FlatList
          data={data}
          style={{marginTop: 20}}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: hp(12),
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
              <View style={{flexDirection: 'row', width: '100%'}}>
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
                closeHandler={() => setVisibles(false)}
              />
            </View>
          </View>
        </Modal>
      </View>
      <View style={{position: 'absolute', bottom: 20, left: 20}}>
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
      </View>
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
