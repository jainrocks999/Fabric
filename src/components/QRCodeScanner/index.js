import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableHighlight,
  Platform,
  TouchableOpacity,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import storage from '../../utils/storageService';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
// import { NotificationContext } from 'path_to_context'; // Uncomment and update the path to your context

const QRCodeScanScreen = props => {
  const {isFetching, bagdata} = useSelector(state => state);
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
    }
    closeHandler();
  };

  useEffect(() => {
    // ComponentDidMount logic here
  }, []);

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
            containerStyle={{paddingBottom: 5, flex: 1}}
          />

          <View style={styles.modelContent}>
            <View style={styles.qrViewContent}></View>
          </View>
        </View>
      </View>
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
});

export default QRCodeScanScreen;
