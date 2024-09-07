const User = require('../../model/user/user.model');
var jwt = require('jsonwebtoken');
const moment = require("moment");
const returnHelper = require("../../helpers/return/return.helper");
const cryptoHelper = require("../../helpers/crypto/crypto.helper");

exports.login = async (req, res) => {
    const dataBody = req.body;
    const username = dataBody.data.username;
    const password = dataBody.data.password;

    try {
        const existingUser = await User.findOne({
            attributes: [
                'user_id',
                'line_id',
                'email',
                'phone_number',
                'name',
                'profile_picture_url',
                'auth_method',
                'status',
                'last_login',
                'last_update',
                'notifications'
            ],
            where: {
                line_id: username,
                password_hash: password,
                status: 'active'
            }
        });

        if (!existingUser) {
            return returnHelper.jsonResponse(res, null, 400, "User with this line_id already exists.");
        }

        await existingUser.update({ last_login: moment().format("YYYY-MM-DD HH:mm:ss") })

        const token = jwt.sign({ token: existingUser }, 'shhhhh');
        const decoded = jwt.verify(token, 'shhhhh');
        const dataEncrypt = await cryptoHelper.encrypt(decoded);

        const response = {
            data: dataEncrypt
        };

        return returnHelper.jsonResponse(res, response, 200, "Ok");
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};