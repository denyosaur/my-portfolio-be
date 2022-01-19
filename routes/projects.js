const express = require("express");
const router = new express.Router();

const Projects = require("../models/projects");

const Middleware = require("./middleware/middleware");

router.get("/", async function (req, res, next) {
    try {
        const projectsInfo = await Projects.getAllProjects();

        return res.status(200).res.json({ projectsInfo });
    } catch (error) {
        return next(error);
    }
});

router.post("/add-project", Middleware.ensureAdmin, async function (req, res, next) {
    try {
        const { newProjectData } = req.body;

        const newProject = await Projects.updateProjectInfo(newProjectData);

        return res.status(201).res.json({ newProject });
    } catch (error) {
        return next(error);
    }
});

router.patch("/update-project/:projectIdtoUpdate", Middleware.ensureAdmin, async function (req, res, next) {
    try {
        const { updateData } = req.body;
        const { projectIdtoUpdate } = req.params;

        const updatedProjectData = await Projects.updateProjectInfo(projectIdtoUpdate, updateData);

        return res.status(200).res.json({ updatedProjectData });
    } catch (error) {
        return next(error);
    }
});

router.delete("/delete-project/:projectIdToDelete", Middleware.ensureAdmin, async function (req, res, next) {
    try {
        const { projectIdToDelete } = req.params;

        const deletedProjectData = await Projects.deleteProject(projectIdToDelete);

        return res.status(200).res.json({ deletedProjectData });
    } catch (error) {
        return next(error);
    }
});