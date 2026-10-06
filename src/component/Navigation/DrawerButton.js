import React from 'react';
import {TouchableOpacity, View} from "react-native";
import { Feather } from '@expo/vector-icons';

const DrawerButton = ({navigation}) => {
    return (
        <View style={{marginTop:50}}>
            <TouchableOpacity onPress={()=>{
                navigation.toggleDrawer();
            }}>
                <Feather name="menu" size={24} color="black" />
            </TouchableOpacity>
        </View>
    );
};

export default DrawerButton;
