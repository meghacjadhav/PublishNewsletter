const express = require("express");
const router = express.Router();
const Subscribe = require("../models/subscribersSchema");
const { body, validationResult } = require("express-validator");
const bodyparser=require("body-parser")
router.use(bodyparser.json());

router.post("/subscribe",body("email").isEmail(), async (req, res) => {
    try {
        const errors = validationResult(req);
        // console.log(req.body)
        if (!errors.isEmpty()) {
            res.status(400).json({
              status: "Failed",
              message: errors.array(),
            });
          } else {
        data = await Subscribe.create({email:req.body.email});
        res.status(200).json({
            status: "Success",
            data: data,
          });
      }
      } catch (error) {
      res.status(500).json({
        status: "Failed",
        message: error.message,
      });
    }
  });
  

  router.get("/view", async (req, res) => {  
      try {
        const data = await Subscribe.find();
        console.log(data)
        res.json({
          status: "Success",
          data: data,
        });
      } catch (error) {
        res.status(500).json({
          status: "Failed",
          message: error.message,
        });
      }
  });
  
  router.delete("/delete/:id", async (req, res) => {
   
    try {
      let data = await Subscribe.deleteOne({ _id: req.params.id });
      res.status(200).json({
        status: "Deleted",
        message: data,
      });
    } catch (error) {
      res.status(500).json({
        status: "Delete Failed",
        message: error.message,
      });
    }
  });
  
  module.exports = router;

