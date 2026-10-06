import React, {useContext, useState} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import AuthContext from "../../context/AuthContext";
import MenuHeader from "../../component/Header/MenuHeader";
import {MuseoModerno_700Bold} from "@expo-google-fonts/museomoderno";
import Checkbox from 'expo-checkbox';
import {bakiyeYukle} from "../../util/AuthAPI";
import Loading from "../../component/Loading";
import LanguageContext from "../../context/LanguageContext";

const AddBalance = ({navigation}) => {
    const {userData} = useContext(AuthContext);
    const [checked,setChecked] = useState(false);
    const [selectedButton, setSelectedButton] = useState(null);
    const [loading, setLoading] = useState(false);
    const {i18n} = useContext(LanguageContext);

    const handleButtonPress = (buttonIndex) => {
        setSelectedButton(buttonIndex);
    };

    return (
        <View style={styles.container}>
            {
                loading ? (<Loading/>) : (
                    <>
                        <MenuHeader title={i18n.t('bakiyeYukle')}/>
                        <View style={styles.bakiyeContainer}>
                            <Text style={styles.toplamBakiye}>{i18n.t('cuzdanBakiyem')}</Text>
                            <Text style={styles.cuzdanBakiyesi}>₺{userData.bakiye}</Text>
                        </View>
                        <View style={[styles.bakiyeContainer,{marginTop:20}]}>
                            <Text style={styles.toplamBakiye}>{i18n.t('yuklemekIstediginTutariSec')}</Text>
                        </View>
                        <View style={styles.bakiyeButonlariContainer}>
                            <TouchableOpacity style={selectedButton === 0 ? styles.selectedButton : styles.bakiyeButonu} onPress={() => handleButtonPress(0)}>
                                <Text style={selectedButton === 0 ? styles.selectedBakiyeButonuText : styles.bakiyeButonuText}>₺50</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={selectedButton === 1 ? styles.selectedButton : styles.bakiyeButonu} onPress={() => handleButtonPress(1)}>
                                <Text style={selectedButton === 1? styles.selectedBakiyeButonuText : styles.bakiyeButonuText}>₺100</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={selectedButton === 2 ? styles.selectedButton : styles.bakiyeButonu} onPress={() => handleButtonPress(2)}>
                                <Text style={selectedButton === 2 ? styles.selectedBakiyeButonuText : styles.bakiyeButonuText} >₺200</Text>
                            </TouchableOpacity>
                        </View>


                        <View style={styles.bottomContainer}>
                            <View style={{flexDirection:'row',width:'90%'}}>
                                <Checkbox
                                    value={checked}
                                    onValueChange={setChecked}
                                    style={styles.checkbox}
                                    color={checked ? '#00C4E4' : undefined}
                                />
                                <Text style={styles.beyanText}>{i18n.t('bakiyeGonderimSartlariText')}</Text>
                            </View>
                            <TouchableOpacity
                                style={[styles.button,{opacity: !checked ? 0.6 : 'undefined'}]}
                                disabled={!checked}
                                onPress={async ()=> {
                                    setLoading(true)
                                    let tutar;
                                    if (selectedButton===null) {
                                        Alert.alert("Hata!",i18n.t('yuklemekIstediginTutariSec'));
                                        setLoading(false);
                                        return false;
                                    }
                                    if (selectedButton===0) {
                                        tutar = 50;
                                    }else if(selectedButton===1) {
                                        tutar = 100;
                                    }else if (selectedButton===2) {
                                        tutar = 200;
                                    }
                                    const yukle = await bakiyeYukle(userData.id,tutar);
                                    if (yukle===true) {
                                        navigation.navigate('BalanceAddSuccessfull')
                                    }else {
                                        navigation.navigate('HomeScreen')
                                    }
                                }}
                            >
                                <Text style={styles.loginText}>{i18n.t('bakiyeYukle')}</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )
            }


        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:24
    },
    checkbox:{
        width:20,
        height:20,
        borderWidth:1,
        borderColor:'#00C4E4',
        marginRight:10,
        justifyContent:'center',
        alignSelf:'center'
    },
    bakiyeContainer:{
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
    },
    bakiyeButonlariContainer:{
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center'
    },
    bakiyeButonu:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#fff',
        width:100,
        height:60,
        borderRadius:100,
        marginTop:10
    },
    selectedButton:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#00C4E4',
        width:100,
        height:60,
        borderRadius:100,
        marginTop:10
    },
    bakiyeButonuText:{
        color:'#25304E',
        fontSize:20,
        fontFamily:'MuseoModerno_400Regular'
    },
    selectedBakiyeButonuText:{
        color:'#fff',
        fontSize:20,
        fontFamily:'MuseoModerno_400Regular'
    },
    toplamBakiye:{
        color:'#25304E',
        fontSize:16,
        fontFamily:'MuseoModerno_600SemiBold',
    },
    cuzdanBakiyesi:{
        color:'#00C4E4',
        fontFamily:'MuseoModerno_700Bold',
        fontSize:24,
    },
    bakiyeYukleBtn:{
        backgroundColor:'#00C4E4',
        width:153,
        height:40,
        borderRadius:100,
        justifyContent:'center',
        alignItems:'center',
    },
    bakiyeYukleText:{
        color:'#fff',
        fontSize:16,
        fontFamily:'MuseoModerno_600SemiBold'
    },
    bottomContainer:{
        position:'absolute',
        bottom:30,
        width:'100%',
        alignSelf:'center',
    },
    beyanText:{
        fontSize:14,
        color:'#353f59',
        opacity:0.5,
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
    },


    hesabimContainer:{
        backgroundColor:'#fff',
        width:'100%',
        height:55,
        marginTop:39,
        borderRadius:100,
        flexDirection:'row',
        alignItems:'center',
        marginBottom:27
    },
    avatar:{
        width:29,
        height:29,
        position:'absolute',
        left:20
    },
    cuzdanContainer:{
        position:'absolute',
        left:67
    },
    username:{
        color:'#25304E',
        fontSize:16,
        maxWidth:220,
        fontFamily:'MuseoModerno_600SemiBold',
    },
    cuzdan:{
        color:'#6F7F95',
        fontSize:14,
        fontFamily:'MuseoModerno_400Regular',
    },
    menuItemRightIcon:{
        width:7.8,
        height:14,
        position:'absolute',
        right:21
    },
})

export default AddBalance;