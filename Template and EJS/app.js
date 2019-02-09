// Create a package.json

// First install express
// Then install ejs

// Add the ejs pages in the views directory!

 // EJS -> Embedded JavaScript ->To create dynamic web pages 

var express=require("express"); 
var app=express();

app.get("/",function(req,res){
    res.render("home.ejs");
});

app.get("/welcome/:name",function(req,res){
    res.render("welcome.ejs",{nameVar: req.params.name});   // Pass parameter as the object.
});

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Server Started");
});

