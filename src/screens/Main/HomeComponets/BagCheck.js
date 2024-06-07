import React, { useState } from "react";
import { View, Text, FlatList, TextInput, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import Header from "../../../components/CustomHeader";
import { Dropdown } from 'react-native-element-dropdown';
import DatePicker from 'react-native-date-picker'
import Modal from "react-native-modal";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from "../../../assets/colors";
import { useNavigation } from "@react-navigation/native";
import Calendar from "../../../assets/Icon/Calendar.svg";
import QRCodeScanner from "../../../components/QRCodeScanner";
import BackArrow from "../../../assets/Icon/BackArrow.svg";


const Punchorder = () => {
  const navigation = useNavigation()
  const [name, setName] = useState('')
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const [dob, setDob] = useState('')
  const [visible, setVisibles] = useState(false)
  const [modal, setModal] = useState(false)

  return (
    <View style={styles.container}>
      <Header
        title={"Bag Check"}
        onPress={() => navigation.openDrawer()}
      />
      <View style={{ padding: 10 }}>
        <View style={styles.Main}>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between',alignItems:'center' }}>
            <Text style={styles.inputText}>Name</Text>
            <TouchableOpacity
             style={{backgroundColor:colors.color1,paddingHorizontal:10,paddingVertical:4,borderRadius:6}}
             onPress={() => setModal(true)}>
              <Text style={{color:'#fff',fontSize:12,fontFamily:'Montserrat-SemiBold'}}> + Start New List</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.dropdown}>
            <Dropdown
              style={{
                height: 22
              }}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={{ color: '#000', fontSize: 14 }}
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
              placeholder="Name"
              value={name}
              renderItem={(item) => item.value === name ? (

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
                setName(item.value)
              }}

            />

          </View>
        </View>
        <View style={styles.Main}>
          <Text style={styles.inputText}>Date</Text>

          <TouchableOpacity
            onPress={() => setOpen(true)}
            style={{
              marginTop: wp(2), borderWidth: 1, borderColor: '#979998',
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

              elevation: 3,
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center'
            }}>
            <Text>{dob}</Text>
            <Calendar />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => setVisibles(true)}
          style={{
            height: hp(5.3),
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: hp(3),
            width: wp(91),
            backgroundColor: colors.color1,
            borderRadius: wp(2)
          }}>
          <Text style={{ fontFamily: 'Montserrat-Bold', color: '#fff', fontSize: 15 }}>Start List</Text>
        </TouchableOpacity>
      </View>
      <DatePicker
        modal
        open={open}
        date={date}
        mode={'date'}
        maximumDate={date}
        onConfirm={(date) => {
          setOpen(false)
          // setDate(date)
          var d = date
          month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

          if (month.length < 2)
            month = '0' + month;
          if (day.length < 2)
            day = '0' + day;

          var finalDate = [month, day, year].join('/');
          setDob(finalDate)

        }}
        onCancel={() => {
          setOpen(false)
        }}
      />

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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        style={{
          width: '100%',
          alignSelf: 'center',
          // justifyContent:'flex-start',
          marginHorizontal: 50,
          margin: 0
        }}
        onRequestClose={() => { }}>
        <View style={{
          backgroundColor: '#fff',
          height: '100%',
         
          paddingHorizontal:15
        }}>
          <View style={{ flex: 1 }}>
            <View style={{alignItems:'flex-end',paddingVertical:15}}>
              <TouchableOpacity
               onPress={() => setModal(false)}
               style={{
                backgroundColor:colors.color1,
                paddingHorizontal:10,
                paddingVertical:4,
                borderRadius:6
                }}>
                 <Text style={{fontSize:12,color:'#fff',fontFamily:'Montserrat-SemiBold'}}>CLOSE</Text>
              </TouchableOpacity>
            </View>
           
            <View style={styles.dropdown}>
              <Dropdown
                style={{
                  height: 22
                }}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={{ color: '#000', fontSize: 14 }}
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
                placeholder="Name"
                value={name}
                renderItem={(item) => item.value === name ? (

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
                  setName(item.value)
                }}

              />

            </View>
            <View style={{marginTop:10}}>
          <Text style={styles.inputText}>Date</Text>

          <TouchableOpacity
            onPress={() => setOpen(true)}
            style={{
              marginTop: wp(2), borderWidth: 1, borderColor: '#979998',
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

              elevation: 3,
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center'
            }}>
            <Text>{dob}</Text>
            <Calendar />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            setModal(false)
            setVisibles(true)
          }}
          style={{
            height: hp(5.3),
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: hp(3),
            width: wp(91),
            backgroundColor: colors.color1,
            borderRadius: wp(2)
          }}>
          <Text style={{ fontFamily: 'Montserrat-Bold', color: '#fff', fontSize: 15 }}>Start List</Text>
        </TouchableOpacity>
          </View>
          
        </View>
      </Modal>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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

});
export default Punchorder;
const data = [
  { label: 'Lorem Ipsum', value: 'Lorem Ipsum' },
  { label: 'Lorem Ipsum', value: 'Lorem Ipsum' },
  { label: 'Lorem Ipsum', value: 'Lorem Ipsum' },
  { label: 'Lorem Ipsum', value: 'Lorem Ipsum' },
];

