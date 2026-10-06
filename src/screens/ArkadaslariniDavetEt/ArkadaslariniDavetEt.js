import React, {useContext, useEffect, useState} from 'react';
import {Alert, Keyboard, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import MenuHeader from "../../component/Header/MenuHeader";
import PhoneInput from "react-native-phone-input";
import {arkadasinaDavetiyeGonder} from "../../util/AuthAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LanguageContext from "../../context/LanguageContext";

const ArkadaslariniDavetEt = ({navigation}) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [loginButtonDisabled, setLoginButtonDisabled] = useState(true);
    const [phoneNumberError,setPhoneNumberError] = useState(false);
    const {i18n} = useContext(LanguageContext);

    useEffect(()=>{

    },[phoneNumber])

    const phoneNumberCheck = function (){
        if (phoneNumber.length>=16){
            setPhoneNumberError(false )
            setLoginButtonDisabled(false)
        }else{
            setPhoneNumberError(true)
        }
    };

    const davetiyeGonder = async () => {
        Keyboard.dismiss();
        const authToken = await AsyncStorage.getItem('authToken');
        const davetiyeSonuc = await arkadasinaDavetiyeGonder(authToken.toLocaleString(),phoneNumber)

        if (davetiyeSonuc.error == true){
            Alert.alert(i18n.t('hata'),davetiyeSonuc.message)
        }else{
            navigation.navigate('BasariliDavetiye');
        }
    };

    return (
        <View style={styles.container}>
            <MenuHeader title={i18n.t('arkadasiniDavetEt')}/>
            <ScrollView>
                <View style={styles.textSection}>
                    <Text style={styles.ustText}>{i18n.t('arkadasiniDavetEtTakviyeKazan')}!</Text>
                    <Text style={styles.altText}>{i18n.t('arkadasiniDavetEtTakviyeKazanText')}!</Text>
                </View>
                <PhoneInput
                    countriesList={require('../../util/country.json')}
                    style={styles.phoneInput}
                    initialValue={phoneNumber}
                    initialCountry="tr"
                    autoFormat={true}
                    onChangePhoneNumber={(text) => {
                        setPhoneNumber(text);
                        phoneNumberCheck()
                    }}
                    withShadow
                    autoFocus
                    textStyle={styles.inputText}
                />
                {
                    phoneNumberError && (
                        <Text style={styles.phoneNumberCheckText}>{i18n.t('lutfenGecerliBirTelefonNumarasiGirin')}</Text>
                    )
                }

                <TouchableOpacity disabled={loginButtonDisabled} style={styles.button} onPress={davetiyeGonder}>
                    <Text style={styles.loginText}>{i18n.t('arkadasiniDavetEt')}</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
    },
    textSection:{

    },
    ustText:{
        color:'#25304E',
        fontSize:22,
        fontFamily:'MuseoModerno_700Bold',
        textAlign:'center'
    },
    altText:{
        color:'#25304E',
        opacity:0.5,
        fontSize:14,
        fontFamily:'MuseoModerno_400Regular',
        textAlign:'center',
        marginTop:15
    },
    inputText:{
        fontFamily:'MuseoModerno_700Bold',
        fontSize:14,
    },
    phoneInput: {
        borderRadius: 25,
        width: '100%',
        height: 50,
        paddingLeft:20,
        fontFamily:'MuseoModerno_400Regular',
        marginTop:15,
        backgroundColor:'#fff',
    },
    phoneNumberCheckText:{
        color:'#999EAB',
        fontSize:12,
        fontFamily:'MuseoModerno_600SemiBold',
        marginTop:10
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
});

export default ArkadaslariniDavetEt;