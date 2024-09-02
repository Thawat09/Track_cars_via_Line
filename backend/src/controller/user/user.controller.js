const returnHelper = require("../../helpers/return.helper");
const cryptoHelper = require("../../helpers/crypto.helper");

exports.createUser = async (req, res) => {
    try {
        const data = req.body;
        const result = await cryptoHelper.decrypt(data);
        console.log(result);

        const response = {
            data: result
        };

        returnHelper.jsonResponse(res, response, 203, "Ok");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};