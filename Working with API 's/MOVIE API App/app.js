
var express=require("express");

var app=express();

var request=require("request");


app.use(express.static("public"));

app.get("/",function(req,res){
    res.render("home.ejs");
});

app.get("/result",function(req,res){
    res.render("home.ejs")
})




app.listen(process.env.PORT,process.env.ID,function(){
    console.log("Server started");
});