import React, { useState } from "react";
import { View, Text, FlatList, TextInput, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import Header from "../../../components/CustomHeader";
import { Dropdown } from 'react-native-element-dropdown';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useNavigation } from "@react-navigation/native";
import colors from "../../../assets/colors";
import BackArrow from "../../../assets/Icon/BackArrow.svg";
const Punchorder = () => {
  const navigation = useNavigation()
  const [customer, setCustomer] = useState('')
  const [address, setAddress] = useState('')
  const [remark, setRemark] = useState('')

  return (
    <View style={styles.container}>
      <Header
        title={"Punch Order"}
        onPress={() => navigation.openDrawer()}
      />
      <ScrollView style={{ marginBottom: 0 }}>
        <View style={{ paddingHorizontal: 5, marginBottom: 80 }}>
          <View style={styles.Main}>
            <Text style={styles.inputText}>Customer Name</Text>
            <View style={styles.dropdown}>
              <Dropdown
                style={{
                  height: 22
                }}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={{ color: '#000', fontSize: 14 }}
                search
                data={data1}
                inputSearchStyle={{
                  borderRadius: 10,
                  backgroundColor: '#f0f0f0',
                }}
                itemTextStyle={{ color: '#474747' }}
                searchPlaceholder="search.."
                maxHeight={250}
                labelField="label"
                valueField="value"
                placeholder="Customer Name"
                value={customer}
                renderItem={(item) => item.value === customer ? (

                  <View style={{
                    padding: 17,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: 'grey'
                  }}>
                    <Text style={[styles.selectedTextStyle, { color: '#fff' }]}>{item.label}</Text>
                  </View>
                ) : <View style={{
                  padding: 17,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <Text style={[styles.selectedTextStyle, { color: '#000' }]}>{item.label}</Text>
                </View>}
                onChange={item => {
                  setCustomer(item.value)
                  setAddress(item.address)
                }}

              />

            </View>
          </View>

          <View style={styles.Main}>
            <Text style={styles.inputText}>Address</Text>
            <View>
              <TextInput
                style={styles.dropdown}
                placeholder="Address"
                value={address}
                onChangeText={(val) => setAddress(val)}
              />
            </View>
          </View>


          <View style={styles.Main}>
            <Text style={styles.inputText}>Remark</Text>
            <View>
              <TextInput
                style={styles.dropdown}
                placeholder="Remark"
              />
            </View>
          </View>

          <View style={styles.buttonView}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Punchorder2')}
              style={styles.buttonOpen}
            >
              <Text style={{ color: 'white', fontFamily: 'Montserrat-Bold', fontSize: 15, }}>Proceed</Text>
            </TouchableOpacity>
          </View>
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
  buttonOpen: {
    height: hp(5.3),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    //borderWidth: wp(0.6),
    marginTop: hp(3),
    width: wp(91),
    backgroundColor: colors.color1,
    borderRadius: wp(2)
  },
  buttonView: {
    flexDirection: 'row', justifyContent: 'space-between',
    paddingHorizontal: 13
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    // paddingHorizontal:15
  },
  Main: { marginHorizontal: wp(3), marginTop: wp(3.5) },
  inputText: {
    fontSize: wp(3.5),
    // marginLeft: wp(1),
    fontWeight: '700',
    color: '#000'
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
    fontSize: 14,
    elevation: 3,
    justifyContent: 'center'
  },
  placeholderStyle: {
    fontSize: 15,
    color: '#a0a0a0',

  },
  selectedTextStyle: {
    fontSize: 14,

  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  touch: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 44,
    height: 40,
    backgroundColor: colors.color1,
    borderTopLeftRadius: 80,
    borderTopRightRadius: 40,
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 40
  }
});
export default Punchorder;
const data1 = [
  { label: 'Vivek', value: 'Vivek', address: '184 Mali bag mumbai' },
  { label: 'Virendra', value: 'Virendra', address: '184 Mali bag mumbai' },
  { label: 'Raju Barde', value: 'Raju Barde', address: '184 Mali bag mumbai' },
  { label: 'Tarun', value: 'Tarun', address: '184 Mali bag mumbai' },
];
const data3 = [
  { label: '184 Mali bag mumbai', value: '184 Mali bag mumbai' },
  { label: '184 Mali bag mumbai', value: '184 Mali bag mumbai' },
  { label: '184 Mali bag mumbai', value: '184 Mali bag mumbai' },
  { label: '184 Mali bag mumbai', value: '184 Mali bag mumbai' },
];

const data2 = [
  { label: '200', value: '200' },
  { label: '300', value: '300' },
  { label: '400', value: '400' },
  { label: '500', value: '500' },
];

