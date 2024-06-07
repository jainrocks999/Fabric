import React, { useState } from "react";
import { View, TextInput, StyleSheet, ScrollView, Text, TouchableOpacity } from "react-native";
import Header from "../../../components/CustomHeader";
import { useNavigation } from "@react-navigation/native";
import { Dropdown } from 'react-native-element-dropdown';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from "../../../assets/colors";
import BackArrow from "../../../assets/Icon/BackArrow.svg";
const Punchorder = () => {
  const navigation = useNavigation()
  const [name,setName]=useState('')


  return (
    <View style={styles.container}>
      <Header
        title={"Stock Check"}
        onPress={() => navigation.openDrawer()}
      />
      <ScrollView>
        <View style={{ paddingHorizontal: 15, marginTop: 10 }}>
        <View style={styles.dropdown}>
              <Dropdown
                style={{
                  height: 22
                }}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={{color:'#000',fontSize:14}}
                search
                data={data}
                inputSearchStyle={{
                  borderRadius: 10,
                  backgroundColor: '#f0f0f0',
                }}
                itemTextStyle={{ color: '#474747' }}
                searchPlaceholder="search.."
                maxHeight={250}
                labelField="label"
                valueField="value"
                placeholder="Enter Stock Name"
                value={name}
                renderItem={(item)=> item.value === name? (
                  
                  <View style={{padding: 17,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor:'grey'
                    }}>
                      <Text style={[styles.selectedTextStyle,{color:'#fff'}]}>{item.label}</Text>
                  </View>
                ):<View style={{padding: 17,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',}}>
                    <Text style={[styles.selectedTextStyle,{color:'#000'}]}>{item.label}</Text>
                </View>}
                onChange={item => {
                 setName(item.value)
                }}
               
              />

            </View>

        </View>
        <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 40 }}>
          <TouchableOpacity 
          onPress={()=>navigation.navigate('StockDetailScreen')}
          style={{ backgroundColor: colors.color1, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8 }}>
            <Text style={{ color: '#FFF', fontFamily: 'Montserrat-SemiBold' }}>Get Details</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={{ position: 'absolute', bottom: 20, left: 20 }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: 44,
            height: 40,
            backgroundColor: colors.color1,
            borderTopLeftRadius: 80,
            borderTopRightRadius: 40,
            borderBottomLeftRadius: 80,
            borderBottomRightRadius: 40
          }}>
          <BackArrow />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  dropdown: {
    marginTop: wp(2), borderWidth: 1, borderColor: '#979998',
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
    fontSize:14,
    elevation: 3,
    justifyContent: 'center'
  },
 

});
export default Punchorder;
const data1 = [
  { label: 'Live', value: 'Live' },
  { label: 'Catalog', value: 'Catalog' },
  { label: 'Live1', value: 'Live1' },
  { label: 'Catalog1', value: 'Catalog1' },
];
const data = [
  { label: 'Lorem Ipsum', value: 'Lorem Ipsum' },
  { label: 'Lorem Ipsum', value: 'Lorem Ipsum' },
  { label: 'Lorem Ipsum', value: 'Lorem Ipsum' },
  { label: 'Lorem Ipsum', value: 'Lorem Ipsum' },
];

