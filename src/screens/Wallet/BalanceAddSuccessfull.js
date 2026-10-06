import React, {useContext} from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from "react-native";
import MenuHeader from "../../component/Header/MenuHeader";
import Checkbox from "expo-checkbox";
import AuthContext from "../../context/AuthContext";
import LanguageContext from "../../context/LanguageContext";

const BalanceAddSuccessfull = ({navigation}) => {
    const {i18n} = useContext(LanguageContext);
    return (
        <View style={styles.container}>
            <MenuHeader title={i18n.t('bakiyeYukle')}/>
            <View style={styles.successSection}>
                <Image style={styles.successImage} source={require('../../../assets/icons/success.png')} />
                <Text style={styles.successText}>{i18n.t('bakiyeBasariylaYuklendi')}!</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={()=> {
                navigation.navigate('HomeScreen');
            }}>
                <Text style={styles.buttonText}>{i18n.t('takviyeYap')}</Text>
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
        fontSize:20
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

export default BalanceAddSuccessfull;