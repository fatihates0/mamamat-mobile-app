import React from 'react';
import {Button, StyleSheet, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {Feather} from "@expo/vector-icons";

const OpenDrawerButton = () => {
    const navigation = useNavigation();
    return (
        <View>
            <Feather style={styles.icon} name="menu" onPress={()=> {
                navigation.toggleDrawer();
            }}/>
        </View>
    );
};

const styles = StyleSheet.create({
    icon:{
        marginLeft:10,
        fontSize:30
    }
})

export default OpenDrawerButton;
