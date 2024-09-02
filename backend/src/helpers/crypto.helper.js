const CryptoJS = require("crypto-js");
const config = require("../config/app");
const secretKey = config.secret_key_data;

const methods = {
    async encrypt(data) {
        // แปลงข้อมูลเป็น JSON string
        const dataString = JSON.stringify(data);

        // เข้ารหัสข้อมูล
        const encryptedData = CryptoJS.AES.encrypt(dataString, secretKey).toString();

        // ส่งการตอบกลับไป
        return encryptedData;
    },
    async decrypt(data) {
        // สมมุติว่า encryptedData คือข้อมูลที่ได้รับจาก frontend
        const encryptedData = data?.data;

        // ถอดรหัสข้อมูล
        const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
        const decryptedDataString = bytes.toString(CryptoJS.enc.Utf8);

        // แปลงข้อมูลกลับเป็น JSON
        const decryptedData = JSON.parse(decryptedDataString);

        // ส่งการตอบกลับไป
        return decryptedData;
    }
};

module.exports = {
    ...methods,
};