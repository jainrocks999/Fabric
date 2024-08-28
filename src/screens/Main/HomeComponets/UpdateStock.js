import React, {useEffect, useState, useDeferredValue} from 'react';
import {
  View,
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
import {DataTable, Text} from 'react-native-paper';
import colors from '../../../assets/colors';
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

  const renderRow = ({item}) => {
    return (
      <View style={styles.rowContainer}>
        <View style={[styles.cell, styles.itemNameCell]}>
          <Text style={styles.cellText}>{item.itemName}</Text>
        </View>
        <View style={styles.itemRowsContainer}>
          {item?.items?.map((subItem, index) => (
            <View key={index} style={styles.subRow}>
              <View style={styles.cell}>
                <Text style={styles.cellText}>{subItem.colNo}</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.cellText}>{subItem.colName}</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.cellText}>{subItem.status}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container1}>
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
      {/* {loading && <Loader />} */}
      {/* <View style={{marginTop: -18}}> */}
      <View style={styles.container}>
        <DataTable>
          <DataTable.Header style={styles.tableHeader}>
            <DataTable.Title
              textStyle={[styles.headerText, {marginLeft: '2%'}]}>
              Item Name
            </DataTable.Title>
            <View style={{borderWidth: 1, backgroundColor: '#d3d3d3'}} />
            <DataTable.Title
              textStyle={[styles.headerText, {marginLeft: '15%'}]}>
              Col No
            </DataTable.Title>
            <View style={{borderWidth: 1, backgroundColor: '#d3d3d3'}} />

            <DataTable.Title
              textStyle={[styles.headerText, {marginLeft: '6%'}]}>
              Col Name
            </DataTable.Title>
            <View style={{borderWidth: 1, backgroundColor: '#d3d3d3'}} />

            <DataTable.Title
              textStyle={[styles.headerText, {marginLeft: '4%'}]}>
              Upd. Status
            </DataTable.Title>
          </DataTable.Header>

          <FlatList
            data={data1}
            renderItem={renderRow}
            keyExtractor={(item, index) => index.toString()}
          />
        </DataTable>
      </View>

      {/* <FlatList
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

            </View>
          )}
        /> */}
      {/* </View> */}
    </View>
  );
};

export default Punchorder;

const data1 = [
  {
    itemName: 'Diatrend',
    items: [{colNo: '2', colName: '2-Cream', status: 'Add'}],
  },
  {
    itemName: 'Double Maska',
    items: [
      {colNo: '3E', colName: '3E-D.Wine', status: 'Add'},
      {colNo: '6J', colName: '6J-Black', status: 'Add'},
      {colNo: '6K', colName: '6K-Black', status: 'Add'},
    ],
  },
  // Add more items as needed
];

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f4f4f4',
  },
  tableHeader: {
    backgroundColor: colors.color1,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#d3d3d3',
  },
  headerText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  rowContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#d3d3d3',
    backgroundColor: '#fff',
  },
  itemNameCell: {
    flex: 2 / 3,
    // borderRightWidth: 1,
    borderRightColor: '#d3d3d3',
  },
  itemRowsContainer: {
    flex: 3,
  },
  subRow: {
    flexDirection: 'row',
    // borderBottomWidth: 1,
    borderBottomColor: '#d3d3d3',
  },
  cell: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#d3d3d3',
  },
  cellText: {
    color: '#333333',
    fontSize: 13,
  },
});
