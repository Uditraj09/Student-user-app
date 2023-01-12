
module.exports = (mongoose) =>{
    var userSchema = mongoose.Schema({
        name : String,
        surname : String,
        age : Number,
        city : String,
    });

    const User = mongoose.model("testing",userSchema);

    return User;
}
 


