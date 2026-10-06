import React from 'react';
import LottieView from "lottie-react-native";
import {Text, View} from "react-native";

const Tebrikler = () => {
    return (
        <View style={{flex:1}}>
            <Text style={{flex:1,justifyContent:'center',alignSelf:'center',color:'red',fontSize:20}}>Başarııı!</Text>
            <LottieView
                style={{flex: 1,zIndex:5}}
                source={require('../../assets/Congratulations.json')}
                autoPlay
                loop={true}
            />
        </View>
    );
};

export default Tebrikler;
