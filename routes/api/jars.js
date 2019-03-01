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
      currency: req.body.currency ? req.body.currency : "pl"
    });

    // console.log(newJar);
    newJar.save().then(jar => res.json(jar));
  }
);

// @route POST api/jars/operation/:id
// @desc Add operation to jar
// @access Private
router.post(
  "/operation/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // const { errors, isValid } = validateJarInput(req.body);

    // if (!isValid) {
    //   return res.status(400).json(errors);
    // }
    let balance = 0;
    let newOperationHistory = {
      typeOfOperation: req.body.typeOfOperation,
      amount: req.body.amount,
      description: req.body.description,
      date: Date.now()
    };

    Jar.findById(req.params.id)
      .then(jar => {
        // count balance of jar depends on type of operation
        if (req.body.typeOfOperation === "Wpłata") {
          balance = eval(jar.balance) + eval(req.body.amount);
        }

        if (
          req.body.typeOfOperation === "Wypłata" ||
          req.body.typeOfOperation === "Przelew wychodzący"
        ) {
          balance = jar.balance - req.body.amount;
        }

        //  check if you have enought money in jar

        if (balance < 0) {
          return;
        }

        jar.balance = balance;
        jar.history.unshift(newOperationHistory);
        jar.save().then(jar => res.json(jar));
      })
      .catch(err => res.status(404).json({ jarnotfound: "jar not found" }));

    // check if send money to different jar
    if (req.body.recipientId) {
      //  get balance of recipent jar
      console.log(req.body.recipientId);
      Jar.findById(req.body.recipientId)
        .then(recipientJar => {
          balance = eval(recipientJar.balance) + eval(req.body.amount);
          newOperationHistory.typeOfOperation = "Przelew przychodzący";
          recipientJar.balance = balance;
          recipientJar.history.unshift(newOperationHistory);

          recipientJar.save().then(jar => res.json(jar));
        })
        .catch(err => res.status(404).json({ jarnotfound: "jar not found" }));
    }
  }
);

// @route DELETE api/jars/delete/:id
// @desc delete jar id
// @access Private
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("delete");
    Jar.findById(req.params.id)
      .then(jar => {
        jar.remove().then(() => res.json({ success: true }));
      })
      .catch(err => res.status(404).json({ postnotfound: "No jar found" }));
  }
);

module.exports = router;
