import axios from 'axios';

const API_URL = 'http://<SUNUCU_IP>:8000';

export async function loginOrRegister(phone) {
    const response = await axios.post(`${API_URL}/api/create/user/getOrCreateUser`,
        {
            phone_number: phone
        }
    );
    return response.data;
}

export async function smsVerification(phone, code) {
    const response = await axios.post(`${API_URL}/api/create/user/smsVerification`,
        {
            phone_number: phone,
            verification_code: code
        }
    );
    if (response.data.status == false) {
        return response.data.status;
    }
    return response.data.id;
}
export async function getUserData(user_id) {
    const response = await axios.post(`${API_URL}/api/get/user/data`,
        {
            user_id: user_id
        }
    );

    return response.data.data;
}

export async function getFeeders() {
    const response = await axios.post(`${API_URL}/api/feeder/getFeeders`);
    //console.log(response.data)
    return response.data;
}

export async function getFeederDetail(feederTitle) {
    const response = await axios.post(`${API_URL}/api/feeder/getFeederDetail`,
        {
            feeder_title: feederTitle
        }
    );
    if (response.data.status == true) {
        return response.data.feeder
    }
    //console.log(response.data)
    return "error";
}

export async function saveNotifiId(notifiId) {
    const notificationId = await axios.post(`${API_URL}/api/saveNotifiID`,
        {
            notifi_id: notifiId
        }
    );
}

export async function getAllNotification(notifiId) {
    const response = await axios.post(`${API_URL}/api/get/user/notifications`,
        {
            notifi_id: notifiId
        }
    );
    return response.data;
}
export async function deleteNotification(notifi_id) {
    const response = await axios.post(`${API_URL}/api/update/user/readNotification`,
        {
            notifi_id: notifi_id
        }
    );
    if (response.data.status === true) {
        return true;
    }
    return false;
}
export async function gecmisKullanimEkle(user_id, feeder_id, adet, tutar) {
    const response = await axios.post(`${API_URL}/api/create/user/kullanimOlustur`,
        {
            user_id: user_id,
            feeder_id: feeder_id,
            adet: adet,
            tutar: tutar
        }
    );

    return response.data;
}
export async function gecmisKullanimlariListele(user_id) {
    const response = await axios.post(`${API_URL}/api/get/user/gecmisKullanimlar`,
        {
            user_id: user_id
        }
    );

    return response.data.data;
}
export async function bakiyeYukle(user_id, tutar) {
    const response = await axios.post(`${API_URL}/api/wallet/bakiyeYukle`,
        {
            user_id: user_id,
            tutar: tutar
        }
    );

    if (response.data.error === false) {
        return true;
    }

    return false;
}
export async function takviyeYap(user_id, feeder_title, adet) {
    const response = await axios.post(`${API_URL}/api/feeder/takviyeYap`,
        {
            user_id: user_id,
            feeder_title: feeder_title,
            adet: adet
        }
    );
    return response.data;
}
export async function arkadasinaDavetiyeGonder(user_id, phone_number) {
    const response = await axios.post(`${API_URL}/api/create/user/arkadasiniDavetEt`,
        {
            user_id: user_id,
            phone_number: phone_number
        }
    );

    return {
        'error': response.data.error,
        'message': response.data.message
    }
}

export async function userDetailUpdate(data) {
    const response = await axios.post(`${API_URL}/api/update/user/updateUserData`,
        {
            uniq_id: data.uniq_id,
            name: data.name,
            email: data.email,
            phone_number: data.phone_number,
            dogum_tarihi: data.dogum_tarihi,
        }
    );

    if (response.data.status == 400) {
        return {
            'error': true,
            'message': response.data.message
        }
    }

    if (response.data.status == 404) {
        return {
            'error': true,
            'message': response.data.message
        }
    }

    return {
        'error': false,
        'message': response.data.message
    }
}