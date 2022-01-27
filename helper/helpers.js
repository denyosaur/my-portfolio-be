const { BadRequestError } = require("../helper/expressErrors");
const jsonschema = require("jsonschema");
const { SECRET_KEY } = require("../config");

class HelperFunctions {
    static sqlUpdateHelper(dataToUpdate, jsToSql) {
        const keys = Object.keys(dataToUpdate);
        if (keys.length === 0) throw new BadRequestError("No Data");

        const cols = keys.map((col, idx) =>
            `"${jsToSql[col] || col}"=$${idx + 1}`,
        );

        return {
            setCols: cols.join(", "),
            values: Object.values(dataToUpdate)
        };
    }

    static createToken(user) {
        console.assert(user.isAdmin !== undefined,
            "createToken passed user without isAdmin property");

        let payload = {
            username: user.username,
            isAdmin: user.isAdmin || false,
        };

        return jwt.sign(payload, SECRET_KEY);
    }

    static validateJson(body, schema) {
        const validate = jsonschema.validate(body, schema);
        if (!validate.valid) {
            const errors = validate.errors.map(error => error.stack);
            throw new BadRequestError(errors);
        };

    }
};

module.exports = HelperFunctions;