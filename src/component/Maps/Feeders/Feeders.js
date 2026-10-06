import React, {useContext, useEffect, useRef} from 'react';
import {FlatList, Pressable, StyleSheet, Text, View, Animated, Dimensions, Platform} from "react-native";
import FeederItem from "./FeederItem";
import AuthContext from "../../../context/AuthContext";
import FeederDetail from "../../Modals/FeederDetail";
import { MaterialIcons } from '@expo/vector-icons';
import markers from "../Markers";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const Feeders = ({feeder,map}) => {
    const {visibleModal,setVisibleModal,setModalData} = useContext(AuthContext);
    function feederDetail(item){
        const newRegion = {
            latitude: item.latlng.latitude,
            longitude: item.latlng.longitude,
            latitudeDelta: 0.002,
            longitudeDelta: 0.002
        }
        map.current.animateToRegion(newRegion,500)
        setVisibleModal(1);
        setModalData(item)
    }


    let mapIndex = 0;
    let mapAnimation = new Animated.Value(0);

    useEffect(() => {
        mapAnimation.addListener(({ value }) => {
            let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
            if (index >= feeder.length) {
                index = feeder.length - 1;
            }
            if (index <= 0) {
                index = 0;
            }

            clearTimeout(regionTimeout);

            const regionTimeout = setTimeout(() => {
                if( mapIndex !== index ) {
                    mapIndex = index;
                    const {latlng} = feeder[index];
                    map.current.animateToRegion({
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
        <View style={styles.container}>
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
                    style={styles.scrollView}
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

                    data={feeder}
                    renderItem={({item,index})=>(
                        <>
                            <Pressable onPress={() => {
                                feederDetail(item)
                            }} style={{flexDirection:'row'}}>
                                <FeederItem cardwidth={CARD_WIDTH} map={map} item={item} />
                            </Pressable>
                            {
                                <MaterialIcons style={{alignSelf:'center',marginLeft: index == 0 ? -5 : 0,marginRight:SPACING_FOR_CARD_INSET_NEW - 35}} name="navigate-next" size={35} color="#00C4E4" />
                            }
                        </>
                    )}
                    keyExtractor={(item,index)=>index}
                />
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:150,
        marginBottom:50
    },
    scrollView: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        paddingVertical: 10,
    },
})

export default Feeders;
