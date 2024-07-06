import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Header from '../../../components/CustomHeader';
import RNPickerSelect from 'react-native-picker-select';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import colors from '../../../assets/colors';
import axios from 'axios';
import Loading from '../../../components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import storage from '../../../utils/storageService';
const LandingPage = () => {
  const navigation = useNavigation();
  const [loader, setLoader] = useState(false);
  const focus = useIsFocused();
  const [Rndata, setRndata] = useState([]);
  const [id, setId] = useState('');
  const GetData = async () => {
    const Token = await storage.getItem(storage.TOKEN);
    const User = await storage.getItem(storage.USER);

    try {
      setLoader(true);

      const response = await axios({
        method: 'get',
        maxBodyLength: Infinity,
        url: 'http://203.123.38.118:8080/admin/index.php/api/companies',
        headers: {
          Authorization: `Bearer ${Token}`,
          // ...data.getHeaders()
        },
      });
      if (response?.data?.status == true) {
        setLoader(false);
        const result = response?.data?.data?.map(item => {
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

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
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
          LandingPage
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
      <View
        style={{
          borderWidth: 1,
          height: 40,
          borderRadius: 6,
          paddingHorizontal: 10,
          borderColor: '#000',
          justifyContent: 'center',
          margin: 20,
        }}>
        <RNPickerSelect
          // onValueChange={(value) => console.log('hhihih',value)}
          items={Rndata}
          value={id}
          onValueChange={async value => {
            setId(value);
          }}
          useNativeAndroidPickerStyle={false}
          placeholder={{label: 'Please select', value: 'Please select'}}
          style={{
            inputAndroid: {
              color: '#000',
              fontSize: 14,
            },
            inputIOS: {color: '#000'},
            placeholder: {
              color: '#a0a0a0',
              fontSize: 13,
              marginTop: 2,
              fontFamily: 'Montserrat-Medium',
            },
          }}
        />
      </View>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <TouchableOpacity
          onPress={async () => {
            await storage.setItem(storage.COMPANY, id);
            navigation.replace('Home');
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
