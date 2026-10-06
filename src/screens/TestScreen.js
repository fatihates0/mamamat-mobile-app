import React from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import LottieView from 'lottie-react-native';

const TestScreen = () => {
    return (
        <View style={{flex:1}}>
            <Text>Selam</Text>
            <LottieView
                style={{flex: 1}}
                source={require('../../assets/confettie.json')}
                autoPlay
                loop={false}
            />
        </View>
    );
};

export default TestScreen;
