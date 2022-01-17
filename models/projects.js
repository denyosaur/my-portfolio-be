"use strict";

const db = require("../db");

class Projects {
    constructor(id, projectName, projectUrl, githubUrl1, githubUrl2, projectImageUrl, projectDescriptions) {
        this.id = id;
        this.projectName = projectName;
        this.projectUrl = projectUrl;
        this.githubUrl1 = githubUrl1;
        this.githubUrl2 = githubUrl2;
        this.projectImageUrl = projectImageUrl;
        this.projectDescriptions = projectDescriptions;
    }

    /* Get All Projects
    */
    static async getProjects() {
        const res = await db.query(`SELECT id,
                                           project_name AS "projectName",
                                           project_url AS "projectUrl",
                                           github_url1 AS "githubUrl1",
                                           github_url2 AS "githubUrl2",
                                           project_image_url AS "projectImageUrl",
                                           project_descriptions AS "projectDescriptions",
                                    FROM projects`);

        const projectsArray = res.rows.map(project => {
            return new Projects(project.id, project.projectName, project.projectUrl, project.githubUrl1, project.githubUrl2, project.projectImageUrl, project.projectDescriptions);
        })

        return projectsArray;
    }

    /* Create Projects
    */
    static async createProject(id, projectName, projectUrl, githubUrl1, githubUrl2, projectImageUrl, projectDescriptions) {
        const res = await db.query(`INSERT INTO projects
                                    (project_name, project_url, github_url1, github_url2, project_image_url, project_descriptions)
                                    VALUES ($1, $2, $3, $4, $5, $6)`,
            [id, projectName, projectUrl, githubUrl1, githubUrl2, projectImageUrl, projectDescriptions]);

        return new Contact(id, projectName, projectUrl, githubUrl1, githubUrl2, projectImageUrl, projectDescriptions);
    }

    /* Update Project Info
    */
    async updateProjectInfo(projectName, projectUrl, githubUrl1, githubUrl2, projectImageUrl, projectDescriptions) {
        const res = await db.query(`UPDATE projects
                                       SET project_name = $1,
                                           project_url = $2,
                                           github_url1 = $3,
                                           github_url2 = $4,
                                           project_image_url = $5,
                                           project_descriptions = $6,
                                       WHERE id = $7
                                       RETURNING id, 
                                                 project_name AS "projectName",
                                                 project_url AS "projectUrl",
                                                 github_url1 AS "githubUrl1",
                                                 github_url2 AS "githubUrl2",
                                                 project_image_url AS "projectImageUrl",
                                                 project_descriptions AS "projectDescriptions"`,
            [projectName, projectUrl, githubUrl1, githubUrl2, projectImageUrl, projectDescriptions, this.id]);

        return new Projects(res.rows[0].id, res.rows[0].username, res.rows[0].deckName, res.rows[0].deckImage);
    }

    /* Delete Project
    */
    async deleteProject() {
        const res = await db.query(`DELETE
                                    FROM projects
                                    WHERE id = $1
                                    RETURNING id`, [this.id]);

        return res.rows[0];
    }
};

module.exports = Projects;