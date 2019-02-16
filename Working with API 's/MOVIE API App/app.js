
var express=require("express");

var app=express();

var data;

var request=require("request");

app.use(express.static("public"));

app.get("/",function(req,res){
    res.render("home.ejs");
});

app.get("/result",function(req,res){
    
    
    
    // we use req.query when the request is sent via GET and we use req.body when the request is sent via POST
    
    
    var query=req.query.search;
    console.log(typeof query);
    var url="http://www.omdbapi.com/?s="+query+"&apikey=thewdb"
    request(url,function(error,response,body){
        if (!error && response.statusCode == 200) {
            data=JSON.parse(body);
            console.log(data);
            if(data.Response !=='False' ){
                res.render("details.ejs",{data : data});
            }else{
                res.send("Not Found !");
            }
        }
    });
});


app.get("/full_detail",function(req,res){
    res.render("full_detail.ejs");
});

app.listen(process.env.PORT,process.env.ID,function(){
    console.log("Server started");
});