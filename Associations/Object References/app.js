var mongoose=require("mongoose");

mongoose.connect("mongodb://localhost:27017/reference_object",{ useNewUrlParser: true });

var postSchema=new mongoose.Schema({
    title:String,
    content:String
})

var post=mongoose.model("Post",postSchema);

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

// user.create({
//     email:"abc@temp.com",
//     name:"Tim"
// })

// Creating a post.
// post.create({
//     title:"Another Post",
//     content:"The content will be available soon"
// },function(err,newPost) {
//     if (err) {
//         console.log(err)
//     }else{
//         user.findOne({email:"abc@temp.com"},function(err,foundUser){
//             if (err) {
//                 console.log(err)
//             }else{
//             foundUser.posts.push(newPost);
//             foundUser.save(function(err,data){
//                 if (err) {
//                     console.log(err);
//                 }else{
//                     console.log(data);
//                 }
//             })    
//             }
//         })
//     }
// });


// OUTPUT - 
// { posts: [ 5cefa9452b2c880935062441 ],
//   _id: 5cefa6aa5200ef08ef57a261,
//   email: 'abc@temp.com',
//   name: 'Tim',
//   __v: 1 }


// Now to find user and his all posts ->

// First find user and then all posts.

//.populate is used to to access those postsId's and place the content of posts.
//.exec is used to execute the function.

user.findOne({email:"abc@temp.com"}).populate("post").exec(function(err,user){
    if (err) {
        console.log(err)
    }else{
        console.log(user);
    }
})

//OUTPUT-
// { posts: [ 5cefa9452b2c880935062441, 5cefab89202365095b48d8d8 ],
//   _id: 5cefa6aa5200ef08ef57a261,
//   email: 'abc@temp.com',
//   name: 'Tim',
//   __v: 2 }