import React, { useState, useRef } from "react";
import {SafeAreaView, StyleSheet, Text, TouchableHighlight, View} from "react-native";
import PhoneInput from "react-native-phone-input";

const PhoneScreen = () => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const phoneInput = useRef<PhoneInput>(null);


    const handleSubmit = () => {
        const isValid = phoneInput.current?.isValidNumber(phoneNumber);
        if (isValid) {
            console.log("SUBMITTED! ", phoneNumber)
        } else {
            console.log("INVALID NUMBER.")
        }
    }
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <PhoneInput
                    style={styles.phoneInput}
                    initialValue={phoneNumber}
                    initialCountry="tr"
                    onChangeText={(text) => {
                        setPhoneNumber(text);
                    }}
                    withShadow
                    autoFocus
                />
                <TouchableHighlight style={styles.button} onPress={handleSubmit}>
                    <Text>Submit</Text>
                </TouchableHighlight>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container:{
        marginHorizontal:24
    },
    phoneInput: {
        borderWidth: 1,
        borderRadius: 25,
        width: '100%',
        height: 50,
        paddingLeft:20
    },
    button: {
        borderWidth: 1,
        borderColor: 'green',
        borderRadius: 15,
        marginTop: 25,
        padding: 10,
        alignItems: 'center'
    },
});
export default PhoneScreen;
