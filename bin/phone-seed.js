require("dotenv").config();

const mongoose = require("mongoose");

const Phone = require("../models/phone-model.js");

const allPhones = require("./phones.json");

mongoose
  .connect("mongodb://localhost/ironphones-server-starter", {
    useNewUrlParser: true
  })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

Phone.insertMany(allPhones)
  .then(phoneResult => {
    console.log(`Inserted ${phoneResult.length} phones`);
  })
  .catch(err => {
    console.log("PHONE insert error", err);
  });
