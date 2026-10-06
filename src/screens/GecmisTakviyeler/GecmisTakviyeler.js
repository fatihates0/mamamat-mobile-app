import React, {useContext, useEffect, useState} from 'react';
import {FlatList, RefreshControl, ScrollView, StyleSheet, Text, View} from "react-native";
import MenuHeader from "../../component/Header/MenuHeader";
import {useFocusEffect} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {gecmisKullanimlariListele, getUserData} from "../../util/AuthAPI";
import GecmisTakviyelerItem from "../../component/Menu/GecmisTakviyelerItem";
import Loading from "../../component/Loading";
import LanguageContext from "../../context/LanguageContext";

const GecmisTakviyeler = () => {
    const [gecmisTakviyeler,setGecmisTakviyeler] = useState(null)
    const [loading,setLoading] = useState(null)
    const {i18n} = useContext(LanguageContext);

    useEffect(() => {
        gecmisKullanimlariGetir();
    }, []);

    const gecmisKullanimlariGetir = async () => {
        setLoading(true)
        const authToken = await AsyncStorage.getItem('authToken');
        const gecmisTakviyelerSonuc = await gecmisKullanimlariListele(authToken.toLocaleString());
        if (gecmisTakviyelerSonuc===[]){
            setGecmisTakviyeler(false)
        }
        await setGecmisTakviyeler(gecmisTakviyelerSonuc)
        setLoading(false)
    };


    return (
        <View style={styles.container}>
            {
                loading && <Loading/>
            }
            <MenuHeader title={i18n.t('gecmisTakviyeler')}/>
            {
                gecmisTakviyeler && (
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        style={{maxHeight:'80%'}}
                        refreshControl={
                            <RefreshControl refreshing={loading} onRefresh={() => gecmisKullanimlariGetir()} />
                        }
                        data={gecmisTakviyeler}
                        renderItem={({ item, index }) => (
                            <GecmisTakviyelerItem gecmisTakviye={item} />
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                )
            }
            {
                gecmisTakviyeler == false ? (
                    <ScrollView
                        refreshControl={
                            <RefreshControl refreshing={loading} onRefresh={() => gecmisKullanimlariGetir()} />
                        }
                    >
                        <Text style={{ justifyContent: 'center', alignSelf: 'center' }}>{i18n.t('hicTakviyenizYok')}</Text>
                    </ScrollView>
                ) : (<View></View>)
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
    },
});


export default GecmisTakviyeler;