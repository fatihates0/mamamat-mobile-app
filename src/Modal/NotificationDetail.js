import React from 'react';
import {Image, Platform, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import MenuHeader from "../component/Header/MenuHeader";

const NotificationDetail = ({navigation,route}) => {
    const { notification } = route.params;
    return (
        <View style={{paddingHorizontal:24}}>
            <TouchableOpacity style={styles.closeLine} onPress={()=>navigation.goBack()}>
            </TouchableOpacity>
            <View style={{marginVertical:50}}>
                <Text numberOfLines={1} ellipsizeMode="tail" style={styles.pageHeaderTitle}>{notification.notifi_title}</Text>
            </View>
            <Text>{notification.notifi_text}</Text>
        </View>
    );
};
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#F5F6FD',
        paddingHorizontal:24
    },
    closeLine:{
        backgroundColor:'rgba(147, 226, 243, 0.61)',
        width:63,
        height:5,
        alignSelf:'center',
        marginTop:20,
        borderRadius:10
    },
    pageHeaderTitle:{
        fontFamily:'MuseoModerno_700Bold',
        fontSize:16,
        position:'absolute',
        alignSelf:'center'
    },
});
export default NotificationDetail;