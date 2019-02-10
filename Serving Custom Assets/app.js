var express=require("express"); 
var app=express();

// We have created 2 template i.e header.ejs and footer.ejs in 'public' directory.

// We have also included a css in the header section , so it will be applied to all pages which will include header.ejs.

// We must do href="/app.css" in the link tag in header template , '/' before app.css indicate the 
// the file must be looked in root folder, not in cuurent directory.

// We have to also make sure that express will also look in public directory , so to do so->
// This will tell express to serve the content of public directory.
app.use(express.static("public"));
app.use(express.static("partials"));


// We are telling express to use 'ejs' file every time->
app.set("view engine","ejs");    //now there is no need to specify .ejs .


app.get("/",function(req,res){
    res.render("home");
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
    
    res.render("posts",{posts_details: posts});   // Pass parameter as the object.
});



app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Server Started");
});

