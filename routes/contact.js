const express = require("express");

const Contact = require("../models/contact");

const router = new express.Router();

router.get("/", async function (req, res, next) {
    try {
        const contactInfo = await Contact.getContactInfo();

        return res.status(200).res.json({ contactInfo });
    } catch (error) {
        return next(error);
    }
});

router.patch("/update-contact", async function (req, res, next) {
    try {
        const { updatedContactInfo } = req.body;

        const contactInfo = await Contact.updateContactInfo(1, updatedContactInfo);

        return res.status(200).res.json({ contactInfo });
    } catch (error) {
        return next(error);
    }
});