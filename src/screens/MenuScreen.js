import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity, ScrollView, StatusBar} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthContext from "../context/AuthContext";
import {getUserData} from "../util/AuthAPI";
import {useFocusEffect} from "@react-navigation/native";
import LanguageContext from "../context/LanguageContext";
import Loading from "../component/Loading";

const MenuScreen = ({navigation}) => {
    const {loggedIn,setLoggedIn,userData,setUserData} = useContext(AuthContext);
    const {i18n} = useContext(LanguageContext);
    const [loading,setLoading] = useState(true);

    useFocusEffect(
        React.useCallback(() => {
            const userDataUpdate = async () => {
                const authToken = await AsyncStorage.getItem('authToken');
                const newUserData = await getUserData(authToken.toLocaleString());
                await setUserData(newUserData)
            };

            userDataUpdate();
        }, [])
    );

    const logoutOl = async () => {
        try {
            // AsyncStorage üzerindeki authToken'ı kaldır
            await AsyncStorage.removeItem('authToken');
            // loggedIn state'ini güncelle
            setLoggedIn(false);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <View style={styles.container}>
            <View style={{marginTop:46}}>
                <TouchableOpacity onPress={()=>{
                    navigation.goBack()
                }}>
                    <Image style={{ width: 24, height: 24, marginLeft: 21,marginTop:4}} source={require('../../assets/icons/backBtn.png')} />
                </TouchableOpacity>
                <Text style={styles.pageHeaderTitle}>{i18n.t('hesabim')}</Text>
            </View>
            <View style={styles.hesabimContainer}>
                <Image source={require('../../assets/icons/menu/cat.png')} style={styles.avatar}/>
                <View style={styles.cuzdanContainer}>
                    <Text style={styles.username}>Fatih Ateş</Text>
                    <Text style={styles.cuzdan}>{i18n.t('bakiye')}: {userData && userData.bakiye} ₺</Text>
                </View>
                <TouchableOpacity style={{position:'absolute',right:23}} onPress={()=>{
                    navigation.navigate('ProfilUpdate')
                }}>
                    <Image source={require('../../assets/icons/editbtn.png')} style={styles.editBtn}/>
                </TouchableOpacity>
            </View>
            <ScrollView>
                <TouchableOpacity style={styles.menuItemContainer} onPress={()=>{navigation.navigate('WalletHome')}}>
                    <Image source={require('../../assets/icons/menu/cuzdan.png')} style={styles.menuItemLeftIcon}/>
                    <View style={styles.menuItemTitleContainer}>
                        <Text style={styles.menuBtnText}>{i18n.t('cuzdanim')}</Text>
                    </View>
                    <Image source={require('../../assets/icons/menu/rightBtn.png')} style={styles.menuItemRightIcon}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItemContainer} onPress={()=>{navigation.navigate('NotificationStack')}}>
                    <Image source={require('../../assets/icons/menu/notification.png')} style={styles.menuItemLeftIcon}/>
                    <View style={styles.menuItemTitleContainer}>
                        <Text style={styles.menuBtnText}>{i18n.t('bildirimler')}</Text>
                    </View>
                    <Image source={require('../../assets/icons/menu/rightBtn.png')} style={styles.menuItemRightIcon}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItemContainer} onPress={()=>{navigation.navigate('GecmisTakviyeler')}}>
                    <Image source={require('../../assets/icons/menu/gecmis.png')} style={styles.menuItemLeftIcon}/>
                    <View style={styles.menuItemTitleContainer}>
                        <Text style={styles.menuBtnText}>{i18n.t('gecmisTakviyeler')}</Text>
                    </View>
                    <Image source={require('../../assets/icons/menu/rightBtn.png')} style={styles.menuItemRightIcon}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItemContainer} onPress={()=>{navigation.navigate('ArkadaslariniDavetEt')}}>
                    <Image source={require('../../assets/icons/menu/friends.png')} style={styles.menuItemLeftIcon}/>
                    <View style={styles.menuItemTitleContainer}>
                        <Text style={styles.menuBtnText}>{i18n.t('arkadaslariniDavetEt')}</Text>
                    </View>
                    <Image source={require('../../assets/icons/menu/rightBtn.png')} style={styles.menuItemRightIcon}/>
                </TouchableOpacity>
                <View style={styles.menuItemContainer}>
                    <Image source={require('../../assets/icons/menu/help.png')} style={styles.menuItemLeftIcon}/>
                    <View style={styles.menuItemTitleContainer}>
                        <Text style={styles.menuBtnText}>{i18n.t('sikcaSorulanSorular')}</Text>
                    </View>
                    <Image source={require('../../assets/icons/menu/rightBtn.png')} style={styles.menuItemRightIcon}/>
                </View>
                <TouchableOpacity style={styles.menuItemContainer} onPress={()=>{navigation.navigate('SelectLanguageScreen')}}>
                    <Image source={require('../../assets/icons/menu/language.png')} style={styles.menuItemLeftIcon}/>
                    <View style={styles.menuItemTitleContainer}>
                        <Text style={styles.menuBtnText}>{i18n.t('dilSecenekleri')}</Text>
                    </View>
                    <Image source={require('../../assets/icons/menu/rightBtn.png')} style={styles.menuItemRightIcon}/>
                </TouchableOpacity>
                <View style={styles.menuItemContainer}>
                    <Image source={require('../../assets/icons/menu/settings.png')} style={styles.menuItemLeftIcon}/>
                    <View style={styles.menuItemTitleContainer}>
                        <Text style={styles.menuBtnText}>{i18n.t('erisimSecenekleri')}</Text>
                    </View>
                    <Image source={require('../../assets/icons/menu/rightBtn.png')} style={styles.menuItemRightIcon}/>
                </View>
                <View style={styles.menuItemContainer}>
                    <Image source={require('../../assets/icons/menu/phone.png')} style={styles.menuItemLeftIcon}/>
                    <View style={styles.menuItemTitleContainer}>
                        <Text style={styles.menuBtnText}>{i18n.t('bizeUlasin')}</Text>
                    </View>
                    <Image source={require('../../assets/icons/menu/rightBtn.png')} style={styles.menuItemRightIcon}/>
                </View>
                <View style={styles.menuItemContainer}>
                    <Image source={require('../../assets/icons/menu/sozlesmeler.png')} style={styles.menuItemLeftIcon}/>
                    <View style={styles.menuItemTitleContainer}>
                        <Text style={styles.menuBtnText}>{i18n.t('sozlesmeler')}</Text>
                    </View>
                    <Image source={require('../../assets/icons/menu/rightBtn.png')} style={styles.menuItemRightIcon}/>
                </View>
                <TouchableOpacity style={styles.menuItemContainer} onPress={()=> {
                    logoutOl()
                } }>
                    <Image source={require('../../assets/icons/menu/logout.png')} style={styles.menuItemLeftIcon}/>
                    <View style={styles.menuItemTitleContainer}>
                        <Text style={styles.menuBtnText}>{i18n.t('cikisYap')}</Text>
                    </View>
                    <Image source={require('../../assets/icons/menu/rightBtn.png')} style={styles.menuItemRightIcon}/>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#F5F6FD',
        paddingHorizontal:15
    },
    pageHeaderTitle:{
        fontFamily:'MuseoModerno_700Bold',
        fontSize:20,
        position:'absolute',
        alignSelf:'center'
    },
    hesabimContainer:{
        backgroundColor:'#fff',
        width:'100%',
        height:85,
        marginTop:39,
        borderRadius:100,
        flexDirection:'row',
        alignItems:'center',
        marginBottom:27
    },
    avatar:{
        width:40,
        height:40,
        position:'absolute',
        left:20
    },
    cuzdanContainer:{
        position:'absolute',
        left:80
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
    editBtn:{
        width:20,
        height:20,
    },
    menuItemContainer:{
        backgroundColor:'#fff',
        width:'100%',
        height:44,
        marginBottom:6,
        borderRadius:100,
        flexDirection:'row',
        alignItems:'center'
    },
    menuItemLeftIcon:{
        width:20,
        height:20,
        position:'absolute',
        left:13
    },
    menuItemTitleContainer:{
        position:'absolute',
        left:45
    },
    menuBtnText:{
        color:'#25304E',
        fontSize:16,
        fontFamily:'MuseoModerno_600SemiBold',
    },
    menuItemRightIcon:{
        width:7.8,
        height:14,
        position:'absolute',
        right:21
    },

});

export default MenuScreen;
