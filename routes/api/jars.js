const express = require("express");
const router = express.Router();
const passport = require("passport");

//Load Input validation
// const validateJarInput = require("../../validation/jar");

const Jar = require("../../models/Jar");

// @route GET api/jars
// @desc get jars
// @access Public
router.get("/", (req, res) => {
  Jar.find()
    .sort({ date: -1 })
    .then(jars => res.json(jars))
    .catch(err => res.status(404).json({ nojarsfound: `No jars found` }));
});

// @route POST api/jars
// @desc create jar
// @access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //   const { errors, isValid } = validateJarInput(req.body);

    //   if (!isValid) {
    //     return res.status(400).json(errors);
    //   }
    console.log(req.body);

    const newJar = new Jar({
      name: req.body.name,
      typeOfJar: req.body.typeOfJar,
      currency: req.body.currency === "" ? "pl" : req.body.currency
    });

    // console.log(newJar);
    newJar.save().then(jar => res.json(jar));
  }
);

module.exports = router;
