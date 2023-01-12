const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// const nodemailer = require('nodemailer');

const app = express();
app.use(express.json());
// app.use(express.static("public"));
app.use(cors());
app.use(bodyParser.json());
// app.use(express.urlencoded({ extended: false }));
const port = 5000;

app.get("/", (req, res) => {
  res.send({ message: "Server is Running!" });
});
const db = require("./models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to Database!");
  })
  .catch((err) => {
    console.log("Cant't Connect to Database!", err);
    process.exit();
  });

const formidable = require("express-formidable");
app.use(formidable());
require("./routes.js/user.routes.js")(app);
require("./routes.js/student.route.js")(app);

app.listen(port, () => {
  console.log("Server is Listening!");
});
