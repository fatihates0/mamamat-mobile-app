import React, {useState, useEffect, useContext} from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import {getFeederDetail} from "../../util/AuthAPI";
import LanguageContext from "../../context/LanguageContext";

export default function QrScreen({navigation}) {
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);
    const {i18n} = useContext(LanguageContext);

    useEffect(() => {
        if (!permission) {
            requestPermission();
        }
    }, [permission]);

    async function feederDetail(item){
        const feederDetail = await getFeederDetail(item);
        if (feederDetail !== "hata"){
            navigation.navigate('HomeScreen',{
                qrItem: feederDetail
            });
        }
    }

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        feederDetail(data);
    };

    if (!permission) {
        return <Text>{i18n.t('kameraIzniIsteniyor')}</Text>;
    }
    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={{textAlign: 'center', marginTop: 50}}>{i18n.t('kamerayaErisimYok')}</Text>
                <Button onPress={requestPermission} title={i18n.t('kameraIzniIsteniyor') || 'İzin Ver'} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <CameraView
                style={StyleSheet.absoluteFillObject}
                onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
                barcodeScannerSettings={{
                    barcodeTypes: ["qr"],
                }}
            />
            <View style={{marginTop:46}}>
                <Text style={styles.pageHeaderTitle}>{i18n.t('qRtarat')}</Text>
            </View>
            {scanned && (
                <View style={{flex:1,justifyContent:'flex-end',alignItems:'center'}}>
                    <Button color="#fff" title={i18n.t('anasayfa')} onPress={() => {
                        setScanned(false);
                        navigation.goBack();
                    }} />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
    },
    imageContainer: {
        position: 'absolute',
        bottom: 0,
        left: '50%',
        transform: [{ translateX: -40 }, { translateY: -40 }],
    },
    pageHeaderTitle:{
        fontFamily:'MuseoModerno_700Bold',
        fontSize:20,
        position:'absolute',
        alignSelf:'center',
        color:'#fff'
    },
});

