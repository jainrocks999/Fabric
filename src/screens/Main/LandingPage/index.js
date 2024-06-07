import React from "react";
import { View, Text, StyleSheet,TouchableOpacity } from "react-native";
import Header from "../../../components/CustomHeader";
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation } from "@react-navigation/native";
import colors from "../../../assets/colors";

const LandingPage = () => {
    const navigation=useNavigation()

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={{ height: 45, backgroundColor: colors.color1, width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 16, color: '#FFF', fontFamily: 'Montserrat-Bold' }}>LandingPage</Text>
            </View>
            <View style={{ alignItems: 'center', marginTop: 10 }}>
                <Text style={{ fontFamily: 'Montserrat-SemiBold', color: '#000', fontSize: 16 }}>Please select company name</Text>
            </View>
            <View style={{
                borderWidth: 1,
                height: 40,
                borderRadius: 6,
                paddingHorizontal: 10,
                borderColor: '#000',
                justifyContent: 'center',
                margin:20
            }}>
                <RNPickerSelect
                    onValueChange={(value) => console.log('hhihih',value)}
                    items={[
                        { label: 'A', value: 'A' },
                        { label: 'B', value: 'B' },
                        { label: 'C', value: 'C' },
                    ]}
                    value={'dfg'}
                    useNativeAndroidPickerStyle={false}
                    placeholder={{label:'Please select',value:'Please select'}}
                    style={{
                        inputAndroid: {
                            color: '#000',
                            fontSize: 14,
                        },
                        inputIOS: { color: '#000' },
                        placeholder: {
                            color: '#a0a0a0',
                            fontSize: 13,
                            marginTop: 2,
                            fontFamily: 'Montserrat-Medium',
                        },
                    }}
                />
            </View>
            <View style={{alignItems:'center',justifyContent:'center'}}>
                <TouchableOpacity 
                 onPress={() => navigation.replace('Test')}
                style={{backgroundColor:colors.color1,paddingHorizontal:20,paddingVertical:10,borderRadius:6}}>
                    <Text style={{color:'#fff',fontSize:14,fontFamily:'Montserrat-SemiBold'}}>Proceed</Text>
                </TouchableOpacity>
            </View>
        </View>
    )

}
export default LandingPage;