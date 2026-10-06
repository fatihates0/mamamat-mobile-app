import LoginScreen from "../screens/LoginRegister/LoginScreen";
import {createStackNavigator} from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import SmsVerification from "../screens/LoginRegister/SmsVerification";
import {Text} from "react-native";
import PhoneScreen from "../screens/PhoneScreen";

const Stack = createStackNavigator();

const AuthStack = () => (
    <Stack.Navigator initialRouteName="LoginScreen" screenOptions={{
        headerShown:false
    }}>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="PhoneScreen" component={PhoneScreen} />
        <Stack.Screen name="SmsVerification" component={SmsVerification} />
    </Stack.Navigator>
);

export default AuthStack;
