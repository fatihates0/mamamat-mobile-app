import React, {useContext} from 'react';
import {Image, Platform, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import MenuHeader from "../component/Header/MenuHeader";
import LanguageContext from "../context/LanguageContext";

const GecmisTakviyeDetay = ({navigation,route}) => {
    const { gecmisTakviye } = route.params;
    const {i18n} = useContext(LanguageContext);
    return (
        <View style={{paddingHorizontal:24}}>
            <TouchableOpacity style={styles.closeLine} onPress={()=>navigation.goBack()}>
            </TouchableOpacity>
            <View style={styles.successSection}>
                <Image style={styles.successImage} source={require('../../assets/icons/success.png')} />
                <Text style={styles.successText}>{i18n.t('odemeOnaylandi')}</Text>
                <Text style={styles.text}>{i18n.t('sokakHayvanlariniYalnizBirakmadiginizicinTesekkurEderiz')}</Text>
            </View>
            <View style={styles.sipDetaySection}>
                <Text style={styles.sipDetayTitle}>{i18n.t('siparisDetayi')}:</Text>
                <Text style={styles.feederTitle}>{gecmisTakviye.feeder_id}</Text>
                <View style={styles.sipDetaylari}>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailItemLeftText}>{i18n.t('adet')} :</Text>
                        <Text style={styles.detailItemRightText}>{gecmisTakviye.adet}</Text>
                    </View>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailItemLeftText}>{i18n.t('birimFiyat')} :</Text>
                        <Text style={styles.detailItemRightText}>{gecmisTakviye.tutar / gecmisTakviye.adet}₺</Text>
                    </View>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailItemLeftText}>{i18n.t('toplamTutar')} :</Text>
                        <Text style={styles.detailItemRightText}>{gecmisTakviye.tutar}₺</Text>
                    </View>
                </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={()=> {
                navigation.goBack()
            }}>
                <Text style={styles.buttonText}>{i18n.t('kapat')}</Text>
            </TouchableOpacity>
        </View>
    );
};
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#F5F6FD',
        paddingHorizontal:24
    },
    closeLine:{
        backgroundColor:'rgba(147, 226, 243, 0.61)',
        width:63,
        height:5,
        alignSelf:'center',
        marginTop:20,
        borderRadius:10
    },
    successSection:{
        alignItems:'center',
        justifyContent:'center',
        marginTop:30
    },
    successImage:{
        width:100,
        height:105,
        marginBottom:30
    },
    successText:{
        color:'#25304E',
        fontFamily:'MuseoModerno_700Bold',
        fontSize:20,
        marginBottom:10
    },
    text:{
        color:'#25304E',
        fontFamily:'MuseoModerno_400Regular',
        fontSize:14,
        opacity:0.5,
        textAlign:'center'
    },
    sipDetaySection:{
        marginTop:50
    },
    sipDetayTitle:{
        color:'#25304E',
        fontFamily:'MuseoModerno_700Bold',
        fontSize:20,
        textAlign:'center',
        marginBottom:30
    },
    feederTitle:{
        color:'#25304E',
        fontFamily:'MuseoModerno_700Bold',
        fontSize:22,
    },
    sipDetaylari:{
        marginTop:10
    },
    detailItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    detailItemLeftText:{
        color:'#25304E',
        fontFamily:'MuseoModerno_500Medium',
        fontSize:13
    },
    detailItemRightText:{
        color:'#25304E',
        opacity:0.5,
        fontFamily:'MuseoModerno_400Regular',
        fontSize:13
    },
    button:{
        backgroundColor:'#00C4E4',
        padding:10,
        borderRadius:100,
        marginTop:25
    },
    buttonText:{
        justifyContent:'center',
        alignSelf:'center',
        fontFamily:'MuseoModerno_600SemiBold',
        color:'#ffffff',
        fontSize:16
    }
});
export default GecmisTakviyeDetay;