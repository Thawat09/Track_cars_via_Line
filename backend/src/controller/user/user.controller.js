const User = require('../../model/user/user.model');
const returnHelper = require("../../helpers/return/return.helper");
const cryptoHelper = require("../../helpers/crypto/crypto.helper");

exports.createUser = async (req, res) => {
    const dataBody = req.body;

    try {
        const dataDecrypt = await cryptoHelper.decrypt(dataBody);
        const passwordHash = await cryptoHelper.hashPasswordWithKey(dataDecrypt.password);

        const data = {
            line_id: dataDecrypt.line_id,
            email: dataDecrypt.email,
            password_hash: passwordHash.password,
            phone_number: dataDecrypt.phone_number,
            name: dataDecrypt.name,
            profile_picture_url: dataDecrypt.profile_picture_url,
            registration_date: dataDecrypt.registration_date,
            line_linked_date: dataDecrypt.line_linked_date,
            auth_method: dataDecrypt.auth_method,
            status: dataDecrypt.status,
            last_login: dataDecrypt.last_login,
            last_update: dataDecrypt.last_update,
            notifications: dataDecrypt.notifications,
            salt: passwordHash.salt
        };

        const existingUser = await User.findOne({ where: { line_id: data.line_id } });

        if (existingUser) {
            return returnHelper.jsonResponse(res, null, 400, "User with this line_id already exists.");
        }

        const newUser = await User.create(data);

        const dataEncrypt = await cryptoHelper.encrypt(newUser);

        const response = {
            data: dataEncrypt
        };

        return returnHelper.jsonResponse(res, response, 203, "Ok");
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.getAllUsers = async (req, res) => {
    const limit = parseInt(req.query.limit, 10) || 10;
    const offset = parseInt(req.query.offset, 10) || 0;

    try {
        const existingUser = await User.findAll({
            attributes: { exclude: ['password_hash', 'salt'] },
            where: {
                status: 'active'
            },
            limit: limit,
            offset: offset
        });

        if (!existingUser) {
            return returnHelper.jsonResponse(res, null, 404, "User with this User not found.");
        }

        const dataEncrypt = await cryptoHelper.encrypt(existingUser);

        const response = {
            data: dataEncrypt
        };

        return returnHelper.jsonResponse(res, response, 200, "Ok");
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.getOneUsers = async (req, res) => {
    const id = parseInt(req.query.id, 10);

    if (isNaN(id)) {
        return returnHelper.jsonResponse(res, null, 400, "Invalid or missing ID.");
    }

    try {
        const existingUser = await User.findOne({
            where: {
                user_id: id,
                status: 'active'
            },
            attributes: { exclude: ['password_hash', 'salt'] }
        });

        if (!existingUser) {
            return returnHelper.jsonResponse(res, null, 404, "User with this ID not found.");
        }

        const dataEncrypt = await cryptoHelper.encrypt(existingUser);

        const response = {
            data: dataEncrypt
        };

        return returnHelper.jsonResponse(res, response, 200, "Ok");
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" })
    }
};