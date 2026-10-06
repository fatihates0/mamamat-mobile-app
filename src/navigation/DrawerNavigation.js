import HomeStack from "./HomeStack";
import React from "react";
import {createDrawerNavigator} from "@react-navigation/drawer";
import AboutScreen from "../screens/AboutScreen";

const Drawer = createDrawerNavigator();

export const DrawerNavigation = () => {
    return (
        <Drawer.Navigator initialRouteName="Anasayfa" screenOptions={{ headerShown: false }}>
            <Drawer.Screen name="Anasayfa" component={HomeStack} />
            <Drawer.Screen name="AboutScreen" component={AboutScreen} />
        </Drawer.Navigator>
    )
}
