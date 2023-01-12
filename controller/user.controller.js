const db = require("../models");
const User = db.user;
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

exports.addUser = (req, res) => {
  const user = new User({
    name: req.fields.name,
    surname: req.fields.surname,
    age: req.fields.age,
    city: req.fields.city,
  });

  user
    .save()
    .then((data) => {
      res.status(200).send({
        success: "true",
        message: "User Added",
        data: data,
      });
    })
    .catch((error) => {
      res.status(400).send({
        success: "false",
        message: "User Not Added!",
        data: error,
      });
    });
};
exports.allUser = (req, res) => {
  let page = Number(req.query.page) || 1;
  let limit = Number(req.query.limit) || 10;
  let skip = (page - 1) * limit;
  const age = req.query.age;
  let matchObj = {};

  if (req.query.index) {
    matchObj["index"] = mongoose.Types.ObjectId(req.query.index);
  }
  let arg = {
    query: [
      {
        $match: {
          ...matchObj,
          isDelete: false,
        },
      },
      {
        $lookup: {
          from: "studentSchema",
          localField: "_id",
          foreignField: "index",
          as: " Student",
        },
      },
      { $unwind: "$Student" },
      {
        $project: {
          name: 1,
          age: 1,
          surname: 1,
          city: $Student.city,
          clg_name: $Student.clg_name,
        },
      },
    ],
  };

  User.find({
    // $or: [
    //   {
    //     name: { $regex: req?.query?.key },
    //   },
    // ],
    age,
  })
    .skip(skip)
    .limit(limit)
    .then((data) => {
      res.status(200).send({
        success: "true",
        message: "All User!",
        data: data,
      });
    });
};

exports.getEmail = async (req, res) => {
  console.log(req.fields);

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: "namanshah2104@gmail.com",
      pass: "ikauaajyuqnzwkqk",
    },
  });
  let name = req.fields.name;
  let email = req.fields.email;
  let message = req.fields.message;
  let info = await transporter.sendMail({
    from: name,
    to: email,
    // subject: "Feedback From Ganeshweb",
    text: message,
  });
  res.send("Success");
};

//   let transporter = nodemailer.createTransport({

//     host:'smtp.gmail.com',
//     port:100,
//     auth :{
//       user:"namanshah2104@gmail.com",
//       pass:"juyjujjpfenpwyxk",
//     }
//   });

//   // get the form data from the request body
//   let name = req.fields.name;
//   let email = req.fields.email;
//   let message = req.fields.message;

//   // create the email message

// let info = await transporter.sendMail({

//   from: name,
//   to:email,
//   subject:"Get Email",
//   text:"Get Email",
//   message:message,

//   // html:htm,
// });
//   // let mailOptions = {
//   //   from: "uditsinh.solanki@gmail.com",
//   //   to: "anantpatel8901@gmail.com",
//   //   subject: "New Message from My Website",
//   //   text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
//   // };
//   // send the email

//   transporter.sendMail(info, (error, info) => {

//     if (error) {
//       console.log(error);
//       res.send("Error");
//     } else {
//       console.log(info);
//       res.send("Success");
//     }
//   });
