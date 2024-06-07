import React from "react";
import { View, Text, FlatList } from "react-native";
import Header from "../../../components/CustomHeader";
import { useNavigation } from "@react-navigation/native";

const Notification = () => {
    const navigation=useNavigation()
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <Header
                title={"Notification"}
                onPress={() => navigation.goBack()}
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
                            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                            <Text style={{ fontSize: 14,color:'#000',fontFamily:'Montserrat-SemiBold' }}>{item.title}</Text>
                            <Text style={{ fontSize: 12,color:'#000',fontFamily:'Montserrat-Medium' }}>{item.time}</Text>
                            </View>
                            <Text style={{fontSize:13,marginTop:5,color:'#000',fontFamily:'Montserrat-Medium'}}>{item.description}</Text>
                        </View>
                    )}
                />
            </View>
        </View>
    )
}
export default Notification;
const data = [
    { title: 'New Notification', description: 'This is testing notification for development', time: '01 feb, 2014' },
    { title: 'New Notification', description: 'This is testing notification for development', time: '01 feb, 2014' },

    { title: 'New Notification', description: 'This is testing notification for development', time: '01 feb, 2014' },

    { title: 'New Notification', description: 'This is testing notification for development', time: '01 feb, 2014' },

    { title: 'New Notification', description: 'This is testing notification for development', time: '01 feb, 2014' }

]