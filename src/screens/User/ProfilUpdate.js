import React, {useContext, useState} from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    Keyboard,
    Alert,
    TextInput,
    Pressable, Platform
} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthContext from "../../context/AuthContext";
import {arkadasinaDavetiyeGonder, getUserData, userDetailUpdate} from "../../util/AuthAPI";
import {useFocusEffect} from "@react-navigation/native";
import LanguageContext from "../../context/LanguageContext";
import MenuHeader from "../../component/Header/MenuHeader";
import PhoneInput from "react-native-phone-input";
import Loading from "../../component/Loading";
import DateTimePicker from '@react-native-community/datetimepicker';
import TopAlert from "../../component/Alerts/TopAlert";

const ProfilUpdate = ({navigation}) => {
    const {userData,setUserData} = useContext(AuthContext);
    const {i18n} = useContext(LanguageContext);
    const [loading,setLoading] = useState(true);
    const [alertIsActive,setAlertIsActive] = useState(false);

    const [isimSoyisim, setIsimSoyisim] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [dogumTarihi, setDogumTarihi] = useState();
    const [date,setDate] = useState(new Date())
    const [showPicker,setShowPicker] = useState(false)

    const [phoneNumberError,setPhoneNumberError] = useState(false);
    const [loginButtonDisabled, setLoginButtonDisabled] = useState(true);


    const parseCustomDate = (dateString) => {
        const parts = dateString.split('.');
        return new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
    }


    const formatDate = (rawDate) => {
        let date = new Date(rawDate);
        let year = date.getFullYear();
        let mount = date.getMonth() + 1;
        let day = date.getDate();

        if (mount<10){
            mount="0"+mount;
        }

        if (day<10){
            day="0"+day;
        }

        return `${day}.${mount}.${year}`;
    }

    useFocusEffect(
        React.useCallback(() => {

            const userDataUpdate = async () => {
                setIsimSoyisim(userData.name)
                setPhoneNumber(userData.phone_number.replace(/\s/g, ""))
                setEmail(userData.email)
                if (userData.dogum_tarihi !== null && userData.dogum_tarihi !== ""){
                    setDogumTarihi(userData.dogum_tarihi)
                    setDate(parseCustomDate(userData.dogum_tarihi))
                }
                setLoading(false)
            };

            userDataUpdate();
        }, [])
    );


    const profilGuncelle = async () => {
        setLoading(true)
        const data = {
            'uniq_id' : userData.uniq_id,
            'name' : isimSoyisim,
            'email' : email,
            'phone_number' : phoneNumber,
            'dogum_tarihi' : dogumTarihi
        }
        const cevap = await userDetailUpdate(data);
        setLoading(false)
        if (cevap.error==true){
            Alert.alert(cevap.message)
        }
        setAlertIsActive(true)
    }


    if (loading){
        return <Loading/>
    }

    const phoneNumberCheck = function (){
        if (phoneNumber.length>=16){
            setPhoneNumberError(false )
            setLoginButtonDisabled(false)
        }else{
            setPhoneNumberError(true)
        }
    };

    const datePickerToggle = () => {
        setShowPicker(!showPicker)
    }

    const onChange = ({type},selectedDate) => {
        if (type == 'set') {
            const currentDate = selectedDate;
            setDate(currentDate)
            if (Platform.OS === 'android'){
                datePickerToggle();
                setDogumTarihi(formatDate(currentDate))
            }
        }else{
            datePickerToggle()
        }
    }

    const confirmIOSDate = () => {
        setDogumTarihi(formatDate(date));
        datePickerToggle();
    }



    return (
        <>
            <TopAlert message={i18n.t('profilBasariylaGuncellendi')} isActive={alertIsActive} isActive={alertIsActive} isClose={()=>{setAlertIsActive(false)}}  />
            <View style={styles.container}>
                <MenuHeader title={i18n.t('kullaniciBilgilerim')}/>

                <ScrollView>
                    <View>
                        <Text style={styles.labelText}>{i18n.t('adSoyad')}</Text>
                        <TextInput
                            style={styles.phoneInput}
                            placeholder={i18n.t('adiniziveSoyadiniziGirin')}
                            value={isimSoyisim}
                            onChangeText={(value) => setIsimSoyisim(value)}
                        />
                    </View>
                    <View>
                        <Text style={styles.labelText}>{i18n.t('cepTelefonu')}</Text>
                        <PhoneInput
                            countriesList={require('../../util/country.json')}
                            style={[styles.phoneInput,{backgroundColor:'#e3e3e3'}]}
                            disabled={true}
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
                        <Text style={[styles.phoneNumberCheckText,{marginTop:-10,marginLeft:20}]}>{i18n.t('telefonNumarasiDegisikligiBuradanMumkunDegildirLutfenBizimleIletisimeGecin')}</Text>
                    </View>
                    <View>
                        <Text style={styles.labelText}>{i18n.t('ePosta')}</Text>
                        <TextInput
                            style={styles.phoneInput}
                            placeholder={i18n.t('ePostaAdresiniziGirin')}
                            value={email}
                            onChangeText={(value) => setEmail(value)}
                        />
                    </View>
                    <View>
                        <Text style={styles.labelText}>{i18n.t('dogumTarihi')}</Text>


                        {
                            showPicker && (
                                <DateTimePicker
                                    modal
                                    value={date}
                                    mode="date"
                                    display="spinner"
                                    onChange={onChange}
                                    style={styles.dataPicker}
                                    minimumDate={new Date('1900-1-1')}
                                    maximumDate={new Date()}
                                    locale="tr-TR"
                                />
                            )
                        }
                        {
                            showPicker && Platform.OS === 'ios' && (
                                <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                                    <TouchableOpacity onPress={datePickerToggle} style={{backgroundColor:'#00C4E4',padding:10,borderRadius:25}}><Text style={{color:'#fff'}}>Kapat</Text></TouchableOpacity>
                                    <TouchableOpacity onPress={confirmIOSDate} style={{backgroundColor:'#00C4E4',padding:10,borderRadius:25}}><Text style={{color:'#fff'}}>Onayla</Text></TouchableOpacity>
                                </View>
                            )
                        }


                        <Pressable onPress={datePickerToggle}>
                            <TextInput
                                style={styles.phoneInput}
                                placeholder={i18n.t('dogumTarihiniziSecin')}
                                onChangeText={(value) => setDogumTarihi(value)}
                                editable={false}
                                onPressIn={datePickerToggle}
                                value={dogumTarihi}
                            />
                        </Pressable>
                    </View>

                    <TouchableOpacity style={styles.button} onPress={profilGuncelle}>
                        <Text style={styles.loginText}>{i18n.t('guncelle')}</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#F5F6FD',
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
        marginVertical:10,
        backgroundColor:'#fff',
        color:'#353f59',
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
    },
    labelText:{
        color:'#25304E',
        fontSize:14,
        fontFamily:'MuseoModerno_700Bold',
        marginLeft:20

    },
    dataPicker:{
        height:150,
        marginTop:-10,
    }
});

export default ProfilUpdate;
