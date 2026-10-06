import AuthStack from "./navigation/AuthStack";
import { NavigationContainer } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "./component/Loading";
import AuthContext from "./context/AuthContext";
import { DrawerNavigation } from "./navigation/DrawerNavigation";
import {Platform, StatusBar, Text} from "react-native";
import * as Location from "expo-location";
import { getFeeders } from "./util/AuthAPI";
import { kacMetre } from "./util/mesafeOlc";
import HomeStack from "./navigation/HomeStack";

//Languages
import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';
import translation from "./languages/languages";
import LanguageContext from "./context/LanguageContext";


export const Route = ({linking}) => {

    const {
        loggedIn,
        setLoggedIn,
        location,
        setLocation,
        marker,
        setMarker,
        setFilteredMarkers,
    } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState(null);
    const {setLanguage} = useContext(LanguageContext);

    useEffect(() => {
        const checkLanguage = async () => {
            try {
                const storageLanguage = await AsyncStorage.getItem('selectedLanguage');
                if (storageLanguage !== null) {
                    setLanguage(storageLanguage.toLocaleString());
                }else{
                    AsyncStorage.setItem('selectedLanguage','tr');
                    setLanguage("tr");
                }
            }catch (e) {
                console.log(e)
            }
        }

        checkLanguage();


        const checkLoginStatus = async () => {
            try {
                const value = await AsyncStorage.getItem("authToken");
                if (value !== null) {
                    setLoggedIn(true);
                }
            } catch (e) {
                console.log(e);
            }
        };

        checkLoginStatus();


        const fetchLocationAndMarkers = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                setErrorMsg("Permission to access location was denied");
                return;
            }

            const konum = await Location.getCurrentPositionAsync({
                maximumAge: 60000, // only for Android
                accuracy: Platform.OS == 'android' ? Location.Accuracy.Low : Location.Accuracy.Lowest,
            })
            setLocation(konum);

            const cihazlar = await getFeeders();
            setMarker(cihazlar);
        };

        fetchLocationAndMarkers();
    }, []);

    useEffect(() => {
        if (location && marker.length > 0) {
            const filteredMarkers = marker.filter((marker) => {
                const distance = kacMetre(
                    location.coords.latitude,
                    location.coords.longitude,
                    marker.latlng.latitude,
                    marker.latlng.longitude
                );
                return distance <= 330; // 3km ile filtrele
            });

            const sortedMarkers = filteredMarkers.sort((marker1, marker2) => {
                const distance1 = kacMetre(
                    location.coords.latitude,
                    location.coords.longitude,
                    marker1.latlng.latitude,
                    marker1.latlng.longitude
                );
                const distance2 = kacMetre(
                    location.coords.latitude,
                    location.coords.longitude,
                    marker2.latlng.latitude,
                    marker2.latlng.longitude
                );
                return distance1 - distance2;
            });

            setFilteredMarkers(sortedMarkers);
            setLoading(false);
        }
    }, [location, marker]);

    if (errorMsg) {
        return <Text>{errorMsg}</Text>;
    }

    if (loading) {
        return <Loading />;
    }

    return (
        <NavigationContainer linking={linking}>
            <StatusBar barStyle="automatic" />
            {loggedIn ? <HomeStack /> : <AuthStack />}
        </NavigationContainer>
    );
};
