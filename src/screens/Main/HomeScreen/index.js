import React, { useState,useEffect } from "react";
import { View, Text, Dimensions, FlatList, Image, ScrollView, TouchableOpacity, StatusBar,BackHandler } from "react-native";
import Menu from "../../../assets/Icon/Menu.svg";
import { useNavigation } from "@react-navigation/native";
import Modal from "react-native-modal";
import colors from "../../../assets/colors";
import { RNCamera } from 'react-native-camera';
import QRCodeScanner from "../../../components/QRCodeScanner";
import Tts from 'react-native-tts';
// import Voice from '@react-native-voice/voice';

const HomeScreen = () => {
    const navigation = useNavigation()
    const [isVisible, setVisible] = useState(false)
    const [visible, setVisibles] = useState(false)
    const [selected,setSelected]=useState(0)


    // useEffect(()=>{
    //     // Tts.speak('Hello, world!')
    //     Voice.onSpeechStart = this.onSpeechStartHandler.bind(this);
    //     Voice.onSpeechEnd = this.onSpeechEndHandler.bind(this);
    //     Voice.onSpeechResults = this.onSpeechResultsHandler.bind(this);
        
    // },[])
  
    // const  onStartButtonPress=(e)=>{
    //     Voice.start('en-US');
    //   }

    const onItemPress = (title) => {
        if (title == 'Punch Order') {
            navigation.navigate('PunchOrder')
        }
        else if (title == 'Bag Check') {
            navigation.navigate('BagCheck')
            // openScanner()
            // setVisibles(true)
        }
        else if (title == 'Roll Check') {
            navigation.navigate('RollCheck')
            // setVisibles(true)
        }
        else if (title == 'Stock Check') {
            navigation.navigate('StockCheck')
            // setVisibles(true)
        }
        else if (title == 'Update Stock') {
            navigation.navigate('UpdateStock')
            // setVisibles(true)
        }
        else if (title == 'Change Company') {
            navigation.navigate('LandingPage')
        }
    }

    const onSuccess = e => {
        console.error('An error occured')
        // Linking.openURL(e.data).catch(err =>
        //   console.error('An error occured', err)
        // );
    };


    function handleBackButtonClick() {
        BackHandler.exitApp()
        return false;
      }
      
      useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
        return () => {
          BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
        };
      }, []);

   



    return (
        <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
            <View style={{ height: 50, width: '100%', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, backgroundColor: '#fff' }}>
                <TouchableOpacity
                    onPress={() => navigation.openDrawer()}>
                    <Menu />
                </TouchableOpacity>
               
            </View>
            <ScrollView style={{}}>
                <View style={{ marginTop: 20, paddingHorizontal: 10 }}>
                    <View style={{ paddingHorizontal: 10 }}>
                        <Text onPress={()=>navigation.navigate('Test')} style={{ fontSize: 18, fontFamily: 'Montserrat-Bold', color: colors.color1 }}>Hi Johnson!</Text>
                        <Text style={{ fontSize: 14, fontFamily: 'Montserrat-SemiBold', color: colors.color1 }}>Good morning</Text>
                    </View>
                    <View style={{ borderWidth: 1.5, height: 90, marginHorizontal: 10, marginTop: 25, marginBottom: 25, borderRadius: 10, justifyContent: 'center' }}>
                        <View style={{ paddingHorizontal: 10, paddingVertical: 10, justifyContent: 'center' }}>
                            <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 16, color: colors.color1 }}>Welcome</Text>
                            <Text style={{ fontSize: 15, fontFamily: 'Montserrat-SemiBold', color: colors.color1 }}>{`To Company A!`}</Text>
                        </View>
                    </View>
                    <FlatList
                        data={data}
                        numColumns={2}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity
                                activeOpacity={0.5}
                                onPress={() =>{
                                    
                                   
                                    setTimeout(() => {
                                        onItemPress(item.name)
                                    }, 100);
                                      setSelected(item.selected)
                                    }}
                                style={{
                                    // backgroundColor:'#1505f5',
                                    backgroundColor:selected==item.selected?'#0e305d': '#d1d8e2',
                                    width: '45%',
                                    height: 150,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: 10,
                                    borderRadius: 10,
                                    shadowColor: '#FCDA64BF',
                                    shadowOpacity: 0.26,
                                    shadowOffset: { width: 2, height: 0 },
                                    shadowRadius: 20,
                                    elevation: 5,
                                }}>
                                <Image source={item.img} />
                                <Text style={{ color: '#FFF', fontFamily: 'Montserrat-SemiBold', fontSize: 12, marginTop: 10 }}>{item.name}</Text>

                            </TouchableOpacity>
                        )}
                    />
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
                                closeHandler={() => setVisibles(false)}
                            />
                        </View>

                    </View>
                </Modal>
            </View>
            <StatusBar
                animated={true}
                backgroundColor={colors.color1}
            />
           
        </View>
    )
}
export default HomeScreen;
const data = [
    {
        img: require('../../../assets/LocalImage/image15.png'),
        name: 'Punch Order',
        selected:1
    },
    {
        img: require('../../../assets/LocalImage/image16.png'),
        name: 'Bag Check',
        selected:2
    },
    {
        img: require('../../../assets/LocalImage/image17.png'),
        name: 'Roll Check',
        selected:3
    },
    {
        img: require('../../../assets/LocalImage/image18.png'),
        name: 'Stock Check',
        selected:4
    },
    {
        img: require('../../../assets/LocalImage/image19.png'),
        name: 'Update Stock',
        selected:5
    },
    // {
    //     img: require('../../../assets/LocalImage/image20.png'),
    //     name: 'Change Company'
    // },
    // {
    //     img:require('../../../assets/LocalImage/image23.png'),
    //     name:'Order Copies'
    // },
    // {
    //     img:require('../../../assets/LocalImage/image22.png'),
    //     name:'Price Chart'
    // },
    // {
    //     img:require('../../../assets/LocalImage/image24.png'),
    //     name:'Legal Support'
    // },
]