import React from "react";
import { View,Text,TouchableOpacity } from "react-native";
import HeaderArrow from "../../../assets/Icon/HeaderArrow.svg";
import ChatLogo from "../../../assets/Icon/ChatLogo.svg";
import { useNavigation } from "@react-navigation/native";

const ZBWGroup=()=>{
    const navigation=useNavigation()
    return(
        <View style={{flex:1}}>
            <View style={{height:45,backgroundColor:'#000000',width:'100%',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
            <TouchableOpacity
            activeOpacity={0.5} 
            onPress={()=>navigation.goBack()}
            style={{width:60,height:45,alignItems:'center',justifyContent:'center'}}
            >
              <HeaderArrow/>
            </TouchableOpacity>
            <View style={{flexDirection:'row',alignItems:'center'}}>
             <ChatLogo/>
            <Text style={{fontSize:16,color:'#FCDA64',fontFamily:'Montserrat-Bold',marginLeft:15}}>{'ZBW GROUP'}</Text>
            </View>
            <TouchableOpacity
            activeOpacity={0.5}
            style={{width:60,height:45,alignItems:'center',justifyContent:'center'}}

            >
            </TouchableOpacity>
        </View>
        </View>
    )
}
export default ZBWGroup;