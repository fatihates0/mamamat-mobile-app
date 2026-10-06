import {createStackNavigator} from "@react-navigation/stack";
import NotificationsScreen from "../screens/Notifications/NotificationsScreen";

const Stack = createStackNavigator();

const NotificationStack = () => (
    <Stack.Navigator initialRouteName="NotificationsScreen" screenOptions={{
        headerShown:false,
        headerTitleAlign:'center',
    }}>
        <Stack.Screen name="NotificationsScreen" component={NotificationsScreen} />
    </Stack.Navigator>
);

export default NotificationStack;

