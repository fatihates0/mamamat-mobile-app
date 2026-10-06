import React, {useContext} from 'react';
import {Alert, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import AuthContext from "../../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useNavigation} from "@react-navigation/native";
import LanguageContext from "../../context/LanguageContext";

const MapsHeader = ({map}) => {
    const navigation = useNavigation();
    const {location,setLoggedIn} = useContext(AuthContext);
    const {language,setLanguage} = useContext(LanguageContext);

    const nowLocationGo = ()=>{
        const newRegion = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.002,
            longitudeDelta: 0.002
        }
        map.current.animateToRegion(newRegion,1500)
    }
    const logoutFunc = async ()=>{
        try {
            // AsyncStorage üzerindeki authToken'ı kaldır
            await AsyncStorage.removeItem('authToken');
            // loggedIn state'ini güncelle
            setLoggedIn(false);
        } catch (e) {
            console.log(e);
        }
    }

    const languageCheck = async () => {
        try {
            const storageLanguage = await AsyncStorage.getItem('selectedLanguage');
            if (storageLanguage === "tr") {
                AsyncStorage.setItem('selectedLanguage','en');
            }else{
                AsyncStorage.setItem('selectedLanguage','tr');
            }
        }catch (e) {
            console.log(e)
        }
    }

    return (
        <View style={styles.container}>
            {
                <TouchableOpacity style={styles.logo1Touc} onPress={()=>{
                    Alert.alert("Sokağıma Mamamat İstiyorum","İsteğiniz alınmıştır, talebiniz için teşekkür ederiz :)");
                }}>
                    <Image source={require('../../../assets/icons/istiyorum.png')} style={styles.logo1}/>
                </TouchableOpacity>
            }

            <TouchableOpacity style={[styles.logo2Touc, { marginLeft: 100 }]} onPress={nowLocationGo}>
                <Image source={require('../../../assets/icons/konumaGit.png')} style={styles.logo2}/>
            </TouchableOpacity>

            {/*<TouchableOpacity style={styles.logo3Touch} onPress={logoutFunc}>
                <Image source={require('../../../assets/icons/cikis.png')} style={styles.logo3}/>
            </TouchableOpacity>*/}
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        zIndex:1
    },
    logo1Touc:{
        position:'absolute',
        zIndex:1,
        top:40,
        left:14,
    },
    logo1:{
        width:48,
        height:48,
    },
    logo2Touc:{
        position:'absolute',
        zIndex:1,
        top:40,
        right:14,
    },
    logo2:{
        width:48,
        height:48,
    },
    logo3Touch:{
        position:'absolute',
        zIndex:1,
        top:100,
        right:14,
    },
    logo3:{
        width:48,
        height:48,
    }
})

export default MapsHeader;
