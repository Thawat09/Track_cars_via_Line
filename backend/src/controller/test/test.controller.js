const axios = require('axios');
const returnHelper = require("../../helpers/return/return.helper");

const LINE_CLIENT_ID = '2006308257';
const LINE_CLIENT_SECRET = 'c37fd3ced55af315d145e728fe7c85b6';
const REDIRECT_URI = 'https://117f-183-88-236-137.ngrok-free.app/callback';

exports.test = async (req, res) => {
    const { code } = req.body;
    console.log('Authorization Code:', code);

    try {
        // ดึง access_token โดยส่ง code ไปยัง Line API
        const tokenResponse = await axios.post('https://api.line.me/oauth2/v2.1/token',
            new URLSearchParams({
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: REDIRECT_URI,
                client_id: LINE_CLIENT_ID,
                client_secret: LINE_CLIENT_SECRET,
            })
        );

        // ตรวจสอบ response ของ token request
        console.log('Token Response:', tokenResponse.data);

        const accessToken = tokenResponse.data.access_token;

        if (!accessToken) {
            throw new Error('Failed to retrieve access token');
        }

        // ใช้ access_token เพื่อดึงข้อมูลโปรไฟล์จาก Line
        const profileResponse = await axios.get('https://api.line.me/v2/profile', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const profile = profileResponse.data;
        console.log('Profile Response:', profile);

        const response = {
            data: profile,
            accessToken: accessToken // ส่ง access token กลับไปด้วย
        };

        return returnHelper.jsonResponse(res, response, 200, "Ok");
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        return res.status(500).json({ error: "Internal Server Error", message: error.message });
    }
};