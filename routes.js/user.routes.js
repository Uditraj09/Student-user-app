module.exports = (app) => {
  const user = require("../controller/user.controller.js");
  const express = require("express");
  const router = express.Router();

  router.post("/addUser", user.addUser);
  router.get("/allUser", user.allUser);
  router.post("/getEmail", user.getEmail);
  
  app.use("/api", router);
};
