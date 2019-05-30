// module.exports helps us to clean up our code.

var mongoose=require("mongoose");

mongoose.connect("mongodb://localhost:27017/reference_object",{ useNewUrlParser: true });


// using posts.js module to get Post model .
var post=require("./model/posts.js")


// using users.js module to get User model.
var user=require("./model/users.js");


// user.create({
//     email:"abc@temp.com",
//     name:"Tim"
// })

// Creating a post.
post.create({
    title:"Another Post",
    content:"The content will be available soon"
},function(err,newPost) {
    if (err) {
        console.log(err)
    }else{
        user.findOne({email:"abc@temp.com"},function(err,foundUser){
            if (err) {
                console.log(err)
            }else{
            foundUser.posts.push(newPost);
            foundUser.save(function(err,data){
                if (err) {
                    console.log(err);
                }else{
                    console.log(data);
                }
            })    
            }
        })
    }
});

