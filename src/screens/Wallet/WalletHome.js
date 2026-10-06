import React, {useContext} from 'react';
import {Text, TouchableOpacity, View, StyleSheet, Image} from "react-native";
import MenuHeader from "../../component/Header/MenuHeader";
import AuthContext from "../../context/AuthContext";
import LanguageContext from "../../context/LanguageContext";

const WalletHome = ({navigation}) => {
    const {userData} = useContext(AuthContext);
    const {i18n} = useContext(LanguageContext);
    return (
        <View style={styles.container}>
            <MenuHeader title={i18n.t('cuzdanim')}/>
            <View style={styles.bakiyeContainer}>
                <View>
                    <Text style={styles.cuzdanBakiyesiText}>{i18n.t('bakiye')}</Text>
                    <Text style={styles.cuzdanBakiyesi}>₺{userData.bakiye}</Text>
                </View>
                <TouchableOpacity style={styles.bakiyeYukleBtn} onPress={()=>{
                    navigation.navigate('AddBalance');
                }}>
                    <Text style={styles.bakiyeYukleText}>{i18n.t('bakiyeYukle')}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.hesabimContainer}>
                <Image source={require('../../../assets/icons/menu/cuzdan.png')} style={styles.avatar}/>
                <View style={styles.cuzdanContainer}>
                    <Text style={styles.username}>{i18n.t('arkadasinaBakiyeGonder')}!</Text>
                </View>
                <Image source={require('../../../assets/icons/menu/rightBtn.png')} style={styles.menuItemRightIcon}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        paddingHorizontal:24
    },
    bakiyeContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    cuzdanBakiyesiText:{
        color:'#25304E',
        fontFamily:'MuseoModerno_600SemiBold',
        fontSize:16,
    },
    cuzdanBakiyesi:{
        color:'#00C4E4',
        fontFamily:'MuseoModerno_600SemiBold',
        fontSize:24,
        marginTop:-10
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

export default WalletHome;
