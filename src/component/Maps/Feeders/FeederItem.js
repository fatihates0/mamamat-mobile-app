import React, {useContext, useEffect, useState} from 'react';
import {Button, Image, Pressable, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {
    MuseoModerno_400Regular,
    MuseoModerno_500Medium,
    MuseoModerno_600SemiBold,
    MuseoModerno_700Bold,
    useFonts
} from "@expo-google-fonts/museomoderno";
import {useNavigation} from "@react-navigation/native";
import AuthContext from "../../../context/AuthContext";
import {kacDakika, kacMetre} from "../../../util/mesafeOlc";
import translation from "../../../languages/languages";
import LanguageContext from "../../../context/LanguageContext";
import {I18n} from "i18n-js";

const FeederItem = ({item,map,cardwidth}) => {
    const navigation = useNavigation();
    const {visibleModal,setVisibleModal,setModalData} = useContext(AuthContext);
    const { location } = useContext(AuthContext);

    const {i18n} = useContext(LanguageContext);


    let [fontsLoaded] = useFonts({
        MuseoModerno_400Regular,
        MuseoModerno_500Medium,
        MuseoModerno_600SemiBold,
        MuseoModerno_700Bold,
    });

    const feederItemDetail = ()=>{
        setVisibleModal(1);
        setModalData(item)
    }


    if (!fontsLoaded) {
        return null; // Font yüklenene kadar ekranda bir şey gösterme
    }

    if (!location) {
        return null; // Font yüklenene kadar ekranda bir şey gösterme
    }



    const distance = kacMetre(
        location.coords.latitude,
        location.coords.longitude,
        item.latlng.latitude,
        item.latlng.longitude
    );

    const dynamicWidth = item ? item.doluluk : 0;
    const styles = StyleSheet.create({
        itemContainer: {
            elevation: 2,
            backgroundColor: "#FFF",
            borderRadius:20,
            shadowColor: "#000",
            shadowRadius: 5,
            shadowOpacity: 0.3,
            shadowOffset: { x: 2, y: -2 },
            width: cardwidth,
            height: 130,
            overflow: "hidden",
            padding:10,
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
            marginLeft:7
        },

        locationContainer:{
            flexDirection:'row',
            justifyContent:'flex-start',
            alignItems:'center',
            marginTop:10,
            marginLeft:6
        },
        locationIcon:{
            width:16,
            height:16
        },
        locationText:{
            fontFamily:'MuseoModerno_400Regular',
            fontSize:13,
            paddingLeft:3
        },
        dolulukContainer:{
            height:30,
            flexDirection:'row',
            alignItems:'center',
            position:'absolute',
            bottom:20,
            left:76
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
            fontSize:15
        },
    })
    return (
        <View style={styles.itemContainer}>
            <View style={styles.idContainer}>
                <Text style={styles.textID}>{item.title}</Text>
                <Image style={styles.feederIcon} source={require('../../../../assets/icons/feederIcon.png')}/>
            </View>
            <View style={styles.locationContainer}>
                <Image style={styles.locationIcon} source={require('../../../../assets/icons/location.png')} />
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

            <View style={styles.dolulukContainer}>
                <View style={{position:'relative',top:7}}>
                    <View style={styles.dolulukYuzde1}></View>
                    <View style={styles.dolulukYuzde2}></View>
                </View>
                <Text style={styles.doluluk}>%{item.doluluk}</Text>
            </View>
        </View>
    );
};



export default FeederItem;
