import React, {useDeferredValue, useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Image, Modal, Alert} from 'react-native';
import HeaderArrow from '../../assets/Icon/HeaderArrow.svg';
import Menu from '../../assets/Icon/Menu1.svg';
import colors from '../../assets/colors';
import BackArrow from '../../assets/Icon/BackArrow.svg';
import ArrowUp from '../../assets/Icon/up-arrow.svg';
import RNPickerSelect from 'react-native-picker-select';
import SelectModal from './SelectModal';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import storage from '../../utils/storageService';
import {useSelector} from 'react-redux';
import {FlatList, TextInput} from 'react-native-gesture-handler';

const CustomHeader = ({
  title,
  onPress,
  home,
  source,
  arrow,
  scanner,
  onPress2,
  nocompany,
}) => {
  const navigation = useNavigation();
  const {Rndata} = useSelector(state => state);
  const [setdata, setSedata] = useState([]);
  useEffect(() => {
    setSedata(Rndata);
  }, [Rndata]);
  const [visible, setVisible] = useState(false);

  const [company, setCompany] = useState('');
  const [search, setSearch] = useState('');
  const deferredValue = useDeferredValue(search);

  useEffect(() => {
    setSedata(() => {
      return Rndata.filter(item => {
        return (
          deferredValue === '' ||
          item.label.toLowerCase().includes(deferredValue.toLowerCase())
        );
      });
    });
  }, [deferredValue]);
  const [companyName, setCompanyName] = useState('');
  useEffect(() => {
    getCompanyName();
  }, []);
  const getCompanyName = async () => {
    const company = await storage.getItem(storage.COMPANY);
    const companyName = await storage.getItem(storage.COMPANY_NAME);
    setCompany(company);
    setCompanyName(companyName);
  };

  const onSelect = item => {
    const value = item.value;

    if (value != company) {
      console.log('called');
      Alert.alert(
        'Warning',
        'If you change company, all your previous tasks will be removed', // Fixed typos
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Ok',
            onPress: async () => {
              if (item.label) {
                await storage.setItem(storage.COMPANY, value);
                await storage.setItem(
                  storage.COMPANY_NAME,
                  item.label, // Fixed typo
                );
                setCompany(value);
                setCompanyName(item.label);
                setVisible(false);

                await storage.removeItem(storage.CART);
              } else {
                console.error('Label not found for the selected value');
                setVisible(false);
              }
            },
          },
        ],
        {
          cancelable: true,
        },
      );
    } else {
      setVisible(false);
    }
  };
  return (
    <View>
      <SelectModal
        search={search}
        data={setdata}
        setSearch={setSearch}
        visible={visible}
        onSelect={onSelect}
        onClose={setVisible}
      />
      <View
        style={{
          height: hp(5.7),
          backgroundColor: colors.color1,
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={onPress}
          style={{
            width: 60,
            height: 45,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {arrow ? <HeaderArrow /> : <Menu />}
        </TouchableOpacity>
        <Text
          style={{fontSize: 16, color: '#FFF', fontFamily: 'Montserrat-Bold'}}>
          {title}
        </Text>
        <TouchableOpacity
          activeOpacity={0.5}
          style={{
            width: 60,
            height: 45,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={onPress2}>
          {
            scanner ? (
              <Image
                style={{height: 25, width: 25, tintColor: '#fff'}}
                source={require('../../assets/Icon/qrcode2.png')}
              />
            ) : (
              !nocompany && (
                <TouchableOpacity
                  onPress={() => {
                    setVisible(true);
                  }}
                  style={{
                    height: 40,
                    width: 80,
                    borderColor: 'white',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    marginRight: '25%',
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      textAlign: 'center',
                      fontSize: 11,
                      fontFamily: 'Montserrat-Bold',
                    }}>
                    {companyName.substring(0, 16)}
                  </Text>
                  <View style={{marginLeft: '-5%'}}>
                    <ArrowUp />
                  </View>
                </TouchableOpacity>
              )
            )
            // <RNPickerSelect
            //   items={Rndata}
            //   doneText=""
            //   value={company}
            //   placeholder={{label: 'Change Company', value: 'Please Select'}}
            //   onValueChange={value => {
            //     if (value != company) {
            //       console.log('called');
            //       Alert.alert(
            //         'Warning',
            //         'If you change company, all your previous tasks will be removed', // Fixed typos
            //         [
            //           {
            //             text: 'Cancel',
            //             style: 'cancel',
            //           },
            //           {
            //             text: 'Ok',
            //             onPress: async () => {
            //               const label = Rndata.find(
            //                 item => item.value == value,
            //               );
            //               if (label) {
            //                 // Ensure label exists
            //                 await storage.setItem(storage.COMPANY, value);
            //                 await storage.setItem(
            //                   storage.COMPANY_NAME,
            //                   label.label, // Fixed typo
            //                 );
            //                 setCompanyName(label.label);
            //               } else {
            //                 console.error(
            //                   'Label not found for the selected value',
            //                 );
            //               }
            //             },
            //           },
            //         ],
            //         {
            //           cancelable: true,
            //         },
            //       );
            //     }
            //   }}
            //   useNativeAndroidPickerStyle={false}
            //   InputAccessoryView={() => {
            //     return <ArrowUp />;
            //   }}
            //   style={{
            //     inputAndroid: {
            //       color: colors.color1,
            //     },
            //     placeholder: {
            //       color: '#a0a0a0',
            //       fontSize: 11,
            //       marginTop: 2,
            //       fontFamily: 'Montserrat-Medium',
            //     },
            //   }}
            //   Icon={() => {
            //     return (

            //     );
            //   }}
            // />
          }
        </TouchableOpacity>
      </View>
      {!arrow && !home ? (
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: 42,
            height: 32,
            backgroundColor: colors.color1,
            borderTopLeftRadius: 80,
            borderTopRightRadius: 40,
            borderBottomLeftRadius: 80,
            borderBottomRightRadius: 40,
            margin: '2%',
          }}>
          <BackArrow />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};
export default CustomHeader;
const Rndata = [
  {label: 'Imperise Fabrics Pvt Ltd', value: '6'},
  {label: 'Infino Clothing Llp', value: '7'},
  {label: 'Invictor Clothing Llp', value: '8'},
  {label: 'Invictor Clothing Llp', value: '8'},
  {label: 'Invictor Clothing Llp', value: '8'},
  {label: 'Invictor Clothing Llp', value: '8'},
  {label: 'Invictor Clothing Llp', value: '8'},
  {label: 'Invictor Clothing Llp', value: '8'},
  {label: 'Invictor Clothing Llp', value: '8'},
  {label: 'Invictor Clothing Llp', value: '8'},
  {label: 'Invictor Clothing Llp', value: '8'},
  {label: 'Invictor Clothing Llp', value: '8'},
  {label: 'Invictor Clothing Llp', value: '8'},
  {label: 'Invictor Clothing Llp', value: '8'},
  {label: 'Invictor Clothing Llp', value: '8'},
  {label: 'Invictor Clothing Llp', value: '8'},
  {label: 'Invictor Clothing Llp', value: '8'},
  {label: 'Invictor Clothing Llp', value: '8'},
  {label: 'Invictor Clothing Llp', value: '8'},
  {label: 'Invictor Clothing Llp', value: '8'},
  {label: 'Invictor Clothing Llp', value: '8'},
  {label: 'Invictor Clothing Llp', value: '8'},
  {label: 'Invictor Clothing Llp', value: '8'},
  {label: 'Invictor Clothing Llp', value: '8'},
  {label: 'Invictor Clothing Llp', value: '8'},
  {label: 'Invictor Clothing Llp', value: '8'},
  {label: 'Invictor Clothing Llp', value: '8'},
  {label: 'Invictor Clothing Llp', value: '8'},
  {label: 'Invictor Clothing Llp', value: '8'},
];
