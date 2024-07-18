import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from 'react-native';
import React, {useDeferredValue, useEffect, useState} from 'react';
import Header from '../../../components/CustomHeader';
import storage from '../../../utils/storageService';
import Api from '../../../Redux/Api';
import Loader from '../../../components/Loader';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const PunchOrderHistory = () => {
  const [loading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [searched, setSeached] = useState('');
  const [data, setData] = useState([]);
  const defferedValue = useDeferredValue(searched);
  useEffect(() => {
    filter(defferedValue, data);
  }, [defferedValue, data]);
  const filter = (value, data) => {
    try {
      setLoading(true);
      if (value === '') {
        setFilteredData(data);
        setLoading(false);
        return;
      }

      const lowerSearch = value.toLowerCase();

      const isFullMatch = item =>
        item.Partyname.toLowerCase() === lowerSearch ||
        item.salesman.toLowerCase() === lowerSearch ||
        item.company.toLowerCase() === lowerSearch ||
        item.shade.toLowerCase() === lowerSearch ||
        item.Design.toLowerCase() === lowerSearch ||
        item.Quality.toLowerCase() === lowerSearch ||
        item.cutper.toLowerCase() === lowerSearch ||
        item.rate.toLowerCase() === lowerSearch ||
        item.qty === value ||
        item.amount === value ||
        item.udate === value ||
        item.remark === value;

      const isPartialMatch = item =>
        item.Partyname.toLowerCase().includes(lowerSearch) ||
        item.salesman.toLowerCase().includes(lowerSearch) ||
        item.company.toLowerCase().includes(lowerSearch) ||
        item.shade.toLowerCase().includes(lowerSearch) ||
        item.Design.toLowerCase().includes(lowerSearch) ||
        item.Quality.toLowerCase().includes(lowerSearch) ||
        item.cutper.toLowerCase().includes(lowerSearch) ||
        item.rate.toLowerCase().includes(lowerSearch) ||
        item.qty.includes(value) ||
        item.amount.includes(value) ||
        item.udate.includes(value) ||
        item.remark.includes(value);

      const fullMatchData = data.filter(isFullMatch);

      const partialMatchData = data.filter(
        item => !isFullMatch(item) && isPartialMatch(item),
      );

      const newData = [...fullMatchData, ...partialMatchData];

      setFilteredData(newData);

      setLoading(false);
    } catch (errr) {
      console.log(errr);
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);
  const getOrders = async () => {
    try {
      setLoading(true);
      const salesman = (await storage.getItem(storage.USER)).salesmanid;
      const token = await storage.getItem(storage.TOKEN);
      const endpoint = `user-orders/${salesman}`;
      const res = await Api.getRequest(endpoint, token);
      if (res.status) {
        setData(res.data);
      } else {
        ToastAndroid.show(res.message, ToastAndroid.SHORT);
      }
      setLoading(false);
    } catch (err) {
      ToastAndroid.show(err.message, ToastAndroid.SHORT);
      console.log(err);
      setLoading(false);
    } finally {
    }
  };
  return (
    <View style={{flex: 1}}>
      {loading && <Loader />}
      <Header title={'Order History'} />

      <View style={{marginHorizontal: '1%'}}>
        <View style={{paddingBottom: wp(5)}}>
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
        <FlatList
          data={filteredData}
          contentContainerStyle={{paddingBottom: hp(21)}}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
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
                    {'Party Name'}
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
                  {item?.Partyname}
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
                    {'Company'}
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
                  {item?.company}
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
                  {item?.Design}
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
                  {item?.Quality}
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
                  {item?.shade}
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
                  {item?.color}
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
                    {'Cut'}
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
                  {item?.cutper}
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
                    {'Rate'}
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
                  {item?.qty}
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
                    {'Amount'}
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
                  {item?.amount}
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
                    {'Order Date'}
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
                  {item?.udate}
                </Text>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default PunchOrderHistory;
