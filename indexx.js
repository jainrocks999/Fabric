import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import data from './data';

const Datas = () => {
  const newdata = data.filter((item, index) => {
    return item.key.includes(`feature_${index + 1}`);
  });
  console.log(newdata);
  return (
    <View
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}></View>
  );
};

export default Datas;

const styles = StyleSheet.create({});
