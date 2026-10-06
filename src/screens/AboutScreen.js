import React, {useEffect} from 'react';
import {View, Text, Button} from 'react-native';

const AboutScreen = ({navigation}) => {
    useEffect(() => {
        // Her ekran odaklandığında başlığı değiştir
        const headerTitleChange = navigation.addListener('focus', () => {
            navigation.setOptions({
                title: 'About Yeni Başlık', // Başlığı burada değiştirin
            });
        });

        // Odaklanma olay dinleyicisini temizle
        return headerTitleChange;
    }, [navigation]);

    return(
        <View>
            <Text style={{marginBottom:50}}>About Screen</Text>
            <Button title="Home Page" onPress={()=>{
                navigation.navigate('TabGroup')
            }}/>
            {/* İçeriği buraya ekleyin */}
        </View>
    )
};

export default AboutScreen;
