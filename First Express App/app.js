// Including Express 

var express=require("express");

// To use varios methos in Express we have to do ->
var app=express();


// For handeling various HTTP Requests , we have to create ROUTES.

  // ============================================================================================//
 //                          R   O   U   T   E   S                                              //
// ============================================================================================//


// On '/' .
app.get("/",function (req,res){
    res.send("Hi there from EXPRESS!")
});

// on '/bye' request ->
app.get("/bye",function(req,res){
    res.send("Goodbye !");
});

// On '/dog' request ->

app.get("/dog",function(req,res){
    res.send("Bark !");
});

//On '/cats' requests ->
app.get("/cats",function(req,res){
    res.send("Meow !");
});


// Now after creating ROUTES , We have to LISTEN for various requests ->
app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Server has Satrted !");
});

// The above syntax is Cloud 9 specific 
// In other IDE , we listen for request as ->

// app.listen(3000,function(){
//     console.log("Server has Satrted !");
// });



// To see the OUTPUT ->
// In terminal, first start the SERVER by typing -> node app.js.
// Then Go to(cloud9 specific) 
// https://express-framework-shivam1097.c9users.io/ 
// https://express-framework-shivam1097.c9users.io/dog
// https://express-framework-shivam1097.c9users.io/bye
