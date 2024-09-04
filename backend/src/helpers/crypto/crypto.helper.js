const CryptoJS = require("crypto-js");
const bcrypt = require('bcrypt');
const config = require("../../config/app");
const saltRounds = 10;
const secretKeyData = config.secret_key_data;
const secretKeyPassword = config.secret_key_password;

const methods = {
    async encrypt(data) {
        // แปลงข้อมูลเป็น JSON string
        const dataString = JSON.stringify(data);

        // เข้ารหัสข้อมูล
        const encryptedData = CryptoJS.AES.encrypt(dataString, secretKeyData).toString();

        // ส่งการตอบกลับไป
        return encryptedData;
    },
    async decrypt(data) {
        // สมมุติว่า encryptedData คือข้อมูลที่ได้รับจาก frontend
        const encryptedData = data?.data;

        // ถอดรหัสข้อมูล
        const bytes = CryptoJS.AES.decrypt(encryptedData, secretKeyData);
        const decryptedDataString = bytes.toString(CryptoJS.enc.Utf8);

        // แปลงข้อมูลกลับเป็น JSON
        const decryptedData = JSON.parse(decryptedDataString);

        // ส่งการตอบกลับไป
        return decryptedData;
    },
    async hashPasswordWithKey(password) {
        const salt = await this.generateSalt(password + secretKeyPassword);
        // ใช้ bcrypt เพื่อแฮชรหัสผ่านโดยใช้ salt
        const hashedPassword = await bcrypt.hash(password + salt, saltRounds);

        const result = {
            password: hashedPassword,
            salt: salt
        }

        return result;
    },
    async generateSalt(key) {
        // ใช้ key เพื่อสร้าง salt
        const hmac = CryptoJS.HmacSHA256('sha256', key);
        return hmac.toString(CryptoJS.enc.Hex);
    }
};

module.exports = {
    ...methods,
};