const express = require("express");
const router = express.Router();

const Project = require("../models/project");
const Services = require("../models/services");
const { ProjectRules, validation } = require("../middelwares/validator");
// POST

// save new project

router.post("/addproject", ProjectRules(), async (req, res) => {
  const { projectName, id_user, infoProject, services } = req.body;
  try {
    const searchedProject = await Project.findOne({ projectName });
    if (searchedProject) {
      return res.status(400).send({ msg: "project name already exist" });
    }
    const newProject = new Project({
      projectName,
      id_user,
      infoProject,
      services,
    });
    let result = await newProject.save();
    res.send({ result: result, msg: "project added" });
  } catch (error) {
    console.log(error);
  }
});

// get all projects
router.get("/all", async (req, res) => {
  try {
    let result = await Project.find()
      .populate("services", "serviceType")
      .populate("id_user", ["name", "lastName"]);

    res.send({ projects: result, msg: "all project" });
  } catch (error) {
    console.log(error);
  }
});

// get this user projects

router.get("/userprojects/:id", async (req, res) => {
  try {
    let result = await Project.find({ id_user: req.params.id })
      .populate("services", "serviceType")
      .populate("id_user", ["name", "lastName"]);
    res.send({ result: result, msg: "user's projects" });
  } catch (error) {
    console.log(error);
  }
});

//PUT
// update project

router.put("/project/:id", async (req, res) => {
  try {
    const checkCat = await Services.findOne({ _id: req.body.services.id });
    if (!checkCat) {
      var project = await Project.findOneAndUpdate(
        { _id: req.params.id },
        { $addToSet: { services: req.body.services } },
        // { $upsert: true },
        { new: true }
      );
    }
    res.send({ project: project, msg: "added successfully" });
  } catch (error) {
    res.status(500).send("cannot update the project..");
    console.log(error);
  }
});

// DELETE
// delete poject
router.delete("/deletepro/:id", async (req, res) => {
  try {
    let result = await Project.findOneAndRemove({
      _id: req.params.id,
    });

    res.send({ msg: "project deleted" });
  } catch (error) {
    res.status(500).send("cannot delete project..");
    console.log(error);
  }
});

module.exports = router;
