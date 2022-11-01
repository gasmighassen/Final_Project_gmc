const express = require("express");
const router = express.Router();

const Services = require("../models/services");

// GET
// get all services
router.get("/allservices", async (req, res) => {
  try {
    let result = await Services.find();
    res.send({ services: result, msg: "all services" });
  } catch (error) {
    console.log(error);
  }
});

// add new service

router.post("/addservice", async (req, res) => {
  const { serviceType, id_project } = req.body;
  try {
    const searchedService = await Services.findOne({ serviceType });
    if (searchedService) {
      return res.status(400).send({ msg: "service name already exist" });
    }

    const newService = new Services({ serviceType, id_project });
    let result = await newService.save();
    res.send({ result: result, msg: "project added" });
  } catch (error) {
    res.status(400).send({ msg: "can not add timeline" });
    console.log(error);
  }
});

// delete service
router.delete("/deletservice/:id", async (req, res) => {
  try {
    let result = await Services.findOneAndRemove({
      _id: req.params.id,
    });

    res.send({ msg: "category deleted" });
  } catch (error) {
    res.status(500).send("cannot delete service..");
    console.log(error);
  }
});

module.exports = router;
