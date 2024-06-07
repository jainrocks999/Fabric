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
import QRCodeScanner from "../../../components/QRCodeScanner";
import Modal from "react-native-modal";

const Punchorder = () => {
  const navigation = useNavigation()
  const [visible, setVisible] = useState(false)
  const [inputs, setInputs] = useState({
    CustomerName: '',
    Grade: '',
    Design: '',
    Quality: '',
    Shade: '',
    Color: '',
    Price: '',
    Matchoption: '',
    Cut: '',
    Remark: ''
  })
  const handleInputs = (text, input) => {
    setInputs(prev => ({ ...prev, [text]: input }));
  };

  return (
    <View style={styles.container}>
      <Header
        title={"Punch Order"}
        onPress={() => navigation.goBack()}
        arrow={true}
        scanner={true}
        onPress2={() => setVisible(true)}
      />
      <ScrollView style={{ marginBottom: 0 }}>
        <View style={{ paddingHorizontal: 5, marginBottom: 80 }}>
          <View style={styles.Main}>
            <Text style={styles.inputText}>Design</Text>
            <View style={styles.dropdown}>
              <Dropdown
                style={{
                  height: 22
                }}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={{ color: '#000', fontSize: 14 }}
                search
                data={data2}
                inputSearchStyle={{
                  borderRadius: 10,
                  backgroundColor: '#f0f0f0',
                }}
                itemTextStyle={{ color: '#474747' }}
                searchPlaceholder="search.."
                maxHeight={250}
                labelField="label"
                valueField="value"
                placeholder="Disign"
                value={inputs.Design}
                renderItem={(item) => item.value === inputs.Design ? (

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
                  handleInputs("Design", item.value)
                }}
              />
            </View>
          </View>
          <View style={styles.Main}>
            <Text style={styles.inputText}>Shade</Text>
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
                placeholder="Shade"
                value={inputs.Shade}
                renderItem={(item) => item.value === inputs.Shade ? (

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
                  handleInputs("Shade", item.value)
                }}

              />

            </View>
          </View>
          <View style={styles.Main}>
            <Text style={styles.inputText}>Color</Text>
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
                placeholder="Color"
                value={inputs.Color}
                renderItem={(item) => item.value === inputs.Color ? (

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
                  handleInputs("Color", item.value)
                }}

              />

            </View>
            {/* <View>
              <TextInput
                style={styles.dropdown}
                placeholder="Color"
              />
            </View> */}
          </View>
          <View style={styles.Main}>
            <Text style={styles.inputText}>Cut</Text>
            <View>
              <TextInput
                style={styles.dropdown}
                placeholder="Cut"
              />
            </View>
          </View>

          <View style={styles.Main}>
            <Text style={styles.inputText}>Price</Text>
            <View>
              <TextInput
                style={styles.dropdown}
                // placeholderTextColor='#C7C7CD'
                placeholder="Price"
                keyboardType="number-pad"
              />
            </View>
          </View>
          <View style={styles.Main}>
            <Text style={styles.inputText}>Remark</Text>
            <View>
              <TextInput
                style={styles.dropdown}
                // placeholderTextColor='#C7C7CD'
                placeholder="Remark"
              />
            </View>
          </View>
          <TouchableOpacity style={styles.buttonOpen1}>
            <Text style={{ color: 'white', fontFamily: 'Montserrat-Bold', fontSize: 15, }}>Add Item</Text>
          </TouchableOpacity>
          <View style={styles.buttonView}>
            <TouchableOpacity style={styles.buttonOpen}>
              <Text style={{ color: 'white', fontFamily: 'Montserrat-Bold', fontSize: 15, }}>Punch Order</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonOpen}
              onPress={() => navigation.navigate('PunchorderList')}
            >
              <Text style={{ color: 'white', fontFamily: 'Montserrat-Bold', fontSize: 15, }}>View Order</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={visible}
          style={{
            width: '100%',
            alignSelf: 'center',
            marginHorizontal: 50,
            margin: 0
          }}
          onRequestClose={() => { }}>
          <View style={{
            //   flex: 1,
            backgroundColor: '#D6E1EC50',
            height: '100%'
          }}>
            <View style={{ flex: 1 }}>
              <QRCodeScanner
                // completionHandler={this.completionQRViewHandler} 
                closeHandler={() => setVisible(false)}
              />
            </View>

          </View>
        </Modal>
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
    marginTop: hp(3),
    width: wp(42),
    backgroundColor: colors.color1,
    borderRadius: wp(2)
  },
  buttonOpen1: {
    height: hp(5.3),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
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
});
export default Punchorder;
const data1 = [
  { label: 'Lorem Ipsum', value: 'Lorem Ipsum' },
  { label: 'Lorem Ipsum', value: 'Lorem Ipsum' },
  { label: 'Lorem Ipsum', value: 'Lorem Ipsum' },
  { label: 'Lorem Ipsum', value: 'Lorem Ipsum' },
];
const data3 = [
  { label: '184 Mali bag mumbai', value: '184 Mali bag mumbai' },
  { label: '184 Mali bag mumbai', value: '184 Mali bag mumbai' },
  { label: '184 Mali bag mumbai', value: '184 Mali bag mumbai' },
  { label: '184 Mali bag mumbai', value: '184 Mali bag mumbai' },
];

const data2 = [
  { label: 'Lorem Ipsum', value: 'Lorem Ipsum' },
  { label: 'Lorem Ipsum', value: 'Lorem Ipsum' },
  { label: 'Lorem Ipsum', value: 'Lorem Ipsum' },
  { label: 'Lorem Ipsum', value: 'Lorem Ipsum' },
];

