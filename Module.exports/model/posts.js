var mongoose=require("mongoose");



// Post schema and model
var postSchema=new mongoose.Schema({
    title:String,
    content:String
})

var post=mongoose.model("Post",postSchema);

// module.exports can be thought of function , returning or exporting something, which can be then used anywhere by using 'require'.

module.exports = post   // Here we are returning post model.