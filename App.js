// App.js
import React, {useState, useEffect, useRef, useContext} from 'react';
import { AuthContextProvider } from "./src/context/AuthContext";
import { Route } from "./src/Route";
import { NativeBaseProvider } from "native-base";
import { registerForPushNotificationsAsync, setupNotificationListeners } from './src/util/NotificationUtil';
import * as Linking from 'expo-linking';
import {LanguageContextProvider} from "./src/context/LanguageContext";
import * as Notifications from "expo-notifications";


const prefix = Linking.createURL('/');

const App = () => {
    //DeepLinking
    const linking = {
        prefixes: [prefix]
    }

    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        const { notificationListener: nl, responseListener: rl } = setupNotificationListeners(
            notification => setNotification(notification),
            response => console.log(response)
        );

        notificationListener.current = nl;
        responseListener.current = rl;

        return () => {
            if (notificationListener.current) {
                Notifications.removeNotificationSubscription(notificationListener.current);
            }
            if (responseListener.current) {
                Notifications.removeNotificationSubscription(responseListener.current);
            }
        };
    }, []);

    return (
        <LanguageContextProvider>
            <AuthContextProvider>
                <NativeBaseProvider>
                    <Route linking={linking} />
                </NativeBaseProvider>
            </AuthContextProvider>
        </LanguageContextProvider>
    );
};

export default App;
