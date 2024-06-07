import React, {Component} from 'react';
import {
  StyleSheet,
  FlatList,
  ScrollView,
  View,
  Image,
  Switch,
  Modal,
  Text,
  SafeAreaView,TouchableHighlight,Platform,TouchableOpacity
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';


class QRCodeScanScreen extends Component {
  // static contextType = NotificationContext;
  static navigationOptions = {
    headerShown: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      torchMode:false
    };
    this.closeHandler = this.closeHandler.bind(this);
    this.addSignaturePressed = this.addSignaturePressed.bind(this);
  }


  torchPressedHandler = () => {
    console.log('this working');
    this.setState(prevState => ({
      torchMode: !prevState.torchMode
    }));
  };

  closeHandler = () =>{
    this.props.closeHandler();
  }

  addSignaturePressed = () =>{
  
  }

  rightSearchPressedHandler = () => {
    alert('rightSearchPressedHandler!')
  };


  onSuccess = e => {
    // this.props.completionHandler(e.data)
  };

  async componentDidMount() {
   
  }
 
  render() {
    const {darkTheme} = this.context;
    return (
      <View style={[styles.mainContainer,darkTheme == true ? styles.darkThemeBackgroundColor:{}]}>
        <View style={[{flex:1}]}>
          <View style={[styles.mainContent,darkTheme == true ? styles.darkThemeBackgroundColor:{}]}>
              <View style={[{flexDirection:'row',alignItems: 'center',padding:16,paddingTop:0,paddingBottom:20,justifyContent:'space-between'}]}>
                
                <View style={[{justifyContent: 'center'}]}>
                <Text style={[styles.filterLabel,Platform.OS === 'ios' ? {paddingTop:6}:{}]}>
                {'QR Code Scan'}
                </Text>
                </View>

                <TouchableOpacity onPress={this.torchPressedHandler}>
                  <Image style={{height:30,width:30}} source={require('../../assets/Icon/torch.png')}/>
                </TouchableOpacity>
               
                <View style={[{justifyContent: 'center',alignItems:'flex-end'}]}>
                  <TouchableHighlight onPress={() => this.closeHandler()}  activeOpacity={0.5}
                    underlayColor={'transparent'}>
                        <Text style={styles.filterLabel}>Cancel</Text>
                  </TouchableHighlight>
                </View>
              </View>
          </View>
          <View style={[{paddingBottom:5,flex:1}]}>
              <QRCodeScanner
                onRead={this.onSuccess}
                flashMode={this.state.torchMode ? RNCamera.Constants.FlashMode.torch:RNCamera.Constants.FlashMode.auto}
                topContent={<></>}
                bottomContent={<></>}
                containerStyle={[{paddingBottom:5,flex:1}]}
              />

              <View style={styles.modelContent}>
                <View style={styles.qrViewContent}>

                </View>
              </View>
             
              </View>
           {/* <View style={{}}>
             
             
            </View> */}
          </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#FFFFFF',
    flex:1,
  },
  mainContent: {
    backgroundColor: '#FFFFFF',
    marginTop:16,
    padding:16,
    paddingTop:0,
    paddingBottom:0
  },
  linearGradient: {
    flex:1
  },
  filterLabel:{
    padding:8,
    fontFamily:'Montserrat-Medium',
    fontSize:12,
    color:'red'
  }, 
  imageCross:{
    height:25,width:25,
    resizeMode:Platform.OS === 'android' ? 'center':'contain',
  },
  blackLabel:{
    fontFamily:'Montserrat-Medium',
    fontSize:10,
    color:'red'
  },
  blueLabel:{
    fontFamily:'Montserrat-Medium',
    fontSize:12,
    color:'red'
  },
  bottomButton:{
    height: 46,
    borderRadius: 23,
    margin:16,
  }, 
  bottomView:{
    backgroundColor:'red',
    position:'relative',
    bottom:0,
    maxHeight:180,
  },
  bottomButtonLabel:{
    fontFamily:'Montserrat-Regular',
    fontSize:14,
    color:'red'
  }, 
  viewInputRemark:{
    flex:1,
    borderWidth:1,
    padding:10,
    borderColor:'red',
    borderRadius:10,
    marginLeft:16,marginRight:16,
    marginBottom:96,
    overflow:'hidden',
    backgroundColor:'red'
  },
  remarkImage:{
    position:'absolute',
    right:12,
    bottom:12,
    height:10,
    width:10,
  },
  signature: {
    flex: 1,
    backgroundColor:'red',
    borderWidth: 1,
    borderRadius:10,
    marginBottom:Platform.OS === 'android' ? 0:20
  },
  modelContent: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    flex: 1,
    width: '100%',
    justifyContent:"center",
    alignItems:'center',
    position:'absolute',
    top:0,bottom:0,left:0,right:0
  },
  qrViewContent:{
    backgroundColor: 'rgba(0, 0, 0, 0)',
    borderColor:'#fff',
    borderWidth:4,
    height:270,
    width:270,
    borderRadius:25
  },
  darkTitleColor:{
    color: 'red'
},
  darkThemeBackgroundColor:{
    backgroundColor: 'red',
  },
  darkThemeColor:{
    color: 'red',
  },
  darkTitleColor1:{
    color: 'red',
  },
  darkThemeContentColor:{
    backgroundColor:'red',
  }
});


export default QRCodeScanScreen;