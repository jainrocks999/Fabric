import React from "react";
import { View,Text,TouchableOpacity ,Image} from "react-native";
import HeaderArrow from "../../assets/Icon/HeaderArrow.svg";
import Menu from "../../assets/Icon/Menu1.svg";
import colors from "../../assets/colors";

const CustomHeader=({title,onPress,source,arrow,scanner,onPress2})=>{
    return(
        <View style={{height:45,backgroundColor:colors.color1,width:'100%',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
            <TouchableOpacity
            activeOpacity={0.5} 
            onPress={onPress}
            style={{width:60,height:45,alignItems:'center',justifyContent:'center'}}
            >
              {arrow?<HeaderArrow/>:<Menu/>}
            </TouchableOpacity>
            <Text style={{fontSize:16,color:'#FFF',fontFamily:'Montserrat-Bold'}}>{title}</Text>
            <TouchableOpacity
            activeOpacity={0.5}
            style={{width:60,height:45,alignItems:'center',justifyContent:'center'}}
            onPress={onPress2}
            >
               
               {scanner? <Image style={{height:25,width:25,tintColor:'#fff'}} source={require('../../assets/Icon/qrcode2.png')}/>
           :null }
            </TouchableOpacity>
        </View>
    )
}
export default CustomHeader;