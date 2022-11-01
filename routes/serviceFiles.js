const express = require("express");
const router = express.Router();
const ServiceFiles = require("../models/ServiceFiles");

// add files item to project
router.post("/addservicefiles", async (req, res) => {
  try {
    const newSetItem = new ServiceFiles({
      services: req.body.services,
      id_project: req.body.id_project,
      files: req.body.files,
      description: req.body.description,
      feedback: req.body.feedback,
    });
    let result = await newSetItem.save();
    res.send({ result: result, msg: "set items added" });
  } catch (error) {
    console.log(error);
  }
});
//Update items add files
router.put("/addfile/:id", async (req, res) => {
  try {
    const checkItem = await ServiceFiles.findOne({
      _id: req.body.id,
    });
    if (!checkItem) {
      var items = await ServiceFiles.findOneAndUpdate(
        { _id: req.params.id },

        { $addToSet: { files: req.body.files } },
        // { $upsert: true },
        { new: true }
      );
    }
    res.send({ items: items, msg: "added successfully" });
  } catch (error) {
    res.status(500).send("cannot update the project..");
    console.log(error);
  }
});

// Get category by id
router.get("/file/:id", async (req, res) => {
  try {
    let result = await ServiceFiles.find({ id_project: req.params.id });
    res.send({ files: result, msg: "done" });
  } catch (error) {
    console.log(error);
  }
});
// Get all files
// http://localhost:5000/files/allfeeds
router.get("/allfeeds", async (req, res) => {
  try {
    let result = await ServiceFiles.find()
      .populate("id_project", ["projectName", "id_user"])
      .populate("services", "serviceType");
    res.send({ allfeeds: result, msg: "done" });
  } catch (error) {
    console.log(error);
  }
});
//Delete file
router.put("/deletefile/:id/:fileId", async (req, res) => {
  try {
    let service = await ServiceFiles.findOne({
      _id: req.params.id,
    });
    let files = service.files;

    let filtred = files.filter((el) => el._id != req.params.fileId);
    if (filtred.length == 0) {
      var result = await ServiceFiles.findOneAndDelete({ _id: req.params.id });
    } else {
      var result = await ServiceFiles.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        { $set: { files: filtred } }
      );
    }

    res.send({ result: result, msg: "updated successfully" });
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

// add feedback to file
router.put("/addfeed/:id", async (req, res) => {
  try {
    let newFeed = req.body.feedback;

    var result = await ServiceFiles.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { $push: { feedback: newFeed } },
      { new: true }
    );

    res.send({ result: result, msg: "updated successfully" });
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

module.exports = router;
