import React, {useContext, useEffect, useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Dimensions, Image, Pressable, Alert, Modal, BackHandler, Animated} from "react-native";
import AuthContext from "../../context/AuthContext";
import Tebrikler from "../Tebrikler";
import LottieView from "lottie-react-native";
import {kacDakika, kacMetre} from "../../util/mesafeOlc";
import TopAlert from "../Alerts/TopAlert";
import {gecmisKullanimEkle} from "../../util/AuthAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useNavigation} from "@react-navigation/native";
import Loading from "../Loading";
import LanguageContext from "../../context/LanguageContext";

//Anasayfadan yönlendirilen sayfa

const FeederDetail = ({visible}) => {
    const {visibleModal,setVisibleModal,modalData,location,userData} = useContext(AuthContext);
    const [loopAmount,setLoopAmount] = useState(1);
    const [modalHeight, setModalHeight] = useState(Dimensions.get('window').height * 0.4);
    const [alertIsActive,setAlertIsActive] = useState(false);
    const [toplamTutar,setToplamTutar] = useState(5);
    const navigation = useNavigation();
    const [loading,setLoading] = useState(false);
    const {i18n} = useContext(LanguageContext);

    // Modern BackHandler subscription — removeEventListener kullanmıyor
    useEffect(() => {
        if (visibleModal !== 1) return;
        const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
            _modalClose();
            return true;
        });
        return () => subscription.remove();
    }, [visibleModal]);

    const isModalReady = !!(modalData && modalData.latlng && location && location.coords);

    const distance = isModalReady
        ? kacMetre(
            location.coords.latitude,
            location.coords.longitude,
            modalData.latlng.latitude,
            modalData.latlng.longitude
          )
        : 0;

    const dynamicWidth = (modalData && modalData.doluluk) ? modalData.doluluk : 0;
    const styles = StyleSheet.create({
        container: {
            backgroundColor:'#f5f6fd',
            borderTopLeftRadius:25,
            borderTopRightRadius:25,
            height:modalHeight,
        },
        topRow:{
            paddingHorizontal:24,
        },
        closeLine:{
            backgroundColor:'rgba(147, 226, 243, 0.61)',
            width:63,
            height:5,
            alignSelf:'center',
            marginTop:11,
            marginBottom:25,
            borderRadius:10
        },
        idContainer:{
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center'
        },
        feederIcon:{
            width:30,
            height:21,
            marginRight:7
        },
        textID:{
            fontFamily:'MuseoModerno_700Bold',
            fontSize:22,
        },
        dolulukContainer:{
            height:30,
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center',
        },
        dolulukYuzde1:{
            width:100,
            height:12,
            backgroundColor:'#93E2F3',
            marginRight:5,
            borderRadius:10,
            position:'fixed',
            top:0
        },
        dolulukYuzde2:{
            width: dynamicWidth,
            height:12,
            backgroundColor:'#00C4E4',
            marginRight:5,
            borderRadius:10,
            position:'fixed',
            top:-12
        },
        doluluk:{
            fontFamily:'MuseoModerno_600SemiBold',
            fontSize:15,
            marginLeft:8
        },
        locationContainer:{
            flexDirection:'row',
            justifyContent:'flex-start',
            alignItems:'center',
            marginTop:10
        },
        locationIcon:{
            width:18,
            height:18
        },
        locationText:{
            fontFamily:'MuseoModerno_400Regular',
            color:'#353f59',
            opacity:0.5,
            fontSize:14,
            paddingLeft:3
        },
        tutarContainer:{
            marginTop:25,
        },
        flexRowJustSpaBet:{
            flexDirection:'row',
            justifyContent:'space-between'
        },
        flexRowAlgnBasln:{
            flexDirection:'row',
            alignItems:'baseline'
        },
        toplamTutarText:{
            color:'#25304E',
            fontFamily:'MuseoModerno_500Medium',
            fontSize:13,
        },
        birimFiyatText:{
            color:'rgba(53, 63, 89, 0.50)',
            fontFamily:'MuseoModerno_400Regular',
            fontSize:15
        },
        toplamTutar:{
            color:'#00C4E4',
            fontFamily:'MuseoModerno_500Medium',
            fontSize:20,
        },
        odenecekText:{
            color:'#9DA2AF',
            fontFamily:'MuseoModerno_500Medium',
            fontSize:12,
        },
        bottomContainer:{
            backgroundColor:'#fff',
            height:96,
            marginTop:26,
            borderTopLeftRadius:20,
            borderTopRightRadius:20,
            paddingHorizontal:24,
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'space-between',
        },
        downBtn:{
            width:31.579,
            height:31.579,
            marginHorizontal:10,
        },
        loopAmount:{
            fontFamily:'MuseoModerno_500Medium',
            fontSize:20,
            color:'#00C4E4'
        },
        takviyeBtn:{
            width:209,
            height:52,
            backgroundColor:'#00C4E4',
            borderRadius:100,
            alignItems:'center',
            justifyContent:'center'
        },
        takviyeBtnText:{
            color:'#fff',
            fontFamily:'MuseoModerno_600SemiBold',
            fontSize:15,
        },
        button: {
            backgroundColor: 'lightblue',
            padding: 12,
            margin: 16,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 4,
        },
        bottomModal: {
            justifyContent: 'flex-end',
            margin: 0,
        },
        modalWrapper: {
            flex: 1,
            flexDirection: 'column',      // üst: backdrop, alt: kart
            backgroundColor: 'rgba(0,0,0,0.4)',
        },
        backdrop: {
            flex: 1,                      // modal kartının üstündeki tüm boşluğu kapla
        },
    });


    const _modalClose = () => {
        setVisibleModal(false)
        setLoopAmount(1)
    }

    const handleAmountChange = (amount) => {
        const newAmount = loopAmount + amount;

        if (newAmount < 1) {
            Alert.alert(i18n.t('uzgunuz'),i18n.t('miktar1denKucukOlamaz'));
        } else if (newAmount > 10) {
            Alert.alert(i18n.t('uzgunuz'),i18n.t('cabaniziGoruyoruzamaMaalesefMiktar10danBuyukOlamaz'));
        } else {
            setLoopAmount(newAmount);
            setToplamTutar(5 * newAmount);
        }
    };

    const _renderModalContent = () => {
        return (
            <>
                {
                    loading && <Loading/>
                }
                <TopAlert message={i18n.t('mamalarBasariylaDokuldu')} isActive={alertIsActive} isClose={()=>{setAlertIsActive(false)}} />
                <View style={styles.container}>
                    <View style={styles.topRow}>

                        {/*_renderButton('Close', () => setVisibleModal(false))*/}
                        <TouchableOpacity style={styles.closeLine} onPress={()=>_modalClose()}>
                        </TouchableOpacity>
                        <View style={styles.idContainer}>
                            <Text style={styles.textID}>{modalData.title}</Text>
                            <View style={styles.dolulukContainer}>
                                <View style={{position:'relative',top:7}}>
                                    <View style={styles.dolulukYuzde1}></View>
                                    <View style={styles.dolulukYuzde2}></View>
                                </View>
                                <Text style={styles.doluluk}>%{dynamicWidth}</Text>
                            </View>
                        </View>
                        <View style={styles.locationContainer}>
                            <Image style={styles.locationIcon} source={require('../../../assets/icons/location.png')} />
                            <Text style={styles.locationText}>
                                {(() => {
                                    const sonuc = kacDakika(distance * 1000);
                                    let formattedTime;

                                    if (sonuc < 1) {
                                        formattedTime = i18n.t('birDakika') + " ";
                                    } else if (sonuc.toFixed(0) > 60) {
                                        formattedTime = (sonuc.toFixed(0) / 60).toFixed(0) + " " + i18n.t('saat') + " ";
                                    } else {
                                        formattedTime = sonuc.toFixed(0) + " " + i18n.t('dakika') + " ";
                                    }

                                    return formattedTime;
                                })()}
                                /
                                {distance < 1
                                    ? " " + i18n.t("metre", { mesafe: distance.toFixed(2) * 1000 })
                                    : " " + i18n.t('km',{mesafe: distance.toFixed(2)})}
                            </Text>
                        </View>
                        <View style={styles.tutarContainer}>
                            <View style={styles.flexRowJustSpaBet}>
                                <Text style={styles.toplamTutarText}>{i18n.t('toplamTutar')}</Text>
                                <Text style={styles.birimFiyatText}>{i18n.t('fiyat')}</Text>
                            </View>
                            <View style={styles.flexRowJustSpaBet}>
                                <View style={styles.flexRowAlgnBasln}>
                                    <Text style={styles.toplamTutar}>₺{toplamTutar}</Text>
                                    <Text style={styles.odenecekText}> / {i18n.t('odenecek')}</Text>
                                </View>
                                <View style={styles.flexRowAlgnBasln}>
                                    <Text style={styles.toplamTutar}>₺5</Text>
                                    <Text style={styles.odenecekText}> / {i18n.t('birim')}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.bottomContainer}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => handleAmountChange(-1)}>
                                <Image source={require('../../../assets/icons/downButton.png')} style={styles.downBtn} />
                            </TouchableOpacity>
                            <Text style={styles.loopAmount}>{loopAmount}</Text>
                            <TouchableOpacity onPress={() => handleAmountChange(1)}>
                                <Image source={require('../../../assets/icons/upButton.png')} style={styles.downBtn} />
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity style={styles.takviyeBtn} onPress={async ()=>{
                                setLoading(true)
                                const authToken = await AsyncStorage.getItem('authToken');
                                const addPastUsage = await gecmisKullanimEkle(authToken.toLocaleString(),modalData.title,loopAmount,toplamTutar)
                                if (addPastUsage.error == false){
                                    setVisibleModal(false)
                                    setLoading(false)
                                    navigation.navigate('TakviyeTesekkurler',{
                                        title:modalData.title,
                                        adet:loopAmount,
                                        birimFiyat:5,
                                        toplamTutar:toplamTutar
                                    })
                                    //setAlertIsActive(true)
                                }else {
                                    setVisibleModal(false)
                                    Alert.alert(i18n.t('hata'),addPastUsage.message);
                                    navigation.navigate('WalletHome')
                                }
                            }}>
                                <Text style={styles.takviyeBtnText}>{i18n.t("takviyeYap")}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </>

        )
    };


    return (
        <Modal
            visible={visibleModal === 1}
            transparent={true}
            animationType="slide"
            onRequestClose={() => _modalClose()}
        >
            {/* Tam ekran container */}
            <View style={styles.modalWrapper}>
                {/* Backdrop: flex:1 ile modal içeriğinin ÜSTündeki boşluğu doldurur */}
                <Pressable
                    style={styles.backdrop}
                    onPress={() => _modalClose()}
                />
                {/* Modal içeriği en altta */}
                {isModalReady ? _renderModalContent() : null}
            </View>
        </Modal>
    );
};

export default FeederDetail;
