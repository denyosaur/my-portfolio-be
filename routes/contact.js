const express = require("express");

const router = new express.Router();

router.get("/", async function (req, res, next) {
    try {

    } catch (error) {
        return next(error);
    }
});