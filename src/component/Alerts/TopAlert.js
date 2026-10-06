import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const TopAlert = ({ isActive, isClose, message }) => {
    const translateY = useRef(new Animated.Value(-100)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (isActive) {
            // Yukarıdan aşağı kayarak belir
            Animated.parallel([
                Animated.spring(translateY, {
                    toValue: 0,
                    useNativeDriver: true,
                    bounciness: 6,
                }),
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 250,
                    useNativeDriver: true,
                }),
            ]).start();

            // 3 saniye sonra gizle
            const timer = setTimeout(() => {
                _hide();
            }, 3000);

            return () => clearTimeout(timer);
        } else {
            _hide();
        }
    }, [isActive]);

    const _hide = () => {
        Animated.parallel([
            Animated.timing(translateY, {
                toValue: -100,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(opacity, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start();
    };

    return (
        <Animated.View
            style={[
                styles.container,
                {
                    transform: [{ translateY }],
                    opacity,
                },
            ]}
            pointerEvents={isActive ? 'auto' : 'none'}
        >
            {/* Sol renkli çizgi */}
            <View style={styles.accent} />

            {/* İkon */}
            <View style={styles.iconWrapper}>
                <Text style={styles.icon}>✓</Text>
            </View>

            {/* Mesaj */}
            <Text style={styles.message} numberOfLines={2}>
                {message}
            </Text>

            {/* Kapat butonu */}
            <TouchableOpacity onPress={isClose} style={styles.closeBtn} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                <Text style={styles.closeIcon}>✕</Text>
            </TouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 50,
        left: 24,
        right: 24,
        zIndex: 9999,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 10,
        elevation: 8,
        overflow: 'hidden',
        minHeight: 56,
        paddingRight: 12,
    },
    accent: {
        width: 5,
        alignSelf: 'stretch',
        backgroundColor: '#00C4E4',
    },
    iconWrapper: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#00C4E4',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 12,
    },
    icon: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    message: {
        flex: 1,
        color: '#25304E',
        fontSize: 14,
        fontFamily: 'MuseoModerno_500Medium',
    },
    closeBtn: {
        marginLeft: 8,
        padding: 4,
    },
    closeIcon: {
        color: '#9DA2AF',
        fontSize: 14,
    },
});

export default TopAlert;
