const { BadRequestError } = require("../helper/expressErrors");

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
            userId: user.id,
            isAdmin: user.isAdmin || false,
        };

        return jwt.sign(payload, SECRET_KEY);
    }
};

module.exports = HelperFunctions;