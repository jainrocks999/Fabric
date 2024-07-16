import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableHighlight,
  Platform,
  TouchableOpacity,
  Modal,
  ToastAndroid,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import storage from '../../utils/storageService';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import colors from '../../assets/colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
// import { NotificationContext } from 'path_to_context'; // Uncomment and update the path to your context

const QRCodeScanScreen = props => {
  const {isFetching, bagdata} = useSelector(state => state);
  const [input, setInput] = useState('');
  const [torchMode, setTorchMode] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  // const { darkTheme } = useContext(NotificationContext); // Uncomment and use if you have a context
  const darkTheme = false; // Remove this line if you use the context

  const torchPressedHandler = () => {
    console.log('this working');
    setTorchMode(prevTorchMode => !prevTorchMode);
  };

  const closeHandler = () => {
    props.closeHandler();
  };

  const onSuccess = async e => {
    const token = await storage.getItem(storage.TOKEN);
    const endpoint = `barcode/${e.data}`;
    const has =
      Array.isArray(bagdata) &&
      bagdata.some(item => {
        return item.barcode == e.data;
      });
    if (!has) {
      dispatch({
        type: 'bag_check_request',
        endpoint,
        token,
        navigation,
        bagdata,
      });
    } else {
      ToastAndroid.show('Data is Already Available', ToastAndroid.SHORT);
    }
    closeHandler();
  };

  useEffect(() => {
    // ComponentDidMount logic here
  }, []);
  const bottomContent = () => {};
  return (
    <View
      style={[
        styles.mainContainer,
        darkTheme ? styles.darkThemeBackgroundColor : {},
      ]}>
      <View style={{flex: 1}}>
        <View
          style={[
            styles.mainContent,
            darkTheme ? styles.darkThemeBackgroundColor : {},
          ]}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 16,
              paddingTop: 0,
              paddingBottom: 20,
              justifyContent: 'space-between',
            }}>
            <View style={{justifyContent: 'center'}}>
              <Text
                style={[
                  styles.filterLabel,
                  Platform.OS === 'ios' ? {paddingTop: 6} : {},
                ]}>
                {'QR Code Scan'}
              </Text>
            </View>

            <TouchableOpacity onPress={torchPressedHandler}>
              <Image
                style={{height: 30, width: 30}}
                source={require('../../assets/Icon/torch.png')}
              />
            </TouchableOpacity>

            <View style={{justifyContent: 'center', alignItems: 'flex-end'}}>
              <TouchableHighlight
                onPress={closeHandler}
                activeOpacity={0.5}
                underlayColor={'transparent'}>
                <Text style={styles.filterLabel}>Cancel</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
        <View style={{paddingBottom: 5, flex: 1}}>
          <QRCodeScanner
            onRead={e => {
              if (props.page != 'rolecheck') {
                onSuccess(e);
              } else {
                props.onScann(e);
              }
            }}
            flashMode={
              torchMode
                ? RNCamera.Constants.FlashMode.torch
                : RNCamera.Constants.FlashMode.auto
            }
            topContent={<></>}
            bottomContent={<></>}
            containerStyle={{flex: 1}}
          />

          <View
            style={{
              height: '13%',
              width: '100%',
              backgroundColor: 'grey',
              alignItems: 'center',
              position: 'absolute',
              bottom: '2%',
              zIndex: 1,
            }}>
            <Text
              style={{
                fontFamily: 'Montserrat-Medium',
                fontSize: 15,
                marginTop: '2%',
              }}>
              OR
            </Text>
            <View style={{height: '20%'}} />
            <TouchableOpacity
              onPress={() => {
                props.setMenuVisible(true);
              }}
              style={{
                backgroundColor: colors.color1,
                height: hp(5),
                width: '60%',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 5,
                zIndex: 50,
              }}>
              <Text
                style={{
                  fontFamily: 'Montserrat-Medium',
                  fontSize: 12,
                  color: '#fff',
                }}>
                Enter Barcode Number
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.modelContent}>
            <View style={styles.qrViewContent}></View>
          </View>
        </View>
      </View>
      <Modal visible={props.manuvisble} transparent={true}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.8)',
          }}>
          <View
            style={{
              backgroundColor: 'white',
              width: wp(100),
              height: hp(30),
              elevation: 5,
              shadowColor: '#fff',
              borderRadius: 8,
              paddingHorizontal: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              onPress={() => props.setMenuVisible(false)}
              style={{
                position: 'absolute',
                top: '1%',
                right: '3%',
                padding: '3%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: 14,
                  color: colors.color1,
                  fontFamily: 'Montserrat-Bold',
                  alignSelf: 'center',
                }}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TextInput
              style={styles.dropdown}
              keyboardType="number-pad"
              // placeholderTextColor='#C7C7CD'
              onChangeText={value => {
                setInput(value);
              }}
              placeholder="Barcode Number"
            />
            <TouchableOpacity
              onPress={() => {
                if (input !== '') {
                  if (props.page != 'rolecheck') {
                    onSuccess({data: input});
                  } else {
                    props.onScann({data: input});
                  }
                } else {
                  ToastAndroid.show(
                    'Please Enter Barcode NUmber',
                    ToastAndroid.SHORT,
                  );
                }
                // setVisible(false);
              }}
              style={[
                styles.dropdown,
                {
                  backgroundColor: colors.color1,
                  marginTop: '8%',
                  width: '40%',
                  alignItems: 'center',
                },
              ]}>
              <Text
                style={{
                  fontFamily: 'Montserrat-Medium',
                  fontSize: 15,
                  color: '#fff',
                }}>
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  mainContent: {
    backgroundColor: '#FFFFFF',
    marginTop: 16,
    padding: 16,
    paddingTop: 0,
    paddingBottom: 0,
  },
  linearGradient: {
    flex: 1,
  },
  filterLabel: {
    padding: 8,
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    color: 'red',
  },
  imageCross: {
    height: 25,
    width: 25,
    resizeMode: Platform.OS === 'android' ? 'center' : 'contain',
  },
  blackLabel: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 10,
    color: 'red',
  },
  blueLabel: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    color: 'red',
  },
  bottomButton: {
    height: 46,
    borderRadius: 23,
    margin: 16,
  },
  bottomView: {
    backgroundColor: 'red',
    position: 'relative',
    bottom: 0,
    maxHeight: 180,
  },
  bottomButtonLabel: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: 'red',
  },
  viewInputRemark: {
    flex: 1,
    borderWidth: 1,
    padding: 10,
    borderColor: 'red',
    borderRadius: 10,
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 96,
    overflow: 'hidden',
    backgroundColor: 'red',
  },
  remarkImage: {
    position: 'absolute',
    right: 12,
    bottom: 12,
    height: 10,
    width: 10,
  },
  signature: {
    flex: 1,
    backgroundColor: 'red',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: Platform.OS === 'android' ? 0 : 20,
  },
  modelContent: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  qrViewContent: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    borderColor: '#fff',
    borderWidth: 4,
    height: 270,
    width: 270,
    borderRadius: 25,
  },
  darkTitleColor: {
    color: 'red',
  },
  darkThemeBackgroundColor: {
    backgroundColor: 'red',
  },
  darkThemeColor: {
    color: 'red',
  },
  darkTitleColor1: {
    color: 'red',
  },
  darkThemeContentColor: {
    backgroundColor: 'red',
  },
  dropdown: {
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
    justifyContent: 'center',
    width: '100%',
  },
  inputText: {
    fontSize: wp(3.5),
    fontWeight: '700',
    color: 'black',
  },
});

export default QRCodeScanScreen;
