"use strict";

const db = require("../db");
const bcrypt = require("bcrypt");

const { UnauthorizedError } = require("../helper/expressErrors");

class Users {
    constructor(username, password) {
        this.username = username;
        this.password = password;
        this.isAdmin = isAdmin;
    }

    static async authenticate(enteredUsername, enteredPassword) {
        const res = await db.query(
            `SELECT username,
                    password AS "hashedPassword",
                    is_admin AS "isAdmin"
             FROM users
             WHERE username = $1`,
            [enteredUsername]);

        if (res.rows[0]) {
            const isValid = await bcrypt.compare(enteredPassword, hashedPassword);
            if (isValid) {
                return new Users(username, isAdmin);
            }
        };

        //to-do create error for this
        throw new UnauthorizedError("Invalid username/password");
    }
};

module.exports = Users;
