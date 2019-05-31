var express                 = require("express"),
    mongoose                = require("mongoose"),
    passport                = require("passport"),
    bodyParser              = require("body-parser"),
    User                    = require("./model/user"),
    LocalAuth               = require("passport-local"),
    PassportLocalMongoose   = require("passport-local-mongoose");


mongoose.connect("mongodb://localhost/auth_db",{ useNewUrlParser: true });
var app=express();
app.set("view engine", "ejs");



app.use(require("express-session")({
    
    // The following secret text wil be used to encrypt or decrypt the session data.
    secret: "Work hard unless you get what you want",
    resave: false,
    saveUninitialized: false
}));



// Whenever we use passport, we have to do following->
app.use(passport.initialize());
app.use(passport.session());


//For encrypting and decrypting session data -
passport.serializableUser(User.serializeUser())
passport.deserializableUser(User.deserializeUser())

app.get("/",function(req,res){
    res.render("home")
})

// Secret page

app.get("/secret",function(req,res){
    res.render("secret")
})
app.listen(process.env.PORT,process.env.IP,function(){
    console.log("SERVER STARTED!"); 
});
