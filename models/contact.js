"use strict";

const db = require("../db");

class Contact {
    constructor(id, linkedinUrl, githubProfileUrl, gmail, facebookUrl, instagramUrl) {
        this.id = id;
        this.linkedin_url = linkedinUrl;
        this.github_profile_url = githubProfileUrl;
        this.gmail = gmail;
        this.facebook_url = facebookUrl;
        this.instagram_url = instagramUrl;
    }

    static async getContact(id) {
        const res = await db.query(`SELECT id,
                                           linkedin_url AS "linkedinUrl",
                                           github_profile_url AS "githubProfileUrl",
                                           gmail,
                                           facebook_url AS "facebookUrl",
                                           instagram_url AS "instagramUrl"
                                    FROM cards
                                    WHERE id = $1`, [id]);

        return new Contact(res.rows[0].id, res.rows[0].linkedinUrl, res.rows[0].githubProfileUrl, res.rows[0].gmail, res.rows[0].facebookUrl, res.rows[0].instagramUrl);
    }
};

module.exports = Contact;