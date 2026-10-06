import React, {useContext} from 'react';
import {Button, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import AuthContext from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginButton = ({baslik}) => {

    const {loggedIn,setLoggedIn} = useContext(AuthContext);

    const loginOl = async () => {
        try {
            await AsyncStorage.setItem('authToken', "Login Token Burada");
            setLoggedIn(true)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={()=> {
                loginOl()
            }}>
                <Text style={styles.text}>{baslik}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        marginTop:25
    },
    button:{
        backgroundColor:'#00C4E4',
        padding:10,
        borderRadius:100
    },
    text:{
        justifyContent:'center',
        alignSelf:'center',
        fontFamily:'MuseoModerno_600SemiBold',
        color:'#ffffff'
    }
})

export default LoginButton;
