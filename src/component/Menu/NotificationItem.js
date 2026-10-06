import React from 'react';
import {Image, Text, View, StyleSheet, TouchableOpacity} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {readNotification} from "../../util/AuthAPI";

const NotificationItem = ({notification}) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={()=>{
            navigation.navigate('NotificationDetailModal',{
                notification: notification
            });
        }}>
            <View style={styles.hesabimContainer}>
                <Image source={require('../../../assets/icons/mamamatIcon.png')} style={styles.avatar}/>
                <View style={styles.textContainer}>
                    <Text numberOfLines={1} style={styles.baslik}>{notification.notifi_title}</Text>
                    <Text style={styles.tarih}>{notification.tarih}</Text>
                </View>
                <Image source={require('../../../assets/icons/menu/rightBtn.png')} style={styles.menuItemRightIcon}/>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    hesabimContainer:{
        backgroundColor:'#fff',
        width:'100%',
        height:55,
        borderRadius:100,
        flexDirection:'row',
        alignItems:'center',
        marginBottom:10
    },
    avatar:{
        width:29,
        height:29,
        position:'absolute',
        left:20
    },
    textContainer:{
        position:'absolute',
        left:67
    },
    baslik:{
        color:'#25304E',
        fontSize:16,
        maxWidth:220,
        fontFamily:'MuseoModerno_600SemiBold',
    },
    tarih:{
        color:'#6F7F95',
        fontSize:13,
        fontFamily:'MuseoModerno_400Regular',
    },
    menuItemRightIcon:{
        width:7.8,
        height:14,
        position:'absolute',
        right:21
    },
});

export default NotificationItem;