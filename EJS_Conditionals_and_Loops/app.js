var express=require("express"); 
var app=express();

app.get("/",function(req,res){
    res.render("home.ejs");
});

app.get("/posts",function(req,res){
    
    var posts=[
        {
            title : "The amazing Spider man", author:"Colt"
        },
        {
            title :"A quiet place", author:"Stan"
        },
        {
            title :"The Funny cat", author:"Tim"
        }];
    
    res.render("posts.ejs",{posts_details: posts});   // Pass parameter as the object.
});


app.get("/if/:name",function (req,res){
    res.render("condition.ejs",{name : req.params.name})
});

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Server Started");
});

