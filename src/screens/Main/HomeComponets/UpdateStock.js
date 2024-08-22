import React, {useEffect, useState, useDeferredValue} from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import Header from '../../../components/CustomHeader';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import storage from '../../../utils/storageService';
import Loader from '../../../components/Loader';
import Api from '../../../Redux/Api';

const Punchorder = () => {
  const navigation = useNavigation();
  const [totalPages, setTotalPages] = useState(60);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const differedValue = useDeferredValue(search);
  const [filteredData, setFilteredData] = useState([]);
  useEffect(() => {
    filterData(data, differedValue);
  }, [differedValue, data]);
  useEffect(() => {
    getUpdatedStock(1);
  }, []);

  const getUpdatedStock = async page_number => {
    const company = await storage.getItem(storage.COMPANY);
    if (loading) {
      return;
    }
    const endpoint = `updated-stock/${page_number}?companyId=${company}`;
    fetData(endpoint);
    setPage(page_number);
  };
  const searchCriteria = {
    COMPANY: 'Infino',
    DESIGN: 'RICOTTI',
    ENTDT: '2024-04-01',
    Party: 'RATHOD',
    Quality: 'RICOTTI',
    SHADE: '300',
    barcode: '750000019',
    entno: '000002',
    qty: '42',
  };
  function filterData(data, searchString) {
    const searchLower = searchString.toLowerCase().trim();
    if (searchLower === '') {
      setFilteredData(data);
      return;
    }
    const filtred = data.filter(item => {
      return (
        item?.COMPANY?.toLowerCase()?.includes(searchLower) ||
        item?.Party?.toLowerCase()?.includes(searchLower) ||
        item?.Quality.toLowerCase()?.includes(searchLower) ||
        item?.barcode?.includes(searchString) ||
        item?.SHADE?.includes(searchString)
      );
    });
    setFilteredData(filtred);
  }

  const fetData = async endpoint => {
    setLoading(true);
    try {
      const token = await storage.getItem(storage.TOKEN);
      const res = await Api.getRequest(endpoint, token);
      if (res.status) {
        setData([...data, ...res.data]);
        setTotalPages(res.totalPages);
      } else {
        ToastAndroid.show(res.message, ToastAndroid.LONG);
      }
    } catch (err) {
      console.log('is error here', err);
    } finally {
      setLoading(false);
    }
  };
  const onScroll = ({nativeEvent}) => {
    if (!nativeEvent) return;
    const {layoutMeasurement, contentOffset, contentSize} = nativeEvent;
    if (layoutMeasurement.height + contentOffset.y >= contentSize.height - 20) {
      if (page <= totalPages) {
        search == '' ? getUpdatedStock(page + 1) : null;
      }
    }
  };

  return (
    <View style={styles.container}>
      <Header title={'Update Stock'} onPress={() => navigation.openDrawer()} />
      <View style={{height: hp(10), justifyContent: 'center'}}>
        <TextInput
          placeholder="Search for results"
          value={search}
          placeholderTextColor={'grey'}
          onChangeText={setSearch}
          style={{
            marginTop: wp(-1),
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
            marginHorizontal: '2%',
          }}
        />
      </View>
      {loading && <Loader />}
      <View style={{marginTop: -18}}>
        <FlatList
          onScroll={onScroll}
          contentContainerStyle={{paddingBottom: hp(25)}}
          data={filteredData}
          renderItem={({item}) => (
            <View
              style={{
                borderWidth: 1,
                padding: '2%',
                marginTop: '5%',
                width: '95%',
                alignSelf: 'center',
                borderRadius: 10,
                marginHorizontal: 15,
              }}>
              {/* <View style={{flexDirection: 'row', marginTop: 5}}>
            <Text
              style={{
                fontSize: 15,
                color: '#000',
                fontFamily: 'Montserrat-SemiBold',
              }}>
              {'Name : '}
            </Text>
            <Text
              style={{
                fontSize: 15,
                color: '#000',
                fontFamily: 'Montserrat-Medium',
              }}>
              {'Lorem Ipsum'}
            </Text>
          </View> */}

              <View style={{flexDirection: 'row', marginTop: 5, width: '100%'}}>
                <View style={{width: '35%'}}>
                  <Text
                    style={{
                      fontSize: 15,
                      color: '#000',
                      fontFamily: 'Montserrat-SemiBold',
                    }}>
                    {'Barcode'}
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 15,
                    color: '#000',
                    fontFamily: 'Montserrat-SemiBold',
                  }}>
                  {':'}
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    color: '#000',
                    fontFamily: 'Montserrat-Medium',
                  }}>
                  {'  ' + item.barcode}
                </Text>
              </View>
              <View style={{flexDirection: 'row', marginTop: 5}}>
                <View style={{width: '35%'}}>
                  <Text
                    style={{
                      fontSize: 15,
                      color: '#000',
                      fontFamily: 'Montserrat-SemiBold',
                    }}>
                    {'Company'}
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 15,
                    color: '#000',
                    fontFamily: 'Montserrat-SemiBold',
                  }}>
                  {':'}
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    color: '#000',
                    fontFamily: 'Montserrat-Medium',
                  }}>
                  {'  ' + item?.COMPANY}
                </Text>
              </View>
              <View style={{flexDirection: 'row', marginTop: 5}}>
                <View style={{width: '35%'}}>
                  <Text
                    style={{
                      fontSize: 15,
                      color: '#000',
                      fontFamily: 'Montserrat-SemiBold',
                    }}>
                    {'Shade'}
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 15,
                    color: '#000',
                    fontFamily: 'Montserrat-SemiBold',
                  }}>
                  {':'}
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    color: '#000',
                    fontFamily: 'Montserrat-Medium',
                  }}>
                  {'  ' + item?.SHADE}
                </Text>
              </View>
              <View style={{flexDirection: 'row', marginTop: 5}}>
                <View style={{width: '35%'}}>
                  <Text
                    style={{
                      fontSize: 15,
                      color: '#000',
                      fontFamily: 'Montserrat-SemiBold',
                    }}>
                    {'Color'}
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 15,
                    color: '#000',
                    fontFamily: 'Montserrat-SemiBold',
                  }}>
                  {':'}
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    color: '#000',
                    fontFamily: 'Montserrat-Medium',
                  }}>
                  {'  ' + 'NA'}
                </Text>
              </View>
              {/* <View style={{flexDirection: 'row', marginTop: 5}}>
            <Text
              style={{
                fontSize: 15,
                color: '#000',
                fontFamily: 'Montserrat-SemiBold',
              }}>
              {'Cut : '}
            </Text>
            <Text
              style={{
                fontSize: 15,
                color: '#000',
                fontFamily: 'Montserrat-Medium',
              }}>
              {'Lorem Ipsum'}
            </Text>
          </View> */}
              {/* <View style={{flexDirection: 'row', marginTop: 5}}>
                <View style={{width: '35%'}}>
                  <Text
                    style={{
                      fontSize: 15,
                      color: '#000',
                      fontFamily: 'Montserrat-SemiBold',
                    }}>
                    {'Price'}
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 15,
                    color: '#000',
                    fontFamily: 'Montserrat-SemiBold',
                  }}>
                  {':'}
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    color: '#000',
                    fontFamily: 'Montserrat-Medium',
                  }}>
                  {'  ' + data?.rate}
                </Text>
              </View> */}
              <View style={{flexDirection: 'row', marginTop: 5}}>
                <View style={{width: '35%'}}>
                  <Text
                    style={{
                      fontSize: 15,
                      color: '#000',
                      fontFamily: 'Montserrat-SemiBold',
                    }}>
                    {'Qty'}
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 15,
                    color: '#000',
                    fontFamily: 'Montserrat-SemiBold',
                  }}>
                  {':'}
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    color: '#000',
                    fontFamily: 'Montserrat-Medium',
                  }}>
                  {'  ' + parseFloat(item?.qty ?? '0.000').toFixed(2)}
                </Text>
              </View>
              {/* <View style={{marginTop: 5}}>
            <Text
              style={{
                fontSize: 15,
                color: '#000',
                fontFamily: 'Montserrat-SemiBold',
              }}>
              {'Description : '}
            </Text>
            <Text
              style={{
                fontSize: 15,
                color: '#000',
                fontFamily: 'Montserrat-Regular',
              }}>
              {
                'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum'
              }
            </Text>
          </View> */}
            </View>
          )}
        />
      </View>
      {/* <View style={{ position: 'absolute', bottom: 20, left: 20 }}>
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
            borderBottomRightRadius: 40
          }}>
          <BackArrow />
        </TouchableOpacity> 
      </View>*/}
    </View>
  );
};

export default Punchorder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
const data = [
  {
    label: 'Shirt',
    availble: '1',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    label: 'Shirt',
    availble: '124',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    label: 'Shirt',
    availble: '20',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
];
