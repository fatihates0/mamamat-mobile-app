import React, {useContext} from 'react';
import {Image, Platform, View} from "react-native";
import {Marker} from "react-native-maps";
import AuthContext from "../../context/AuthContext";

const Markers = ({markers,map}) => {
    const {setVisibleModal,setModalData} = useContext(AuthContext);

    function markerDirect(marker){
        const newRegion = {
            latitude: marker.latlng.latitude,
            longitude: marker.latlng.longitude,
            latitudeDelta: 0.002,
            longitudeDelta: 0.002
        }
        map.current.animateToRegion(newRegion,500)
        setVisibleModal(1);
        setModalData(marker)
    }



    return (
        <View>
            {markers.map((marker, index) => (
                <Marker
                    onPress={() => {
                        markerDirect(marker)
                    }}
                    key={index}
                    coordinate={marker.latlng}

                >
                    <Image source={marker.doluluk <= 30 ? require('../../../assets/icons/markerRed.png') : require('../../../assets/icons/markerBlue.png')} style={{width:49,height:64}} />
                </Marker>
            ))}
        </View>
    );
};

export default Markers;
