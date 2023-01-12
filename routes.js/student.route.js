module.exports = (app)=>{
    const student = require("../controller/student.controller.js");
    const express = require("express");
    const router = express.Router();

    router.post("/addStudent",student.addStudent);
    router.get("/getStudent",student.allStudent);

    app.use("/api",router);
}