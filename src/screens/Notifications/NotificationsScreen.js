import React, {useContext} from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    Text,
    RefreshControl,
    ScrollView,
    TouchableOpacity, Alert
} from "react-native";
import MenuHeader from "../../component/Header/MenuHeader";
import NotificationItem from "../../component/Menu/NotificationItem";
import * as Device from 'expo-device';
import Loading from "../../component/Loading";
import {getAllNotification, deleteNotification} from "../../util/AuthAPI";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import LanguageContext from "../../context/LanguageContext";


export default class NotificationsScreen extends React.Component {
    static contextType = LanguageContext;
    constructor(props) {
        super(props);

        this.state = {
            notifications: null,
            loading: true,
            expoPushToken: null,
        };
    }

    componentDidMount() {
        this.getNotifications();
    }

    getExpoPushToken = async () => {
        let token;
        token = await Notifications.getExpoPushTokenAsync({
            projectId: Constants.expoConfig.extra.eas.projectId,
        });

        this.setState({ expoPushToken: token.data });
    }

    getNotifications = async () => {
        try {
            if (Device.isDevice) {
                this.setState({ loading: true });
                await this.getExpoPushToken();
                const { expoPushToken } = this.state;

                if (expoPushToken != null) {
                    this.setState({ notifications: null });
                    const resNotifi = await getAllNotification(expoPushToken);
                    if (resNotifi.status === true && resNotifi.count > 0) {
                        this.setState({ notifications: resNotifi.data });
                    }
                }
            }else{
                Alert.alert(this.context.i18n.t('hata'),this.context.i18n.t('similatordenErisemezsin'));
                this.props.navigation.goBack();
            }
        } catch (error) {
            console.error("Error while getting notifications:", error);
        } finally {
            this.setState({ loading: false });
        }
    };

    render() {
        const { notifications, loading, expoPushToken } = this.state;
        const {i18n} = this.context;


        return (
            <>
                {
                    loading && <Loading />
                }
                <View style={styles.container}>
                    <MenuHeader title={i18n.t('bildirimler')}/>
                    {
                        notifications && (
                            <TouchableOpacity onPress={async () => {
                                try {
                                    let deleteNotifiStatus = await deleteNotification(expoPushToken);
                                    if (deleteNotifiStatus === true){
                                        this.setState({notifications:null})
                                    }
                                }catch (e){
                                    console.log(e)
                                }

                            }}>
                                <Text style={{ marginBottom: 20, marginTop: -20, alignSelf: 'center' }}>{i18n.t('tumunuSil')}</Text>
                            </TouchableOpacity>
                        )
                    }
                    {
                        notifications && (
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                refreshControl={
                                    <RefreshControl refreshing={loading} onRefresh={() => this.getNotifications()} />
                                }
                                data={notifications}
                                renderItem={({ item, index }) => (
                                    <NotificationItem notification={item} />
                                )}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        )
                    }
                    {
                        !notifications && (
                            <ScrollView
                                refreshControl={
                                    <RefreshControl refreshing={loading} onRefresh={() => this.getNotifications()} />
                                }
                            >
                                <Text style={{ justifyContent: 'center', alignSelf: 'center' }}>{i18n.t('hicBildiriminizYok')}</Text>
                            </ScrollView>
                        )
                    }
                </View>
            </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
    },
});
