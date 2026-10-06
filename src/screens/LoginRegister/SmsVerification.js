import React, {useContext, useEffect, useState} from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View,Alert} from "react-native";
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
import {getUserData, loginOrRegister, smsVerification} from "../../util/AuthAPI";
import {useNavigation} from "@react-navigation/native";
import AuthContext from "../../context/AuthContext";
import Loading from "../../component/Loading";
import TopAlert from "../../component/Alerts/TopAlert";

const LoginForm = ({route}) => {
    const { phone_number } = route.params;
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

    const [verificationCode, setVerificationCode] = useState('');
    const [loading,setLoading] = useState(false);
    const [alertIsActive,setAlertIsActive] = useState(false);

    const {setLoggedIn,setUserData} = useContext(AuthContext);

    const navigation = useNavigation();



    const loginOl = async () => {
        try {
            setLoading(true)
            const token = await smsVerification(phone_number,verificationCode);
            if (token){
                await AsyncStorage.setItem('authToken', token.toLocaleString());
                const userData = await getUserData(token.toLocaleString());
                setUserData(userData)
                setLoggedIn(true)
            }else{
                Alert.alert("Hata!", "Doğrulama kod hatası.")
            }
            setLoading(false)
        } catch (e) {
            console.log(e)
        }
    }

    /*Tekrar SMS Gönder*/
    const tekrarGonder = async () => {
        setLoading(true)
        try {
            setAlertIsActive(true)
            const token = await loginOrRegister(phone_number);
            await AsyncStorage.setItem('authToken', token.toLocaleString());
            setLoggedIn(true)
        } catch (e) {
            console.log(e)
        }
        setLoading(false)
    }
    /*Tekrar SMS Gönder*/

    if (loading){
        return (
            <Loading/>
        )
    }

    if (!fontsLoaded) {
        return null; // Font yüklenene kadar ekranda bir şey gösterme
    }


    return (
        <>
            <TopAlert message="Doğrulama kodu gönderildi." isActive={alertIsActive} isClose={()=>{setAlertIsActive(false)}}/>
            <ScrollView style={styles.container}>
                <View style={{marginTop:46}}>
                    <TouchableOpacity onPress={()=>{
                        navigation.goBack()
                    }}>
                        <Image style={{ width: 24, height: 24, marginLeft: 21,marginTop:4}} source={require('../../../assets/icons/backBtn.png')} />
                    </TouchableOpacity>
                    <Text style={styles.pageHeaderTitle}>SMS Doğrula</Text>
                </View>
                <Image source={require('../../../assets/logo.png')} style={styles.logo} />
                <Image source={require('../../../assets/logoText.png')} style={styles.logoText} />
                <Text style={styles.pageText}>Doğrulama Kodu</Text>
                <Text style={{marginBottom:10,fontSize:13,fontFamily:'MuseoModerno_400Regular',textAlign:'center',color:'#25304E'}}>{phone_number}</Text>
                <TouchableOpacity onPress={()=> {
                    tekrarGonder()
                }}>
                    <Text style={{marginBottom:42,fontSize:13,fontFamily:'MuseoModerno_600SemiBold',textAlign:'center',color:'#25304E'}}>Tekrar Gönder</Text>
                </TouchableOpacity>
                <Text style={styles.text}>Doğrulama Kodu</Text>
                <TextInput
                    placeholder="XXXXXX"
                    keyboardType="number-pad"
                    style={styles.textInput}
                    value={verificationCode}
                    onChangeText={(text)=>{setVerificationCode(text)}}
                    maxLength={6}
                />
                <TouchableOpacity style={styles.button} onPress={()=> {
                    loginOl()
                }}>
                    <Text style={styles.loginText}>Onayla</Text>
                </TouchableOpacity>
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#F5F6FD',
        paddingHorizontal:24
    },
    pageHeaderTitle:{
        fontFamily:'MuseoModerno_700Bold',
        fontSize:20,
        position:'absolute',
        alignSelf:'center'
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
        fontFamily:'MuseoModerno_700Bold',
        fontSize:20,
        color:'#25304E',
        textAlign:'center'
    },
    text:{
        fontFamily:'MuseoModerno_700Bold',
        fontSize:14,
        marginBottom:15,
    },
    textInput:{
        color:'#353f59',
        backgroundColor:'#fff',
        borderRadius:100,
        padding:10,
        fontFamily:'MuseoModerno_400Regular',
        textAlign:'center'
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
        color:'#ffffff'
    }
})

export default LoginForm;
