// NotificationUtil.js
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import {saveNotifiId} from "./AuthAPI";

export async function registerForPushNotificationsAsync() {
    let token;

    if (Device.isDevice) {
        try {
            token = await Notifications.getExpoPushTokenAsync({
                projectId: Constants.expoConfig.extra.eas.projectId,
            });

            if (!token || !token.data) {
                console.warn('Push notification token could not be obtained (Expo Go does not support push notifications since SDK 53). Skipping saveNotifiId.');
                return null;
            }

            await saveNotifiId(token.data);
            return token.data;
        } catch (e) {
            console.warn('Push notification registration failed (expected in Expo Go):', e.message);
            return null;
        }
    }
}

export function setupNotificationListeners(notificationHandler, responseHandler) {
    const notificationListener = Notifications.addNotificationReceivedListener(notification => {
        notificationHandler(notification);
    });

    const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
        responseHandler(response);
    });

    return { notificationListener, responseListener };
}
