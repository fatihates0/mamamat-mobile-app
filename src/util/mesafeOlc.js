import AsyncStorage from "@react-native-async-storage/async-storage";

export function kacMetre(lat1, lon1, lat2, lon2){
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
}

export function kacDakika(mesafe){
    const sonuc = mesafe / 70;
    //return sonuc < 1 ? "1 Dakika" : sonuc.toFixed(0) > 60 ? (sonuc.toFixed(0) / 60).toFixed(0) + " Saat" : sonuc.toFixed(0) + " Dakika" + i18n.t('takviyeYap');
    return sonuc
}
