const { Router } = require("express");
const express = require("express");
const router = express.Router();

const Document = require("../models/Document");

// add document to user
router.post("/adddoc", async (req, res) => {
  const { docs, id_user, titre } = req.body;
  try {
    const newDoc = new Document({ docs, id_user, titre });
    let result = await newDoc.save();
    res.send({ result: result, msg: "document added" });
  } catch (error) {
    res.status(400).send({ msg: "can not add document" });
    console.log(error);
  }
});

// get all documents
router.get("/alldoc", async (req, res) => {
  try {
    const docs = await Document.find();
    res.send({ document: docs, msg: "documents fetched" });
  } catch (error) {
    res.status(400).send({ msg: "can not get documents" });
  }
});

//get documents by id_user
router.get("/userdocs/:id", async (req, res) => {
  try {
    const docs = await Document.find({ id_user: req.params.id });
    res.send({ documentUser: docs, msg: "documents fetched" });
  } catch (error) {
    res.status(400).send({ msg: "can not get documents" });
  }
});
module.exports = router;
