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

    static async getContactInfo(id) {
        const res = await db.query(`SELECT id,
                                           linkedin_url AS "linkedinUrl",
                                           github_profile_url AS "githubProfileUrl",
                                           gmail,
                                           facebook_url AS "facebookUrl",
                                           instagram_url AS "instagramUrl"
                                    FROM contact
                                    WHERE id = $1`, [id]);

        return new Contact(res.rows[0].id, res.rows[0].linkedinUrl, res.rows[0].githubProfileUrl, res.rows[0].gmail, res.rows[0].facebookUrl, res.rows[0].instagramUrl);
    }

    static async updateContactInfo(id, updateData) {
        const { setCols, values } = HelperFunctions.sqlForPartialUpdate(
            updateData,
            {
                linkedinUrl: "linkedin_url",
                githubProfileUrl: "github_profile_url",
                gmail: "gmail",
                facebookUrl: "facebook_url",
                instagramUrl: "instagram_url"
            }
        );

        const contactIndex = values.length + 1;

        const res = await db.query(`UPDATE contact
                                    SET ${setCols}
                                    WHERE id = $${contactIndex}
                                    RETURNING id, 
                                              linkedin_url AS "linkedinUrl",
                                              github_profile_url AS "githubProfileUrl",
                                              gmail AS "gmail",
                                              facebook_url AS "facebookUrl",
                                              instagram_url AS "instagramUrl"`,
            [...values, id]);

        return new Contact(res.rows[0].id, res.rows[0].linkedinUrl, res.rows[0].githubProfileUrl, res.rows[0].gmail, res.rows[0].facebookUrl, res.rows[0].instagramUrl);
    }
};

module.exports = Contact;