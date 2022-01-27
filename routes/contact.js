const express = require("express");

const router = new express.Router();

const Contact = require("../models/contact");

const Middleware = require("../middleware/middleware");

const { HelperFunctions } = require("../helper/helpers");
const userContactInfoUpdate = require("../schemas/userContactInfoUpdate.json");

router.get("/", async function (req, res, next) {
    try {
        const contactInfo = await Contact.getContactInfo();

        return res.status(200).res.json({ contactInfo });
    } catch (error) {
        return next(error);
    }
});

router.patch("/update-contact", Middleware.ensureAdmin, async function (req, res, next) {
    try {
        HelperFunctions.validateJson(req.body, userContactInfoUpdate);

        const { updatedContactInfo } = req.body;

        const contactInfo = await Contact.updateContactInfo(1, updatedContactInfo);

        return res.status(200).res.json({ contactInfo });
    } catch (error) {
        return next(error);
    }
});

module.exports = router;