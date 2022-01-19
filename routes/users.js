"use strict";

/* Routes for Authentication */

const express = require("express");
const router = new express.Router();

const Users = require("../models/users");

const { HelperFunctions } = require("../helper/helpers");
const userAuthSchema = require("../schemas/userAuth.json");


/* POST /auth/token: {username,password} => token 
validate that the username and password are in the right format using jsonschema. if not valid, throw BadRequestError
destructure req.body object 
use authenticate method from User by passing in username and password. if incorrect password, error will be thrown
create a token with the username 
*/
router.post("/login", async function (req, res, next) {
    try {
        HelperFunctions.jsonValidate(req.body, userAuthSchema);//validate username and password object schema

        //check that username exists and password is correct
        const { username, password } = req.body;

        const user = await Users.authenticate(username, password);
        const token = HelperFunctions.createToken(user);

        return res.status(200).res.json({ token });
    } catch (error) {
        return next(error);
    };
});