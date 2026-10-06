# Mamamat Mobile App

> Sokak hayvanları için akıllı mama kabı uygulaması

[![Expo](https://img.shields.io/badge/Expo-57.x-000020?logo=expo)](https://expo.dev)
[![React Native](https://img.shields.io/badge/React%20Native-0.86-61DAFB?logo=react)](https://reactnative.dev)
[![Platform](https://img.shields.io/badge/Platform-Android%20%7C%20iOS-lightgrey)](https://expo.dev)

---

## Proje hakkında

Mamamat, yakınınızdaki mama kaplarını harita üzerinden bulmanızı ve telefonunuzdan mama kaplarına uzaktan mama takviyesi yapmanızı sağlayan bir mobil uygulamadır.

Kullanıcılar:
- Harita üzerindeki mama kaplarını görüntüleyebilir
- Mama kabı detaylarını inceleyebilir
- Dijital cüzdana bakiye yükleyip mama takviyesi başlatabilir
- Geçmiş takviyelerini takip edebilir
- Arkadaşlarını uygulamaya davet edebilir

---

## Özellikler

| Özellik | Açıklama |
|---|---|
| Harita | Tüm mama kaplarını interaktif haritada gösterir |
| Mama kabı detayı | Mama kabı bilgisi, doluluk durumu ve takviye seçenekleri |
| Dijital cüzdan | Bakiye yükleme ve harcama geçmişi |
| Geçmiş takviyeler | Yapılan tüm takviye işlemlerinin listesi |
| Bildirimler | Expo Push Notifications ile anlık bildirim |
| Çok dil desteği | Türkçe ve İngilizce (i18n-js) |
| Arkadaş daveti | Referans koduyla davet sistemi |
| SMS doğrulama | Telefon numarasına gelen SMS koduyla giriş |
| QR kod | İstasyonlara QR ile hızlı erişim |

---

## Kullanılan teknolojiler

- React Native `0.86` / Expo `57`
- React Navigation (Stack, Bottom Tabs, Drawer)
- Axios: API iletişimi
- Expo Location: konum servisi
- React Native Maps: harita
- Expo Notifications: push bildirim
- Expo Camera: QR okuma
- i18n-js ve expo-localization: çoklu dil
- NativeBase: UI bileşenleri
- Lottie React Native: animasyonlar
- AsyncStorage: yerel oturum yönetimi

---

## Kurulum ve çalıştırma

### Gereksinimler
- Node.js `>= 18`
- Expo CLI (`npm install -g expo-cli`)
- Cihaz veya emülatör için Android Studio ya da Xcode
- Çalışan bir Laravel backend sunucusu

### 1. Depoyu klonlayın
```bash
git clone https://github.com/KULLANICI_ADINIZ/mamamat-mobile-app.git
cd mamamat-mobile-app
```

### 2. Bağımlılıkları yükleyin
```bash
npm install
```

### 3. API URL'ini ayarlayın
`src/util/AuthAPI.js` dosyasını açıp `API_URL` değişkenine kendi backend sunucu adresinizi yazın:

```js
const API_URL = 'http://<SUNUCU_IP>:8000';
```

> Laravel backend reposunu da ayrıca kurmanız gerekir.

### 4. Uygulamayı başlatın
```bash
npm start
# veya
npx expo start
```

Expo Go uygulamasıyla QR kodu okutarak uygulamayı telefonunuzda çalıştırabilirsiniz.

---

## Proje yapısı

```
mamamat-mobile-app/
├── assets/              # Görseller, ikonlar
├── src/
│   ├── component/       # Ortak UI bileşenleri (Loading, Alerts…)
│   ├── context/         # AuthContext, LanguageContext
│   ├── languages/       # i18n dil dosyaları
│   ├── Modal/           # Modal ekranları (FeederDetail…)
│   ├── navigation/      # Navigasyon konfigürasyonu
│   ├── screens/         # Uygulama ekranları
│   │   ├── LoginRegister/
│   │   ├── Wallet/
│   │   ├── Notifications/
│   │   ├── GecmisTakviyeler/
│   │   ├── ArkadaslariniDavetEt/
│   │   ├── Qr/
│   │   └── ...
│   ├── util/            # API çağrıları, bildirim yardımcıları
│   └── Route.js         # Ana rota tanımları
├── App.js               # Uygulama giriş noktası
├── app.json             # Expo konfigürasyonu
└── eas.json             # EAS Build konfigürasyonu
```

---

## Build (EAS)

```bash
# Android APK/AAB
eas build --platform android

# iOS
eas build --platform ios
```

---


## Lisans

Bu proje özel kullanım amaçlıdır. Tüm hakları saklıdır.