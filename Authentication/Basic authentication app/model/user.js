var mongoose=require("mongoose");
var passLocalMongoose=require("passport-local-mongoose");
var userSchema=new mongoose.Schema({
    name: String,
    password:String
})

userSchema.plugin(passLocalMongoose);

module.exports= mongoose.model("User",userSchema);