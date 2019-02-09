var express=require("express");

var app=express();


app.get("/", function (req,res) {
    res.send("Welcome to posters!")
});



// Instead of writing specific route for each post ,we can use route param.
app.get("/f/:postName", function (req,res) {                             // We can't use / in the postName.(eg. /f/sports/cricket)
    var post=req.params.postName;
    res.send("Welcome to "+post.toUpperCase()+" post!")
});


// /comments must be same as it is not a route parameter (no : before it).
app.get("/f/:postName/comments/:id/:title", function (req,res) {
    var comment=req.params.title;
    res.send("Comment : "+comment.toUpperCase()+" post!")
});

app.get("*", function (req,res) {
    res.send("Go back PLEASE!")
});

// Listening to request ->
app.listen(process.env.PORT,process.env.IP,function () {
    console.log("Server has benn started !");
});