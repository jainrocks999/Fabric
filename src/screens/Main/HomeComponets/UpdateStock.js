import React, { useState } from "react";
import { View, Text, FlatList, TextInput, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
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


  return (
    <View style={styles.container}>
      <Header
        title={"Update Stock"}
        onPress={() => navigation.openDrawer()}
      />
      <View style={{ paddingTop: 10 }}>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <View style={{
              elevation: 4,
              backgroundColor: '#fff',
              shadowColor: '#000',
              shadowOffset: { height: 0, width: 2 },
              marginHorizontal: 20,
              padding: 10,
              marginTop: 6,

              marginBottom: 6,
              borderRadius: 6

            }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 14, color: item.availble <= 1 ? "#a0a0a0" : '#000', fontFamily: 'Montserrat-SemiBold' }}>{`Name : ${item.label}`}</Text>
                <Text style={{ fontSize: 12, color: item.availble <= 1 ? "#a0a0a0" : '#000', fontFamily: 'Montserrat-Medium' }}>{`Available Stock : ${item.availble}`}</Text>
              </View>
              <Text style={{ fontSize: 13, marginTop: 5, color: item.availble <= 1 ? "#a0a0a0" : '#000', fontFamily: 'Montserrat-Medium' }}>{item.description}</Text>
              {item.availble <= 1 ?
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ color: 'red', fontFamily: 'Montserrat-SemiBold', fontSize: 15, marginTop: 10 }}>{'REMOVE'}</Text>
                </View>
                : null}
            </View>
          )}
        />

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


export default Punchorder;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

});
const data = [
  { label: 'Shirt', availble: '1', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
  { label: 'Shirt', availble: '124', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
  { label: 'Shirt', availble: '20', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
];

