import React from 'react';
import { Modal, Text, TouchableOpacity, View, StyleSheet } from 'react-native';

const CustomAlert = ({ visible, message, onClose }) => {
    if (!visible) return null;

    return (
        <Modal transparent animationType="slide" visible={visible}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text>{message}</Text>
                    <TouchableOpacity onPress={onClose}>
                        <Text style={styles.okButton}>Özel Metin</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
    },
    okButton: {
        color: 'blue',
        marginTop: 10,
    },
});

export default CustomAlert;
