import React, {useContext} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthContext from "../../context/AuthContext";
import LoginForm from "../../component/LoginForm";

const LoginScreen = () => {
    const {setLoggedIn} = useContext(AuthContext);

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
            <LoginForm style={styles.loginForm} />
            {/* İçeriği buraya ekleyin */}
        </View>
    )
};

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    loginForm:{
    }
})

export default LoginScreen;
