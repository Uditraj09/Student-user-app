const dbConfig = require("../config/db.config");
const mongoose = require("mongoose");

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;

db.user = require("./user.model.js")(mongoose);
db.student = require("./student.model.js")(mongoose);

module.exports = db;
