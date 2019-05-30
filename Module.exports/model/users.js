var mongoose=require("mongoose");

var userSchema=new mongoose.Schema({
    email:String,
    name:String,
    posts: [
          {
              type:mongoose.Schema.Types.ObjectId,   // Here we are referencing the post Id.
              ref:"post"
          }
        ]
})

var user=mongoose.model("User",userSchema);

module.exports= user;