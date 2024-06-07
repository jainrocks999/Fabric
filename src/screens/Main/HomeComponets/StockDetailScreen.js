import React from "react";
import { View,Text, } from "react-native";
import Header from "../../../components/CustomHeader";
import { useNavigation } from "@react-navigation/native";

const StockDetailScreen=()=>{
    const navigation=useNavigation()
    return(
        <View style={{flex:1}}>
          <Header
          title={'Stock Details'}
          onPress={()=>navigation.goBack()}
          arrow={true}
          />
          <View style={{paddingHorizontal:20}}>
            <View style={{flexDirection:'row',marginTop:5}}>
                <Text style={{fontSize:15,color:'#000',fontFamily:'Montserrat-SemiBold'}}>{'Name : '}</Text>
                <Text style={{fontSize:15,color:'#000',fontFamily:'Montserrat-Medium'}}>{'Lorem Ipsum'}</Text>
            </View>
            <View style={{flexDirection:'row',marginTop:5}}>
                <Text style={{fontSize:15,color:'#000',fontFamily:'Montserrat-SemiBold'}}>{'Customer Name : '}</Text>
                <Text style={{fontSize:15,color:'#000',fontFamily:'Montserrat-Medium'}}>{'Lorem Ipsum'}</Text>
            </View>
            <View style={{flexDirection:'row',marginTop:5}}>
                <Text style={{fontSize:15,color:'#000',fontFamily:'Montserrat-SemiBold'}}>{'Design : '}</Text>
                <Text style={{fontSize:15,color:'#000',fontFamily:'Montserrat-Medium'}}>{'Lorem Ipsum'}</Text>
            </View>
            <View style={{flexDirection:'row',marginTop:5}}>
                <Text style={{fontSize:15,color:'#000',fontFamily:'Montserrat-SemiBold'}}>{'Shade : '}</Text>
                <Text style={{fontSize:15,color:'#000',fontFamily:'Montserrat-Medium'}}>{'Lorem Ipsum'}</Text>
            </View>
            <View style={{flexDirection:'row',marginTop:5}}>
                <Text style={{fontSize:15,color:'#000',fontFamily:'Montserrat-SemiBold'}}>{'Color : '}</Text>
                <Text style={{fontSize:15,color:'#000',fontFamily:'Montserrat-Medium'}}>{'Lorem Ipsum'}</Text>
            </View>
            <View style={{flexDirection:'row',marginTop:5}}>
                <Text style={{fontSize:15,color:'#000',fontFamily:'Montserrat-SemiBold'}}>{'Cut : '}</Text>
                <Text style={{fontSize:15,color:'#000',fontFamily:'Montserrat-Medium'}}>{'Lorem Ipsum'}</Text>
            </View>
            <View style={{flexDirection:'row',marginTop:5}}>
                <Text style={{fontSize:15,color:'#000',fontFamily:'Montserrat-SemiBold'}}>{'Price : '}</Text>
                <Text style={{fontSize:15,color:'#000',fontFamily:'Montserrat-Medium'}}>{'100'}</Text>
            </View><View style={{flexDirection:'row',marginTop:5}}>
                <Text style={{fontSize:15,color:'#000',fontFamily:'Montserrat-SemiBold'}}>{'Remark : '}</Text>
                <Text style={{fontSize:15,color:'#000',fontFamily:'Montserrat-Medium'}}>{'Lorem Ipsum'}</Text>
            </View>
            <View style={{marginTop:5}}>
                <Text style={{fontSize:15,color:'#000',fontFamily:'Montserrat-SemiBold'}}>{'Description : '}</Text>
                <Text style={{fontSize:15,color:'#000',fontFamily:'Montserrat-Regular'}}>{'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum'}</Text>
            </View>
            
          </View>
        </View>
    )
}
export default StockDetailScreen;