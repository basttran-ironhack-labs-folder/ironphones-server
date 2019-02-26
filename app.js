require("dotenv").config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const passport = require("passport");

// run the code inside of the passport-setup.js file

require("./config/passport-setup.js");

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

const app = express();

// Middleware Setup
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Allow Cross-Origin Ressource Sharing - CORS
// (allow access to the API from other domains/origins)
app.use(
  cors({
    // receive cookies from other domains/origins
    credentials: true,
    // only these domains/origins can access the API
    origin: ["http://localhost:3000"]
  })
);

//make our app create sessions & cookies for every browser/device

app.use(
  session({
    // set the default settings to avoid warnings
    resave: true,
    saveUninitialized: true,
    // session secret must be different for every app
    secret: process.env.SESSION_SECRET,
    // save session information inside our MongoDB
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);
// activate some of the passport methods in our route
app.use(passport.initialize());
// load the logged-in user's information once we are logged in
app.use(passport.session());

const phones = require("./routes/phone-router.js");
// all routes in the phone router will start with "/api"
// (examples: "/phones" -> "/api/phones")

app.use("/api", phones);

const auth = require("./routes/auth-router.js");
app.use("/api", auth);

module.exports = app;
