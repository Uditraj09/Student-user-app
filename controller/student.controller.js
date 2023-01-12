const db = require("../models");
const Student = db.student;

exports.addStudent = (req,res) => {
const student = new Student({
    name : req.fields.name,
    surname : req.fields.surname,
    age : req.fields.age,
    city : req.fields.city,
    clg_name : req.fields.clg_name,
    index :req.fields.index,
});
student.save().then((data)=>{
    res.status(200).send({
        success: "true",
        message: "Student Added",
        data: data,
    });
}).catch((err)=>{
    res.status(400).send({
        success: "false",
        message: "Student did Not Added!",
        data: err,
    })
});
};

exports.allStudent = (req,res) => {
    Student.find({}).then((data) => {
        res.status(200).send({
            success: "true",
            message: "All Student!",
            data: data,
    });
});
}