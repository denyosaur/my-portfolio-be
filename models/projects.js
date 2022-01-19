"use strict";

const db = require("../db");

const { HelperFunctions } = require("../helper/helpers");
const { BadRequestError } = require("../helper/expressErrors");

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
    static async getAllProjects() {
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
    static async addProject(newProjectName, newProjectUrl, newGithubUrl1, newGithubUrl2, newProjectImageUrl, newProjectDescriptions) {
        const res = await db.query(`INSERT INTO projects
                                    (project_name, project_url, github_url1, github_url2, project_image_url, project_descriptions)
                                    VALUES ($1, $2, $3, $4, $5, $6)
                                    RETURNING id, 
                                              project_name AS "projectName",
                                              project_url AS "projectUrl",
                                              github_url1 AS "githubUrl1",
                                              github_url2 AS "githubUrl2",
                                              project_image_url AS "projectImageUrl",
                                              project_descriptions AS "projectDescriptions"`,
            [id, newProjectName, newProjectUrl, newGithubUrl1, newGithubUrl2, newProjectImageUrl, newProjectDescriptions]);

        return new Projects(res.rows[0].id, res.rows[0].projectName, res.rows[0].projectUrl, res.rows[0].githubUrl1, res.rows[0].githubUrl2, res.rows[0].projectImageUrl, res.rows[0].projectDescriptions);
    }

    /* Update Project Info
    */
    async updateProjectInfo(updateData) {
        const { setCols, values } = HelperFunctions.sqlForPartialUpdate(
            updateData,
            {
                projectName: "project_name",
                projectUrl: "project_url",
                githubUrl1: "github_url1",
                githubUrl2: "github_url2",
                projectImageUrl: "project_image_url",
                projectDescriptions: "project_descriptions"
            }
        );
        const IdIndex = values.length + 1;

        const res = await db.query(`UPDATE projects
                                    SET ${setCols}
                                    WHERE id = $${IdIndex}
                                    RETURNING id, 
                                              project_name AS "projectName",
                                              project_url AS "projectUrl",
                                              github_url1 AS "githubUrl1",
                                              github_url2 AS "githubUrl2",
                                              project_image_url AS "projectImageUrl",
                                              project_descriptions AS "projectDescriptions"`,
            [...values, this.id]);

        return new Projects(res.rows[0].projectName, res.rows[0].projectUrl, res.rows[0].githubUrl1, res.rows[0].githubUrl2, res.rows[0].projectImageUrl, res.rows[0].projectDescriptions);
    }

    /* Delete Project
    */
    async deleteProject() {
        const res = await db.query(`DELETE
                                    FROM projects
                                    WHERE id = $1
                                    RETURNING id`, [this.id]);
        if (res.rows[0]) {
            return `${this.id} has been deleted.`;
        } else {
            throw new BadRequestError("Project not found.");
        }
    }
};

module.exports = Projects;