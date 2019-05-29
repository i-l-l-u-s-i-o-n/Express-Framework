var mongoose=require("mongoose");

mongoose.connect("mongodb://localhost:27017/associations_db",{ useNewUrlParser: true });

// POST


// Post Schema

var postSchema = new mongoose.Schema({
    title:String,
    content:String
});

// Post model

var post=mongoose.model("Post",postSchema);



// USER 


// User schema
var UserSchema=new mongoose.Schema({
    email:String,
    name:String,
    posts:[postSchema]      // Here we are creating a field which holds POSTS array.
});

// User model
var user=mongoose.model("User",UserSchema);


// Creating new User
var newUser= new user({
    email:"shivam_s@temp.com",
    name:"Shivam Shukla",
});

// Creating a new Post and associating it with new User.
newUser.posts.push({
    title:"This is my first Post!",
    content:"This is the first ever post made by me!!!!!"
})

// Adding new User
// newUser.save(function(err,user){
//     if (err) {
//         console.log(err)
//     }else{
//         console.log(user)
//     }
// });

// user.find({},function(err,usr){
//     if (err) {
//         console.log(err)
//     }else{
//         console.log(usr)
//     }
// })
user.findOne({name: "Shivam Shukla"},function(err,usr){
    if (err) {
        console.log(err)
    }else{
        usr.posts.push({    // Adding another post for same user.........
            title:" OMG! This is my second Post !!",
            content:"No content for post."
        });
        usr.save(function(err,user){
            if (err) {
                console.log(err)
            }else{
                console.log(usr)
            } 
        });
    }
});

// Output - 

// { _id: 5ceea5de54e8960e19b21010,
//   email: 'shivam_s@temp.com',
//   name: 'Shivam Shukla',
//   posts: 
//   [ { _id: 5ceea5de54e8960e19b21011,
//       title: 'This is my first Post!',
//       content: 'This is the first ever post made by me!!!!!' },
//      { _id: 5ceea862fb830e0eaba877f5,
//       title: ' OMG! This is my second Post !!',
//       content: 'No content for post.' } ],
//   __v: 1 }