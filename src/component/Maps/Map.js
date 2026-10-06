import React, { useContext, useEffect, useRef, useState } from "react";
import {
    Animated, Button,
    Dimensions,
    Easing,
    FlatList,
    Image,
    Pressable,
    RefreshControl,
    StyleSheet,
    Text, TouchableOpacity,
    View
} from "react-native";
import MapView, {Marker} from "react-native-maps";
import Markers from "./Markers";
import MapsHeader from "../Header/MapsHeader";
import Feeders from "./Feeders/Feeders";
import AuthContext from "../../context/AuthContext";
import FeederItem from "./Feeders/FeederItem";
import {MaterialIcons} from "@expo/vector-icons";
import FeederDetail from "../Modals/FeederDetail";
import Loading from "../Loading";
import {useFocusEffect, useNavigation, useRoute} from "@react-navigation/native";
import LanguageContext from "../../context/LanguageContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getUserData} from "../../util/AuthAPI";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const Map = () => {
    const route = useRoute();
    const navigation = useNavigation()
    const { params } = route;

    const mapRef = useRef(null);
    const { userData, location,marker, filteredMarkers, visibleModal, setVisibleModal,setModalData} = useContext(AuthContext);
    const {i18n} = useContext(LanguageContext);
    const [userDataNon,setUserDataNon] = useState(false);

    //QR İle gelen bir veri varsa çalıştır.
    if (params && params.qrItem) {
        const { qrItem } = params;
        const gelenQrItem =
            {
                "doluluk" : qrItem.doluluk,
                "title" : qrItem.title,
                "latlng" : {
                    "latitude" : qrItem.latitude,
                    "longitude" : qrItem.longitude
                }
            }

        navigation.navigate('HomeScreen');
        setVisibleModal(1)
        setModalData(gelenQrItem)
    }



    function feederDetail(item){
        const newRegion = {
            latitude: item.latlng.latitude,
            longitude: item.latlng.longitude,
            latitudeDelta: 0.002,
            longitudeDelta: 0.002
        }
        mapRef.current.animateToRegion(newRegion,500)
        setVisibleModal(1)
        setModalData(item)
    }

    let mapIndex = 0;
    let mapAnimation = new Animated.Value(0);

    useFocusEffect(()=>{
            const userDataCheck = () => {
                if (userData){
                    if (userData.name == null || userData.name == ""){
                        setUserDataNon(true)
                    }
                }
            }

            userDataCheck()
    })

    useEffect(() => {


        mapAnimation.addListener(({ value }) => {
            let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
            if (index >= filteredMarkers.length) {
                index = filteredMarkers.length - 1;
            }
            if (index <= 0) {
                index = 0;
            }

            clearTimeout(regionTimeout);

            const regionTimeout = setTimeout(() => {
                if( mapIndex !== index ) {
                    mapIndex = index;
                    const {latlng} = filteredMarkers[index];
                    mapRef.current.animateToRegion({
                        ...latlng,
                        latitudeDelta: 0.0015,
                        longitudeDelta: 0.0015
                    },1000)
                }
            }, 10);
        });
    });

    const width = Dimensions.get('window').width;
    const CARD_WIDTH = width * 0.8;
    const SPACING_FOR_CARD_INSET = width * 0.1 - 10;
    const SPACING_FOR_CARD_INSET_NEW = (width - CARD_WIDTH) / 2;

    return (
        <View style={{flex:1}}>
            <MapsHeader map={mapRef} />
            {
                userDataNon && (
                    <View style={{position:'absolute',bottom:0,left:0,paddingHorizontal:24,width:'100%',zIndex:1,height:150,borderTopRightRadius:15,borderTopLeftRadius:15,backgroundColor:'rgba(0,0,0,0.75)',justifyContent:'center',alignItems:'center'}}>
                        <Text style={{color:'white'}}>Platformu kullanmanız için lütfen bilgilerinizi güncelleyin.</Text>
                        <TouchableOpacity style={styles.button} onPress={()=>{
                            navigation.navigate('ProfilUpdate')
                        }}>
                            <Text style={styles.loginText}>{i18n.t('guncelle')}</Text>
                        </TouchableOpacity>
                    </View>
                )
            }
            {location && location.coords && (
                <MapView
                    style={styles.map}
                    loadingEnabled={true}
                    showsUserLocation={true}
                    ref={mapRef}
                    region={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        latitudeDelta: 0.002,
                        longitudeDelta: 0.002,
                    }}
                >
                    {marker.map((marker, index) => (
                        <Marker
                            onPress={() => {
                                feederDetail(marker)
                            }}
                            key={index}
                            coordinate={marker.latlng}

                        >
                            <Image source={marker.doluluk <= 30 ? require('../../../assets/icons/markerRed.png') : require('../../../assets/icons/markerBlue.png')} style={{width:49,height:64}} />
                        </Marker>
                    ))}
                </MapView>
            )}
            {
                visibleModal && (
                    <FeederDetail />
                )
            }
            <View style={{position:'absolute',bottom:0,marginBottom:20}}>
                <AnimatedFlatList
                    horizontal={true}
                    scrollEventThrottle={16}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled={true}
                    snapToAlignment={"center"}
                    shouldRasterizeIOS={true}
                    disableIntervalMomentum={true}
                    decelerationRate={0.9}
                    contentInset={{
                        top:0,
                        left:SPACING_FOR_CARD_INSET_NEW,
                        bottom:0,
                        right:SPACING_FOR_CARD_INSET_NEW
                    }}
                    snapToInterval={CARD_WIDTH + SPACING_FOR_CARD_INSET_NEW}
                    /*style={styles.scrollView}*/
                    onScroll={Animated.event(
                        [
                            {
                                nativeEvent: {
                                    contentOffset: {
                                        x: mapAnimation,
                                    }
                                }
                            }
                        ],
                        { useNativeDriver: true }
                    )}
                    data={filteredMarkers}
                    renderItem={({item,index})=>(
                        <>
                            <Pressable onPress={() => {
                                feederDetail(item)
                            }} style={{flexDirection:'row'}}>
                                <FeederItem cardwidth={CARD_WIDTH} item={item} />
                            </Pressable>
                            {
                                <MaterialIcons style={{alignSelf:'center',marginLeft: index == 0 ? -5 : 0,marginRight:SPACING_FOR_CARD_INSET_NEW - 35}} name="navigate-next" size={35} color="#00C4E4" />
                            }
                        </>
                    )}
                    keyExtractor={(item,index)=>index}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    map: {
        flex:1,
    },
    feederContainer: {
        position: 'absolute',
        bottom: -40,
        width: '100%',
    },
    button:{
        backgroundColor:'#00C4E4',
        padding:10,
        borderRadius:100,
        marginTop:25
    },
    loginText:{
        justifyContent:'center',
        alignSelf:'center',
        fontFamily:'MuseoModerno_600SemiBold',
        color:'#ffffff',
        fontSize:16
    },
})

export default Map;
