import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/native";

const MenuHeader = ({title}) => {
    const navigation = useNavigation();
    return (
        <View style={{marginTop:46,marginBottom:39}}>
            <TouchableOpacity onPress={()=>{
                navigation.goBack()
            }}>
                <Image style={{ width: 24, height: 24, marginLeft: 10,marginTop:4}} source={require('../../../assets/icons/backBtn.png')} />
            </TouchableOpacity>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.pageHeaderTitle}>{title}</Text>
        </View>
    );
};
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#F5F6FD',
        paddingHorizontal:24
    },
    pageHeaderTitle:{
        maxWidth:'85%',
        fontFamily:'MuseoModerno_700Bold',
        fontSize:20,
        position:'absolute',
        alignSelf:'center'
    },
});
export default MenuHeader;
