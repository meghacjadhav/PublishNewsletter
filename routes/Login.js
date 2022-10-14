const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const admin = require("../models/adminSchema");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = "SECRET";
const bodyparser=require("body-parser")
router.use(bodyparser.json());

router.post("/register",async (req, res) => {
      try {
            const salt = await bcrypt.genSalt(12);
            bcrypt.hash(req.body.password, salt, async (err, hash) => {
              await admin.create({
                email: req.body.email,
                password: hash,
              });
            });
            res.status(200).json({
              status: "Success",
              message: "Please Login",
            });
          }
     catch (error) {
        res.status(500).json({
          status: "Failed",
          message: err.message,
        });
      }
    }
  );

router.post("/login", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const adminData = await admin.findOne({ email: email });
    if (adminData != null) {
      var result = await bcrypt.compare(password, adminData.password);
      if (result) {
        const token = jwt.sign(
          {
            exp: Math.floor(Date.now() / 10) + 60 * 60,
            data: adminData._id,
          },
          secret
        );
        res.json({
          status: "Success",
          token: token,
        });
      } else {
        res.json({
          status: "Failed",
          message: "Wrong Password",
        });
      }
    } else {
      res.status(400).json({
        status: "Failed",
        message: "No admin Found",
      });
    }
  });
  
  module.exports = router;