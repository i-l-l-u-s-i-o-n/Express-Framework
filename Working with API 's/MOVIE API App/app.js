
var express=require("express");

var app=express();

var request=require("request");

app.get("/",function(req,res){
    res.send("Working");
});

app.listen(process.env.PORT,process.env.ID,function(){
    console.log("Server started");
})