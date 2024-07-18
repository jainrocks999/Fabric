import React, {useEffect} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';




const Splash = () => {
  const navigation = useNavigation();

  useEffect(() => {
    initial();
  }, []);

  const initial = async () => {
    
    let Token = await AsyncStorage.getItem('token');
    console.log('hjnhjdndnd',Token);
    if (!Token) {
      setTimeout(() =>
       navigation.replace('Login'),2000);
    } else {
       setTimeout(() => navigation.replace('Home'), 2000);
    }
  };
  return (
    // <View style={styles.container}>
      <LinearGradient colors={[ '#FFF', '#FFF8']} style={{
            flex: 1,
           alignItems:'center',
           justifyContent:'center'       
      }}>

       
        <Image style={{width:'70%',height:'30%'}} source={require('../../../assets/Logo/fabric_logo.png')}/>
        
        </LinearGradient>
    // </View>
  );
};
export default Splash;
