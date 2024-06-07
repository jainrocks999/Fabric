import React,{useState} from "react";
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Eye from "../../../assets/Icon/eye.svg"
import Eye1 from "../../../assets/Icon/eye1.svg"
import { useNavigation } from "@react-navigation/native";
import LinearGradient from 'react-native-linear-gradient';
import colors from "../../../assets/colors";

const Login = () => {
  const navigation = useNavigation()
  const [visible,setVisible]=useState(true)
  return (
    <LinearGradient colors={['#FFF', '#FFF8']} style={{ flex: 1 }}>
      <KeyboardAwareScrollView
        style={{ flex: 1, }}
        extraScrollHeight={0}
        enableOnAndroid={true}
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{ flexGrow: 1 }}
      >

        <View style={{ flex: 1 }}>
          <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 70 }}>
            <Image style={{ height: 200, width: '50%', }} source={require('../../../assets/Logo/fabric_logo.png')} />
          </View>
          <View style={{ marginTop: 50, paddingHorizontal: 15 }}>
            <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 15, color: colors.color1 }}>Email Address</Text>
            <View style={{ 
              borderWidth: 1, 
              height: 36, 
              paddingHorizontal: 10, 
              borderRadius: 8, 
              marginTop: 6, 
              fontFamily: 'Montserrat-SemiBold',
              justifyContent:'center'
               }}>
            <TextInput style={{fontSize:14,marginBottom:-2,color:'#000'}}
              placeholder="Email Address"
              keyboardType="email-address"
              // placeholderTextColor={'#000'}
            />
            </View>
            <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 15, color: colors.color1, marginTop: 30 }}>Password</Text>
            <View style={{ 
              borderWidth: 1, 
              height: 36, 
              paddingHorizontal: 10, 
              borderRadius: 8, 
              marginTop: 6, 
              fontFamily: 'Montserrat-SemiBold',
              justifyContent:'space-between',
              flexDirection:'row',
              alignItems:'center'
               }}>
            <TextInput style={{fontSize:14,marginBottom:-2,color:'#000'}}
              placeholder="Password"
              keyboardType="default"
              // placeholderTextColor={'#000'}
              secureTextEntry={visible}
            />
            {visible?
            <TouchableOpacity onPress={()=>setVisible(!visible)} style={{padding:6}}>
            <Eye/>
            </TouchableOpacity>
            :
            <TouchableOpacity onPress={()=>setVisible(!visible)} style={{padding:6}}>
            <Eye1/>
            </TouchableOpacity>
            }
            </View>
          </View>
          <View style={{ marginTop: 40, marginHorizontal: 15 }}>
            <TouchableOpacity activeOpacity={0.6}
              onPress={() => navigation.replace('LandingPage')}
              style={{
                height: 45,
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: colors.color1,
                flexDirection: 'row',
              }}>
              <Text style={{ color: '#FFFFFF', fontSize: 18, fontFamily: 'Montserrat-Bold', marginRight: 14 }}>Login</Text>
              {/* <Arrow /> */}
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
      <View></View>
    </LinearGradient>
    // </View>
  )
}
export default Login;