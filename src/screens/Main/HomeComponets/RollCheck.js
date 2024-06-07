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
import Modal from "react-native-modal";
import QRCodeScanner from "../../../components/QRCodeScanner";
import BackArrow from "../../../assets/Icon/BackArrow.svg";
const Punchorder = () => {
  const navigation = useNavigation()
  const [visible, setVisibles] = useState(false)


  return (
    <View style={styles.container}>
      <Header
        title={"Roll Check"}
        onPress={() => navigation.openDrawer()}
      />
      <View style={{ padding: 10 }}>
        <View style={{}}>
          <TextInput
          placeholder="Search"
          style={{ marginTop: wp(2), borderWidth: 1,
          borderColor: '#979998',
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
          justifyContent: 'center'}}
          />

        </View>
        <FlatList
          data={data}
          style={{marginTop:20}}
          renderItem={({ item }) => (
            <View style={{ borderWidth: 1, marginBottom: 15, padding: 6, borderRadius: 6 ,borderColor:'#979998'}}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ fontSize: 14, color: '#000', fontFamily: 'Montserrat-SemiBold' }}>{'Product Name : '}</Text>
                  <Text style={{ fontSize: 13, color: '#000', fontFamily: 'Montserrat-Regular' }}>{item.name}</Text>
                </View>
                <TouchableOpacity onPress={() => setVisibles(true)}>
                  <Image style={{ width: 20, height: 20 }} source={require('../../../assets/Icon/qrcode2.png')} />
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 14, color: '#000', fontFamily: 'Montserrat-SemiBold' }}>{'Price : '}</Text>
                <Text style={{ fontSize: 13, color: '#000', fontFamily: 'Montserrat-Regular' }}>{item.price}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 14, color: '#000', fontFamily: 'Montserrat-SemiBold' }}>{'Color : '}</Text>
                <Text style={{ fontSize: 13, color: '#000', fontFamily: 'Montserrat-Regular' }}>{item.color}</Text>
              </View>
            </View>
          )}
        />

      </View>
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
                closeHandler={() => setVisibles(false)}
              />
            </View>

          </View>
        </Modal>
      </View>
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

});
export default Punchorder;
const data1 = [
  { label: 'Live', value: 'Live' },
  { label: 'Catalog', value: 'Catalog' },
  { label: 'Live1', value: 'Live1' },
  { label: 'Catalog1', value: 'Catalog1' },
];
const data = [
  { name: 'Shirt', price: '300', color: 'red' },
  { name: 'Shirt', price: '300', color: 'red' },
  { name: 'Shirt', price: '300', color: 'red' },
  { name: 'Shirt', price: '300', color: 'red' },
  { name: 'Shirt', price: '300', color: 'red' }
]

