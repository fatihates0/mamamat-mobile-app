//./src/screens/HomeScreen.js
import React, {useContext, useEffect} from 'react';
import {View,StyleSheet} from 'react-native';
import Map from "../component/Maps/Map";
import AuthContext from "../context/AuthContext";
import {getUserData} from "../util/AuthAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useFocusEffect} from "@react-navigation/native";
const HomeScreen = ({navigation}) => {

    const {setUserData} = useContext(AuthContext);

    useFocusEffect(
        React.useCallback(() => {
            const userDataUpdate = async () => {
                try {
                    const authToken = await AsyncStorage.getItem('authToken');
                    if (!authToken) return;
                    const newUserData = await getUserData(authToken.toLocaleString());
                    if (newUserData) {
                        await setUserData(newUserData);
                    }
                } catch (error) {
                    console.warn('Kullanıcı verisi alınamadı:', error?.message);
                }
            };

            userDataUpdate();
        }, [])
    );



  return (
      <View style={styles.container}>
          <Map/>
      </View>
  )
};

const styles = StyleSheet.create({
    container:{
        flex:1
    }
})

export default HomeScreen;
