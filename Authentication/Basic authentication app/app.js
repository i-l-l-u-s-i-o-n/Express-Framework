var express                 = require("express"),
    mongoose                = require("mongoose"),
    passport                = require("passport"),
    bodyParser              = require("body-parser"),
    User                    = require("./model/user"),
    LocalStrategy               = require("passport-local"),
    PassportLocalMongoose   = require("passport-local-mongoose");


mongoose.connect("mongodb://localhost/auth_db",{ useNewUrlParser: true });
var app=express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended : true}))



app.use(require("express-session")({
    
    // The following secret text wil be used to encrypt or decrypt the session data.
    secret: "Work hard unless you get what you want",
    resave: false,
    saveUninitialized: false
}));



// Whenever we use passport, we have to do following->
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

//For encrypting and decrypting session data -
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())




// Routes =======================================================================================================================

app.get("/",function(req,res){
    res.render("home")
})

// Secret page

app.get("/secret",function(req,res){
    res.render("secret")
})



// Auth Routes ====================================================================================================================

// Show signup form
app.get("/register",function(req,res){
    res.render("register");
})

// Handel signup process.
app.post("/register",function(req,res){
    
    
    // Here we are passing only name to be stored in the database, we don't eant our password to stored directly stored in database.
    // So we pass it as another argument to .register() so as the it hashes the pass word and the stored the HASHED value of password. 
    console.log(req.body.username)
    User.register(new User({username: req.body.username}) , req.body.password ,function(err, user){
        if (err) {
            console.log(err)
            return res.render("register");
        }
        
        // If there is no error, then .authenticate takes care of all the stuff like sessions etc.
        // we can specify the method to login such as using google or facebook or local.
        passport.authenticate("local")(req,res, function(){
            res.redirect("/secret");
        })
    })
    

})


// Login routes 

app.get("/login",function(req,res){
    res.render("login");
})

// Login Logic 

// Using 'middleware', which starts executing at the begining of route and and ends before the final callback.
app.post("/login", passport.authenticate("local",{
    successRedirect : "/secret",
    faliureRedirect : "/faliure"
}), function(req,res){});




// LOGOUT route
app.get("/logout",function(req,res){
    
    // Using passport, it becomes very simple to logout. req.logout() deletes all the user data in the session.
    req.logout();
    
    res.redirect("/");
})




app.listen(process.env.PORT,process.env.IP,function(){
    console.log("SERVER STARTED!"); 
});
