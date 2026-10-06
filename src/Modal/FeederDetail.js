import React, { useContext, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Alert, Dimensions, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import LottieView from "lottie-react-native";
import { kacDakika, kacMetre } from "../util/mesafeOlc";
import AuthContext from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { takviyeYap } from "../util/AuthAPI";

//Burası QR'dan yönlendirilen sayfa

const FeederDetail = ({ navigation, route }) => {
    const { item } = route.params;
    const [loopAmount, setLoopAmount] = useState(1);
    const { visibleModal, setVisibleModal, modalData, setModalData, location, userData } = useContext(AuthContext);
    const [tebrikler, setTebrikler] = useState(false);
    const [modalHeight, setModalHeight] = useState(Dimensions.get('window').height * 0.4);
    const [yukleniyor, setYukleniyor] = useState(false);
    const [mevcutDoluluk, setMevcutDoluluk] = useState(modalData ? modalData.doluluk : 0);

    const randomText = [
        'Çok düşüncelisiniz',
        'Sizi seviyoruz',
        'Harikasınız!',
        'Minik dostlarımız size hayran',
        'Gülümsediğinizde dünya daha güzel oluyor',
        'Küçük şeylerdeki mutluluğu fark edin',
        'Sıcacık bir gülümseme her zaman iyidir',
        'Büyük kalpler küçük dostlar edinir :)',
        'Minik dostlarımızda büyük mutluluklar gizli',
        'Sonsuz sevgi, minik patilerde saklı',
        'Kalbinizdeki sevgiyi paylaşın',
        'Yağmurlu günlerde de gülümseyin',
        'Sevgi büyüdükçe, dünya güzelleşir',
        'Hayat bir macera, keyfini çıkarın',
        'Küçük bir iyilik büyük bir mutluluk getirir',
    ];

    function getRandomMessage() {
        const randomIndex = Math.floor(Math.random() * randomText.length);
        return randomText[randomIndex];
    }

    useEffect(() => {
        // Her ekran odaklandığında başlığı değiştir
        const headerTitleChange = navigation.addListener('focus', () => {
            navigation.setOptions({
                title: item.textID, // Başlığı burada değiştirin
            });
        });

        // Odaklanma olay dinleyicisini temizle
        return headerTitleChange;


    }, [navigation]);

    const distance = kacMetre(
        location.coords.latitude,
        location.coords.longitude,
        modalData.latitude,
        modalData.longitude
    );

    const dynamicWidth = mevcutDoluluk;
    const styles = StyleSheet.create({
        container: {
            backgroundColor: '#f5f6fd',
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            height: modalHeight,
        },
        topRow: {
            paddingHorizontal: 24,
        },
        closeLine: {
            backgroundColor: 'rgba(147, 226, 243, 0.61)',
            width: 63,
            height: 5,
            alignSelf: 'center',
            marginTop: 11,
            marginBottom: 25,
            borderRadius: 10
        },
        idContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        feederIcon: {
            width: 30,
            height: 21,
            marginRight: 7
        },
        textID: {
            fontFamily: 'MuseoModerno_700Bold',
            fontSize: 22,
        },
        dolulukContainer: {
            height: 30,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        dolulukYuzde1: {
            width: 100,
            height: 12,
            backgroundColor: '#93E2F3',
            marginRight: 5,
            borderRadius: 10,
            position: 'fixed',
            top: 0
        },
        dolulukYuzde2: {
            width: dynamicWidth,
            height: 12,
            backgroundColor: '#00C4E4',
            marginRight: 5,
            borderRadius: 10,
            position: 'fixed',
            top: -12
        },
        doluluk: {
            fontFamily: 'MuseoModerno_600SemiBold',
            fontSize: 15,
            marginLeft: 8
        },
        locationContainer: {
            flexDirection: 'row',
            justifyContent: 'left',
            alignItems: 'center',
            marginTop: 10
        },
        locationIcon: {
            width: 18,
            height: 18
        },
        locationText: {
            fontFamily: 'MuseoModerno_400Regular',
            color: '#353f59',
            opacity: 0.5,
            fontSize: 14,
            paddingLeft: 3
        },
        tutarContainer: {
            marginTop: 25,
        },
        flexRowJustSpaBet: {
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        flexRowAlgnBasln: {
            flexDirection: 'row',
            alignItems: 'baseline'
        },
        toplamTutarText: {
            color: '#25304E',
            fontFamily: 'MuseoModerno_500Medium',
            fontSize: 13,
        },
        birimFiyatText: {
            color: 'rgba(53, 63, 89, 0.50)',
            fontFamily: 'MuseoModerno_400Regular',
            fontSize: 15
        },
        toplamTutar: {
            color: '#00C4E4',
            fontFamily: 'MuseoModerno_500Medium',
            fontSize: 20,
        },
        odenecekText: {
            color: '#9DA2AF',
            fontFamily: 'MuseoModerno_500Medium',
            fontSize: 12,
        },
        bottomContainer: {
            backgroundColor: '#fff',
            height: 96,
            marginTop: 26,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingHorizontal: 24,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        downBtn: {
            width: 31.579,
            height: 31.579,
            marginHorizontal: 10,
        },
        loopAmount: {
            fontFamily: 'MuseoModerno_500Medium',
            fontSize: 20,
            color: '#00C4E4'
        },
        takviyeBtn: {
            width: 209,
            height: 52,
            backgroundColor: '#00C4E4',
            borderRadius: 100,
            alignItems: 'center',
            justifyContent: 'center'
        },
        takviyeBtnText: {
            color: '#fff',
            fontFamily: 'MuseoModerno_600SemiBold',
            fontSize: 15,
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
    });


    return (
        <>
            {
                tebrikler && (
                    <>

                        <View style={{
                            width: '100%',
                            flex: 1,
                            justifyContent: 'center',
                            alignSelf: 'center',
                            marginTop: 50,
                            position: 'relative',
                            top: modalHeight * 2 - 100,
                            left: 0,
                            zIndex: 1,
                        }}>
                            <Text style={{
                                width: '100%',
                                fontFamily: 'MuseoModerno_500Medium',
                                color: '#fff',
                                fontSize: 30,
                                position: 'absolute',
                                top: 20,
                                textAlign: 'center',
                                backgroundColor: 'rgba(0,0,0,0.02)',
                                textShadowColor: '#00C4E4', // Kontur rengi
                                textShadowOffset: { width: 2, height: 2 }, // Konturun konumu
                                textShadowRadius: 5, // Konturun kalınlığı,
                                justifyContent: 'center',
                                alignSelf: 'center'
                            }}>{getRandomMessage()}</Text>
                        </View>
                        <LottieView
                            style={{ flex: 1, zIndex: 5 }}
                            source={require('../../assets/confettie2.json')}
                            autoPlay
                            loop={true}
                        />
                    </>
                )
            }
            <View style={styles.container}>
                <View style={styles.topRow}>

                    {/*_renderButton('Close', () => setVisibleModal(false))*/}
                    <TouchableOpacity style={styles.closeLine} onPress={() => _modalClose()}>
                    </TouchableOpacity>
                    <View style={styles.idContainer}>
                        <Text style={styles.textID}>{modalData.title}</Text>
                        <View style={styles.dolulukContainer}>
                            <View style={{ position: 'relative', top: 7 }}>
                                <View style={styles.dolulukYuzde1}></View>
                                <View style={styles.dolulukYuzde2}></View>
                            </View>
                            <Text style={styles.doluluk}>%{dynamicWidth}</Text>
                        </View>
                    </View>
                    <View style={styles.locationContainer}>
                        <Image style={styles.locationIcon} source={require('../../assets/icons/location.png')} />
                        <Text style={styles.locationText}>
                            {kacDakika(distance * 1000)} / {distance < 1 ? distance.toFixed(2) * 1000 + " Metre" : distance.toFixed(2) + " Km."} Uzakta
                        </Text>
                    </View>
                    <View style={styles.tutarContainer}>
                        <View style={styles.flexRowJustSpaBet}>
                            <Text style={styles.toplamTutarText}>Toplam Tutar</Text>
                            <Text style={styles.birimFiyatText}>Fiyat</Text>
                        </View>
                        <View style={styles.flexRowJustSpaBet}>
                            <View style={styles.flexRowAlgnBasln}>
                                <Text style={styles.toplamTutar}>₺10</Text>
                                <Text style={styles.odenecekText}> / Ödenecek</Text>
                            </View>
                            <View style={styles.flexRowAlgnBasln}>
                                <Text style={styles.toplamTutar}>₺5</Text>
                                <Text style={styles.odenecekText}> / birim</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.bottomContainer}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <TouchableOpacity onPress={() => {
                            if (loopAmount > 1) {
                                setLoopAmount(loopAmount - 1)
                            } else {
                                setLoopAmount(1)
                                Alert.alert("Sorun", "Miktar 1'den küçük olamaz")
                            }

                        }}>
                            <Image source={require('../../assets/icons/downButton.png')} style={styles.downBtn} />
                        </TouchableOpacity>
                        <Text style={styles.loopAmount}>{loopAmount}</Text>
                        <TouchableOpacity onPress={() => {
                            if (loopAmount < 10) {
                                setLoopAmount(loopAmount + 1)
                            } else {
                                setLoopAmount(10)
                                Alert.alert("Sorun", "Çabanızı görüyoruz ama maalesef miktar 10'dan büyük olamaz")
                            }

                        }}>
                            <Image source={require('../../assets/icons/upButton.png')} style={styles.downBtn} />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity
                            style={[styles.takviyeBtn, yukleniyor && { opacity: 0.6 }]}
                            disabled={yukleniyor}
                            onPress={async () => {
                                if (!userData || !userData.id) {
                                    Alert.alert('Hata', 'Kullanıcı bilgisi alınamadı.');
                                    return;
                                }
                                setYukleniyor(true);
                                try {
                                    const sonuc = await takviyeYap(
                                        userData.id,
                                        modalData.title,
                                        loopAmount
                                    );
                                    if (sonuc.error === false) {
                                        setMevcutDoluluk(sonuc.yeni_doluluk);
                                        setTebrikler(true);
                                        Alert.alert(
                                            'Mama Döküldü! 🎉',
                                            `Sokak hayvanlarına desteğinizi verdiniz, teşekkürler :)\n\nYeni doluluk: %${sonuc.yeni_doluluk}\nKalan bakiye: ₺${parseFloat(sonuc.yeni_bakiye).toFixed(2)}`,
                                            [{ text: 'Teşekkürler', onPress: () => navigation.navigate('TabGroup') }]
                                        );
                                    } else {
                                        Alert.alert('Hata', sonuc.message || 'Takviye yapılırken bir sorun oluştu.');
                                    }
                                } catch (e) {
                                    Alert.alert('Bağlantı Hatası', 'Sunucuya ulaşılamadı. Lütfen tekrar deneyin.');
                                } finally {
                                    setYukleniyor(false);
                                }
                            }}
                        >
                            {yukleniyor
                                ? <ActivityIndicator color="#fff" />
                                : <Text style={styles.takviyeBtnText}>Takviye Yap</Text>
                            }
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </>
    );
};



export default FeederDetail;
