const Helper = require("../../helpers/return.helper");

exports.createUser = async (req, res) => {
    try {
        console.log(req.body);
        const response = {
            detail: req.body
          };
        Helper.jsonResponse(res, response, 203, "Ok");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};