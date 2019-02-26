const express = require("express");

const Phone = require("../models/phone-model.js");

const router = express.Router();

router.get("/phones", (req, res, next) => {
  Phone.find()
    .sort({ createdAt: -1 })
    .limit(20)
    // send the DB query results array as a JSON response to the client
    .then(phoneResult => res.json(phoneResult))
    .catch(err => next(err));
});

router.get("/phones/:phoneId", (req, res, next) => {
  const { phoneId } = req.params;
  Phone.findById(phoneId)
    .then(phoneDoc => res.json(phoneDoc))
    .catch(err => next(err));
});

router.post("/phones", (req, res, next) => {
  const { phoneModel, brand, price, image, specs } = req.body;
  Phone.create({ phoneModel, brand, price, image, specs })
    // send the DB query result document as a JSON response to the client
    .then(phoneDoc => res.json(phoneDoc))
    .catch(err => next(err));
});

module.exports = router;
