module.exports = (mongoose) =>{
    var studentSchema = mongoose.Schema({
        name : String,
        surname : String,
        age : Number,
        city : String,
        clg_name :String,
        index :Number,
    });

    const Student = mongoose.model("testing2",studentSchema);

    return Student;
}