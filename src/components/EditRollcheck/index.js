import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import colors from '../../assets/colors';

const EditRoll = ({visible, data, dataList, onComplete, addRole}) => {
  const newdata = data;
  const [qty, setQty] = useState('');
  useEffect(() => {
    // setQty(newdata.qty ?? '');
  }, [data]);
  const complete = async () => {
    if (qty !== '') {
      setQty('');
      onComplete({...newdata, qty: qty});
    } else {
      ToastAndroid.show('Please Enter Quanity', ToastAndroid.SHORT);
    }
  };

  return (
    <Modal animationType="fade" transparent visible={visible}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0,0,0,0.8)',
        }}>
        <ScrollView>
          <View
            style={{
              backgroundColor: 'white',
              width: wp(100),
              height: hp(70),
              elevation: 5,
              shadowColor: '#fff',
              borderRadius: 8,
              paddingHorizontal: 20,
              marginTop: '30%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                setQty('');
                onComplete(false);
              }}
              style={{
                position: 'absolute',
                top: '1%',
                right: '3%',
                padding: '3%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: 14,
                  color: colors.color1,
                  fontFamily: 'Montserrat-Bold',
                  alignSelf: 'center',
                }}>
                Cancel
              </Text>
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 16,
                color: colors.color1,
                fontFamily: 'Montserrat-Bold',
                alignSelf: 'center',
              }}>
              {addRole ? 'Add Roll' : 'Update Roll'}
            </Text>
            <View style={{height: '5%'}} />
            <View style={{width: '100%'}}>
              <Text style={styles.inputText}>Customer Name</Text>
              <TextInput
                style={styles.dropdown}
                editable={false}
                value={data?.Party}
                // placeholderTextColor='#C7C7CD'
                onChangeText={value => {}}
                placeholder="Remark"
              />
              <View style={{height: '4%'}} />
              <Text style={styles.inputText}>Design</Text>
              <TextInput
                style={styles.dropdown}
                editable={false}
                value={data?.DESIGN}
                // placeholderTextColor='#C7C7CD'
                onChangeText={value => {}}
                placeholder="Remark"
              />

              <View style={{height: '4%'}} />
              <Text style={styles.inputText}>Shade</Text>
              <TextInput
                style={styles.dropdown}
                editable={false}
                value={data?.SHADE}
                // placeholderTextColor='#C7C7CD'
                onChangeText={value => {}}
                placeholder="Remark"
              />
              {/* <View style={styles.dropdown}>
                  <Dropdown
                    style={{
                      height: 22,
                    }}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={{color: '#000', fontSize: 14}}
                    search
                    data={colorshadeList}
                    inputSearchStyle={{
                      borderRadius: 10,
                      backgroundColor: '#f0f0f0',
                    }}
                    itemTextStyle={{color: '#474747'}}
                    searchPlaceholder="search.."
                    maxHeight={250}
                    labelField="shade"
                    valueField="shadeid"
                    placeholder="Shade"
                    value={shade}
                    renderItem={item =>
                      item.shadeid === shade?.shadeid ? (
                        <View
                          style={{
                            padding: 17,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            backgroundColor: 'grey',
                          }}>
                          <Text
                            style={[styles.selectedTextStyle, {color: '#fff'}]}>
                            {item.shade}
                          </Text>
                        </View>
                      ) : (
                        <View
                          style={{
                            padding: 17,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={[styles.selectedTextStyle, {color: '#000'}]}>
                            {item.shade}
                          </Text>
                        </View>
                      )
                    }
                    onChange={item => {
                      setShade(item);
                    }}
                  />
                </View> */}

              {/* <View style={{marginTop: '4%'}}>
                <Text style={styles.inputText}>Color</Text>
                <View style={styles.dropdown}>
                  <Dropdown
                    style={{
                      height: 22,
                    }}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={{color: '#000', fontSize: 14}}
                    search
                    data={colorshadeList}
                    inputSearchStyle={{
                      borderRadius: 10,
                      backgroundColor: '#f0f0f0',
                    }}
                    itemTextStyle={{color: '#474747'}}
                    searchPlaceholder="search.."
                    maxHeight={250}
                    labelField="color"
                    valueField="colorid"
                    placeholder="Color"
                    value={color}
                    renderItem={item =>
                      item.colorid === color?.colorid ? (
                        <View
                          style={{
                            padding: 17,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            backgroundColor: 'grey',
                          }}>
                          <Text
                            style={[styles.selectedTextStyle, {color: '#fff'}]}>
                            {item.color}
                          </Text>
                        </View>
                      ) : (
                        <View
                          style={{
                            padding: 17,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={[styles.selectedTextStyle, {color: '#000'}]}>
                            {item.color}
                          </Text>
                        </View>
                      )
                    }
                    onChange={item => {
                      setColor(item);
                    }}
                  />
                </View>
              </View> */}

              {/* <View style={{height: '4%'}} />
              <Text style={styles.inputText}>Price</Text>
              <TextInput
                style={styles.dropdown}
                editable={false}
                value={data?.rate}
                // placeholderTextColor='#C7C7CD'
                onChangeText={value => {}}
                placeholder="Remark"
              /> */}

              <View style={{height: '4%'}} />
              <Text style={styles.inputText}>
                Qty <Text style={{color: 'red'}}>*</Text>
              </Text>
              <TextInput
                style={styles.dropdown}
                editable={true}
                value={qty}
                // placeholderTextColor='#C7C7CD'
                onChangeText={value => {
                  setQty(value);
                }}
                placeholder="Quantity"
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                complete();
              }}
              style={{
                height: hp(5.3),
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                width: wp(88),
                backgroundColor: colors.color1,
                borderRadius: wp(2),
                marginTop: '8%',
              }}>
              <Text
                style={{
                  fontFamily: 'Montserrat-Bold',
                  color: '#fff',
                  fontSize: 15,
                }}>
                Complete
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default EditRoll;

const styles = StyleSheet.create({
  dropdown: {
    marginTop: wp(2),
    borderWidth: 1,
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
    justifyContent: 'center',
  },
  inputText: {
    fontSize: wp(3.5),
    fontWeight: '700',
    color: 'black',
  },
  placeholderStyle: {
    fontSize: 15,
    color: '#a0a0a0',
  },
  selectedTextStyle: {
    fontSize: 14,
  },
});
