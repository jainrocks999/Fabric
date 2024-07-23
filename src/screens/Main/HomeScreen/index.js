import React, {useState, useEffect, useDeferredValue} from 'react';
import {
  View,
  Text,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  BackHandler,
  Alert,
} from 'react-native';
import Menu from '../../../assets/Icon/Menu.svg';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Modal from 'react-native-modal';
import colors from '../../../assets/colors';
import {RNCamera} from 'react-native-camera';
import QRCodeScanner from '../../../components/QRCodeScanner';
import Tts from 'react-native-tts';
import storage from '../../../utils/storageService';
import {useDispatch, useSelector} from 'react-redux';
import SelectModal from '../../../components/CustomHeader/SelectModal';
import Loader from '../../../components/Loader';
// import Voice from '@react-native-voice/voice';

const HomeScreen = () => {
  const {Rndata, isFetching} = useSelector(state => state);
  const [setdata, setSedata] = useState([]);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [visibless, setVisible] = useState(false);
  const [visible, setVisibles] = useState(false);
  const [selected, setSelected] = useState(0);
  const [company_name, setCompanyName] = useState('');
  const [user, setUser] = useState('');
  const [company, setCompany] = useState('');
  const focus = useIsFocused();
  useEffect(() => {
    setSedata(Rndata);
  }, [Rndata]);
  useEffect(() => {
    getCompanyName();
  }, [focus]);
  const getCompanyName = async () => {
    const name = await storage.getItem(storage.COMPANY_NAME);
    const company = await storage.getItem(storage.COMPANY);
    setCompany(company);
    const userName = await storage.getItem(storage.USER);
    setCompanyName(name);
    setUser(userName);
  };
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
  const onSelect = item => {
    const value = item.value;
    if (value != company) {
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
                setCompany(value);
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

  // useEffect(()=>{
  //     // Tts.speak('Hello, world!')
  //     Voice.onSpeechStart = this.onSpeechStartHandler.bind(this);
  //     Voice.onSpeechEnd = this.onSpeechEndHandler.bind(this);
  //     Voice.onSpeechResults = this.onSpeechResultsHandler.bind(this);

  // },[])

  // const  onStartButtonPress=(e)=>{
  //     Voice.start('en-US');
  //   }

  const onItemPress = title => {
    if (title == 'Punch Order') {
      navigation.navigate('PunchOrder');
    } else if (title == 'Bag Check') {
      navigation.navigate('BagCheck', {visible: false});
      // openScanner()
      // setVisibles(true)
    } else if (title == 'Roll Check') {
      navigation.navigate('RollCheck', {visible: false});
      // setVisibles(true)
    } else if (title == 'Stock Check') {
      navigation.navigate('StockCheck');
      // setVisibles(true)
    } else if (title == 'Updated Stock') {
      navigation.navigate('UpdateStock');
    } else if (title == 'Order History') {
      navigation.navigate('History');
    }
  };
  useEffect(() => {
    getCompanies();
  }, []);

  const getCompanies = async () => {
    const endpoint = 'companies';
    const token = await storage.getItem(storage.TOKEN);
    dispatch({
      type: 'fetch_copanies_rquest',
      endpoint,
      token,
    });
  };

  function handleBackButtonClick() {
    // BackHandler.exitApp()
    return false;
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);
  const getGreeting = () => {
    let hours = new Date().getHours();
    if (hours < 12) {
      return 'Good Morning';
    } else if (hours < 18) {
      return 'Good Afternoon';
    } else {
      return 'Good Evening';
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      {false && <Loader />}
      <SelectModal
        onClose={value => {
          setVisible(value);
        }}
        search={search}
        data={setdata}
        setSearch={setSearch}
        visible={visibless}
        onSelect={onSelect}
      />
      <View
        style={{
          height: 50,
          width: '100%',
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 20,
          backgroundColor: '#fff',
        }}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Menu />
        </TouchableOpacity>
      </View>
      <ScrollView style={{}}>
        <View style={{marginTop: 20, paddingHorizontal: 10}}>
          <View style={{paddingHorizontal: 10}}>
            <Text
              style={{
                fontSize: 18,
                fontFamily: 'Montserrat-Bold',
                color: colors.color1,
              }}>
              {`Hi ${user.salesman}!`}
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'Montserrat-SemiBold',
                color: colors.color1,
              }}>
              {getGreeting()}
            </Text>
          </View>
          <View
            style={{
              borderWidth: 1.5,
              height: 90,
              marginHorizontal: 10,
              marginTop: 25,
              marginBottom: 25,
              borderRadius: 10,
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              onPress={() => setVisible(true)}
              style={{
                paddingHorizontal: 20,
                paddingVertical: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '-2%',
              }}>
              <View>
                <Text
                  style={{
                    fontFamily: 'Montserrat-Bold',
                    fontSize: 16,
                    color: colors.color1,
                  }}>
                  Welcome to
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: 'Montserrat-SemiBold',
                    color: colors.color1,
                  }}>
                  {'' + company_name}
                </Text>
              </View>
              <Image
                style={{height: 15, width: 15, marginRight: '5%'}}
                source={require('../../../assets/Icon/F.png')}
              />
            </TouchableOpacity>
          </View>
          <FlatList
            data={data}
            numColumns={2}
            renderItem={({item, index}) => (
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                  setTimeout(() => {
                    onItemPress(item.name);
                  }, 100);
                  setSelected(item.selected);
                }}
                style={{
                  // backgroundColor:'#1505f5',
                  backgroundColor:
                    selected == item.selected ? '#0e305d' : '#a0a2a3', //d1d8e3
                  width: '45%',
                  height: 150,
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: 10,
                  borderRadius: 10,
                  shadowColor: '#FCDA64BF',
                  shadowOpacity: 0.26,
                  shadowOffset: {width: 2, height: 0},
                  shadowRadius: 20,
                  elevation: 5,
                }}>
                <Image source={item.img} />
                <Text
                  style={{
                    color: '#FFF',
                    fontFamily: 'Montserrat-SemiBold',
                    fontSize: 12,
                    marginTop: 10,
                  }}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
          />
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
                closeHandler={() => setVisibles(false)}
              />
            </View>
          </View>
        </Modal>
      </View>
      <StatusBar animated={true} backgroundColor={colors.color1} />
    </View>
  );
};
export default HomeScreen;
const data = [
  {
    img: require('../../../assets/LocalImage/image15.png'),
    name: 'Punch Order',
    selected: 1,
  },
  {
    img: require('../../../assets/LocalImage/image16.png'),
    name: 'Bag Check',
    selected: 2,
  },
  {
    img: require('../../../assets/LocalImage/image17.png'),
    name: 'Roll Check',
    selected: 3,
  },
  {
    img: require('../../../assets/LocalImage/image18.png'),
    name: 'Stock Check',
    selected: 4,
  },
  {
    img: require('../../../assets/LocalImage/image19.png'),
    name: 'Updated Stock',
    selected: 5,
  },
  {
    img: require('../../../assets/LocalImage/image20.png'),
    name: 'Order History',
    elected: 6,
  },
  // {
  //     img:require('../../../assets/LocalImage/image23.png'),
  //     name:'Order Copies'
  // },
  // {
  //     img:require('../../../assets/LocalImage/image22.png'),
  //     name:'Price Chart'
  // },
  // {
  //     img:require('../../../assets/LocalImage/image24.png'),
  //     name:'Legal Support'
  // },
];
