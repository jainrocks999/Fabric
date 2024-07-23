import React, {useDeferredValue, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  ToastAndroid,
} from 'react-native';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import colors from '../../../assets/colors';
import Loading from '../../../components/Loader';
import storage from '../../../utils/storageService';
import {useDispatch} from 'react-redux';
import Api from '../../../Redux/Api';
import SelectModal from '../../../components/CustomHeader/SelectModal';
const LandingPage = () => {
  const [Rndata, setRndata] = useState([]);
  const [setdata, setSedata] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState({
    label: '',
    value: '',
  });
  const navigation = useNavigation();
  const [loader, setLoader] = useState(false);
  const focus = useIsFocused();
  const [company, setCompany] = useState('');
  const [companyName, setCompanyName] = useState('');
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
  }, [deferredValue, Rndata]);
  useEffect(() => {
    getCompanyName();
  }, []);
  const getCompanyName = async () => {
    const company = await storage.getItem(storage.COMPANY);
    const companyName = await storage.getItem(storage.COMPANY_NAME);
    setCompany(company);
    setSelectedItem({
      label: companyName,
      value: company,
    });
    setCompanyName(companyName);
  };
  const dispatch = useDispatch();
  const GetData = async () => {
    const Token = await storage.getItem(storage.TOKEN);

    try {
      setLoader(true);

      const response = await Api.getRequest('companies', Token);
      if (response?.status == true) {
        setLoader(false);
        const result = response?.data?.map(item => {
          let label = item.name;
          let value = item.id;
          return {label, value};
        });
        setRndata(result);
      } else {
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };
  useEffect(() => {
    GetData();
  }, [focus]);
  const onProceed = async item => {
    const value = item.value;
    if (value != company && company != null) {
      console.log('called');
      Alert.alert(
        'Warning!',
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
                // Ensure label exists
                await storage.setItem(storage.COMPANY, value);
                await storage.setItem(
                  storage.COMPANY_NAME,
                  item.label, // Fixed typo
                );
                setCompanyName(item.label);
                setVisible(false);
                await storage.removeItem(storage.CART);
                navigation.replace('Home');
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
      await storage.setItem(storage.COMPANY, value);
      await storage.setItem(
        storage.COMPANY_NAME,
        item.label, // Fixed typo
      );
      navigation.replace('Home');
    }
  };
  const onSelect = item => {
    setSelectedItem(item);
    setCompanyName(item.label);
    setVisible(false);
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <SelectModal
        search={search}
        data={setdata}
        setSearch={setSearch}
        visible={visible}
        onSelect={onSelect}
        onClose={value => setVisible(value)}
      />
      {loader ? <Loading /> : null}
      <View
        style={{
          height: 45,
          backgroundColor: colors.color1,
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{fontSize: 16, color: '#FFF', fontFamily: 'Montserrat-Bold'}}>
          Select Company
        </Text>
      </View>
      <View style={{alignItems: 'center', marginTop: 10}}>
        <Text
          style={{
            fontFamily: 'Montserrat-SemiBold',
            color: '#000',
            fontSize: 16,
          }}>
          Please select company name
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => setVisible(true)}
        style={{
          borderWidth: 1,
          height: 40,
          borderRadius: 6,
          paddingHorizontal: 15,
          borderColor: '#000',
          margin: 20,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            color: companyName ? 'black' : '#a0a0a0',
            fontSize: 13,
            // marginTop: 2,
            fontFamily: 'Montserrat-Medium',
          }}>
          {companyName ?? 'Please Select Company'}
        </Text>
        <Image
          tintColor={'grey'}
          style={{
            height: 8,
            width: 15,
          }}
          source={require('../../../assets/Icon/F.png')}
        />
      </TouchableOpacity>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <TouchableOpacity
          onPress={async () => {
            if (selectedItem.value) {
              dispatch({
                type: 'bag_check_success',
                payload: [],
              });
              onProceed(selectedItem);
            } else {
              ToastAndroid.show('Please select company', 500);
            }
          }}
          style={{
            backgroundColor: colors.color1,
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 6,
          }}>
          <Text
            style={{
              color: '#fff',
              fontSize: 14,
              fontFamily: 'Montserrat-SemiBold',
            }}>
            Proceed
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default LandingPage;
