const returnHelper = require("../../helpers/return.helper");
const cryptoHelper = require("../../helpers/crypto.helper");

exports.encryptedData = async (req, res) => {
    try {
        const data = req.body;
        const result = await cryptoHelper.encrypt(data);

        const response = {
            data: result
        };

        returnHelper.jsonResponse(res, response, 200, "Ok");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.decryptedData = async (req, res) => {
    try {
        const data = req.body;
        const result = await cryptoHelper.decrypt(data);

        const response = {
            data: result
        };

        returnHelper.jsonResponse(res, response, 200, "Ok");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};