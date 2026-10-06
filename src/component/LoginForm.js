import React, {useEffect, useState} from 'react';
import {Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import PhoneInput from "react-native-phone-input";
import {
    useFonts,
    MuseoModerno_100Thin,
    MuseoModerno_200ExtraLight,
    MuseoModerno_300Light,
    MuseoModerno_400Regular,
    MuseoModerno_500Medium,
    MuseoModerno_600SemiBold,
    MuseoModerno_700Bold,
    MuseoModerno_800ExtraBold,
    MuseoModerno_900Black,
    MuseoModerno_100Thin_Italic,
    MuseoModerno_200ExtraLight_Italic,
    MuseoModerno_300Light_Italic,
    MuseoModerno_400Regular_Italic,
    MuseoModerno_500Medium_Italic,
    MuseoModerno_600SemiBold_Italic,
    MuseoModerno_700Bold_Italic,
    MuseoModerno_800ExtraBold_Italic,
    MuseoModerno_900Black_Italic,
} from '@expo-google-fonts/museomoderno';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {loginOrRegister} from "../util/AuthAPI";
import {useNavigation} from "@react-navigation/native";
import AuthContext from "../context/AuthContext";
import Loading from "./Loading";

const LoginForm = () => {
    let [fontsLoaded] = useFonts({
        MuseoModerno_100Thin,
        MuseoModerno_200ExtraLight,
        MuseoModerno_300Light,
        MuseoModerno_400Regular,
        MuseoModerno_500Medium,
        MuseoModerno_600SemiBold,
        MuseoModerno_700Bold,
        MuseoModerno_800ExtraBold,
        MuseoModerno_900Black,
        MuseoModerno_100Thin_Italic,
        MuseoModerno_200ExtraLight_Italic,
        MuseoModerno_300Light_Italic,
        MuseoModerno_400Regular_Italic,
        MuseoModerno_500Medium_Italic,
        MuseoModerno_600SemiBold_Italic,
        MuseoModerno_700Bold_Italic,
        MuseoModerno_800ExtraBold_Italic,
        MuseoModerno_900Black_Italic,
    });

    const [phoneNumber, setPhoneNumber] = useState('');
    const [loginButtonDisabled, setLoginButtonDisabled] = useState(true);
    const [loading,setLoading] = useState(false);

    const navigation = useNavigation();

    useEffect(()=>{
        if (phoneNumber.length>=16){
            setLoginButtonDisabled(false)
        }
    },[phoneNumber])

    const loginOl = async () => {
        try {
            setLoading(true)
            const token = await loginOrRegister(phoneNumber);
            if (token){
                setLoading(false)
                navigation.navigate('SmsVerification', {
                    phone_number: phoneNumber,
                });
            }else{
                setLoading(false)
                Alert.alert("Hata!","Sistemsel bir sorun oluştu. Lütfen daha sonra tekrar deneyin.")
            }
            /*await AsyncStorage.setItem('authToken', token.toLocaleString());
            setLoggedIn(true)*/
        } catch (e) {
            console.log(e)
        }
    }

    if (loading){
        return (
            <Loading/>
        )
    }

    if (!fontsLoaded) {
        return null; // Font yüklenene kadar ekranda bir şey gösterme
    }

    return (
        <ScrollView style={styles.container} >
            <Text style={styles.pageHeaderTitle}>Üye Ol</Text>
            <Image source={require('../../assets/logo.png')} style={styles.logo} />
            <Image source={require('../../assets/logoText.png')} style={styles.logoText} />
            <Text style={styles.pageText}>Tekrar hoşgeldiniz.</Text>
            <Text style={styles.text}>Telefon Numarası</Text>
            {/*<TextInput
                placeholder="Telefon Numarası"
                keyboardType="number-pad"
                style={styles.textInput}
                value={phoneNumber}
                onChangeText={(text)=>{setPhoneNumber(text)}}
            />*/}
            <PhoneInput
                countriesList={require('../util/country.json')}
                style={styles.phoneInput}
                initialValue={phoneNumber}
                initialCountry="tr"
                autoFormat={true}
                onChangePhoneNumber={(text) => {
                    setPhoneNumber(text);
                }}
                withShadow
                autoFocus
                textStyle={styles.text}
            />
            <TouchableOpacity disabled={loginButtonDisabled} style={styles.button} onPress={()=> {
                loginOl()
            }}>
                <Text style={styles.loginText}>Giriş Yap</Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 12, marginTop: 5, fontFamily: 'MuseoModerno_400Regular' }}>
                Giriş yap butonuna basarak <Text onPress={()=>{Alert.alert('Kullanıcı Sözleşmesi','Sözleşme detayları vsvs...',[{text:'Okudum, Anladım.'}])}} style={{ textDecorationLine: 'underline' }}>Kullanıcı Sözleşmesi</Text>'ni kabul etmiş olursunuz.
            </Text>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#F5F6FD',
        paddingHorizontal:24
    },
    phoneInput: {
        borderWidth: 1,
        borderRadius: 25,
        width: '100%',
        height: 50,
        paddingLeft:20,
        fontFamily:'MuseoModerno_400Regular',
        marginTop:15,
    },
    pageHeaderTitle:{
        fontFamily:'MuseoModerno_700Bold',
        marginTop:45,
        fontSize:20,
        textAlign:'center'
    },
    logo:{
        width:107.195,
        height:107.195,
        alignSelf:'center',
        marginTop:68
    },
    logoText:{
        width:153.264,
        height:18.374,
        alignSelf:'center',
        marginTop:11
    },
    pageText:{
        marginTop:55,
        marginBottom:42,
        fontFamily:'MuseoModerno_700Bold',
        fontSize:20,
        color:'#25304E',
        textAlign:'center'
    },
    text:{
        fontFamily:'MuseoModerno_700Bold',
        fontSize:14,
    },
    textInput:{
        color:'#353f59',
        backgroundColor:'#fff',
        borderRadius:100,
        padding:10,
        fontFamily:'MuseoModerno_400Regular'
    },
    button:{
        backgroundColor:'#00C4E4',
        padding:10,
        borderRadius:100,
        marginTop:25
    },
    loginText:{
        justifyContent:'center',
        alignSelf:'center',
        fontFamily:'MuseoModerno_600SemiBold',
        color:'#ffffff',
        fontSize:16
    }
})

export default LoginForm;
