import React from 'react';
import {Dimensions, Image, Platform, StyleSheet, Text, View} from "react-native";
import LottieView from "lottie-react-native";

const Loading = () => {
    return (
        <View style={styles.container}>
            {
                <LottieView
                    source={require('../../assets/custom.json')}
                    autoPlay
                    loop
                    style={styles.lottie}
                />
            }

        </View>
    );
};

const styles = StyleSheet.create({
    /*container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },*/
    container:{
        position:"absolute",
        top:0,
        left:0,
        width:Dimensions.get('window').width,
        height:'100%',
        justifyContent:'center',
        alignItems:'center',
        zIndex:9,
        backgroundColor:'rgba(0,0,0,0.37)'
    },
    logoText:{
        width:153.264,
        height:18.374,
        alignSelf:'center',
        marginTop:11,
        marginBottom:10
    },
    text:{
        fontSize:20,
        fontWeight:'bold'
    },
    lottie:{
        width:'100%',
        height:'100%',
    }
})

export default Loading;
