import React, {useContext} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import MenuHeader from "../../component/Header/MenuHeader";
import LanguageContext from "../../context/LanguageContext";

const TakviyeTesekkurler = ({navigation}) => {
    const {i18n} = useContext(LanguageContext);
    return (
        <View style={styles.container}>
            <MenuHeader title={i18n.t('tesekkurler')}/>
            <View style={styles.successSection}>
                <Image style={styles.successImage} source={require('../../../assets/icons/success.png')} />
                <Text style={styles.successText}>{i18n.t('davetinBasariylaGonderildi')}!</Text>
                <Text style={styles.text}>{i18n.t('davetinBasariylaGonderildiText')}!</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={()=> {
                navigation.navigate('HomeScreen');
            }}>
                <Text style={styles.buttonText}>{i18n.t('anasayfa')}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:24
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

export default TakviyeTesekkurler;