import React, {memo} from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const SelectModal = ({visible, search, setSearch, data, onSelect, onClose}) => {
  return (
    <Modal visible={visible} transparent={true}>
      <TouchableOpacity
        onPress={() => {
          onClose(false);
        }}
        activeOpacity={1}
        style={{
          backgroundColor: 'rgba(0,0,0,0.5)',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TouchableWithoutFeedback>
          <View
            style={{
              backgroundColor: '#fff',
              height: hp(40),
              width: wp(90),
              marginHorizontal: '5%',
              elevation: 5,
              shadowColor: '#fff',
              borderRadius: 5,
            }}>
            <View style={{height: '3%'}} />
            <Text
              style={{
                color: 'grey',
                textAlign: 'center',
                fontSize: 15,
                fontFamily: 'Montserrat-Bold',
              }}>
              Select Company
            </Text>
            <View style={{height: '5%'}} />
            <TextInput
              placeholder="Search"
              value={search}
              onChangeText={value => setSearch(value)}
              style={{
                marginHorizontal: '5%',
                borderWidth: 1,
                height: hp(5.5),
                paddingLeft: '5%',
                borderColor: 'grey',
                borderRadius: 7,
              }}
            />
            <View style={{height: '5%'}} />
            <View style={{height: '60%', paddingLeft: '8%'}}>
              <FlatList
                data={data}
                keyExtractor={item => item.value.toString()}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() => {
                      onSelect(item);
                    }}
                    style={{marginVertical: '5%'}}>
                    <Text
                      style={{
                        color: 'black',
                        fontSize: 15,
                        fontWeight: '400',
                      }}>
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
};

export default memo(SelectModal);
