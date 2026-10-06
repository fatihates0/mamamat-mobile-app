import React, {useContext} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthContext from "../context/AuthContext";
import LoginButton from "./LoginButton";
import { MaterialIcons } from '@expo/vector-icons';
const LogoutButton = () => {
    const {loggedIn,setLoggedIn} = useContext(AuthContext);

    const logoutOl = async () => {
        try {
            // AsyncStorage üzerindeki authToken'ı kaldır
            await AsyncStorage.removeItem('authToken');
            // loggedIn state'ini güncelle
            setLoggedIn(false);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <View>
            <MaterialIcons style={styles.icon} name="logout" size={24} color="black"  onPress={()=> {
                logoutOl()
            }}/>
            {/* İçeriği buraya ekleyin */}
        </View>
    )
};

const styles = StyleSheet.create({
    container:{
        marginTop:50
    },
    icon:{
        marginRight:10,
        fontSize:30
    }
})

export default LogoutButton;
