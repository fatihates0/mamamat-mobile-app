import React, {useContext} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import MenuHeader from "../../component/Header/MenuHeader";
import LanguageContext from "../../context/LanguageContext";

const SelectLanguageScreen = ({navigation}) => {
    const {i18n,language,setLanguage} = useContext(LanguageContext);

    const languageChange = async (secilenDil) => {
        try {
            AsyncStorage.setItem('selectedLanguage',secilenDil);
            setLanguage(secilenDil);
        }catch (e) {
            console.log(e)
        }
    }

    return (
        <View style={styles.container}>
            <MenuHeader title={i18n.t('dilSecenekleri')} />
            <View>
                <TouchableOpacity style={styles.menuItemContainer} onPress={()=>{languageChange("tr")}}>
                    <View style={styles.menuItemTitleContainer}>
                        <Text style={styles.menuBtnText}>{i18n.t("turkce")}</Text>
                    </View>
                    {
                        language === 'tr' && (
                            <Image source={require('../../../assets/icons/verified.png')} style={styles.menuItemRightIcon}/>
                        )
                    }
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItemContainer} onPress={()=>{languageChange("en")}}>
                    <View style={styles.menuItemTitleContainer}>
                        <Text style={styles.menuBtnText}>{i18n.t("ingilizce")}</Text>
                    </View>
                    {
                        language === 'en' && (
                            <Image source={require('../../../assets/icons/verified.png')} style={styles.menuItemRightIcon}/>
                        )
                    }
                </TouchableOpacity>
            </View>
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
        position:'absolute',
        right:23
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
        left:21
    },
    menuBtnText:{
        color:'#25304E',
        fontSize:16,
        fontFamily:'MuseoModerno_600SemiBold',
    },
    menuItemRightIcon:{
        width:20,
        height:20,
        position:'absolute',
        right:21
    },

});

export default SelectLanguageScreen;
