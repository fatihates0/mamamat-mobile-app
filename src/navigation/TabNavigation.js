import React from 'react';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import DrawerButton from "../component/Navigation/DrawerButton";
import HomeScreen from "../screens/HomeScreen";
import {Image, TouchableOpacity} from "react-native";
import MenuScreen from "../screens/MenuScreen";
import QrScreen from "../screens/Qr/QrScreen";


const TabNavigation = () => {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false, // Kaldırılabilir
                tabBarStyle: {
                    height: 80,
                    borderTopRightRadius: 20,
                    borderTopLeftRadius: 20,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 3,
                    },
                    shadowOpacity: 0.29,
                    shadowRadius: 4.65,
                    elevation: 7,
                    paddingBottom: 15,
                }
            }}
        >
            <Tab.Screen options={{
                tabBarIcon:()=>(
                    <Image style={{width:24.89,height:24.89}} source={require('../../assets/icons/homeBtn.png')} />
                ),
                tabBarShowLabel:false
            }} name="HomeScreen" component={HomeScreen} />
            <Tab.Screen options={{
                tabBarIcon:()=>(
                    <Image style={{width:46.31,height:46.31}} source={require('../../assets/icons/qrBtn.png')} />
                ),
                tabBarShowLabel:false,
            }} name="QrTaraScreen" component={QrScreen} />
            <Tab.Screen options={{
                tabBarIcon:()=>(
                    <Image style={{width:19.80,height:19.80}} source={require('../../assets/icons/drawerBtn.png')} />
                ),
                tabBarShowLabel:false,
            }} name="MenuScreen" component={MenuScreen} />
        </Tab.Navigator>
    );
};

export default TabNavigation;
