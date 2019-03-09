
var express=require("express");

var app=express();

var data;
var query="";

var request=require("request");

app.use(express.static("public"));

app.get("/",function(req,res){
    res.render("home.ejs");
});


app.get("/result", function(req,res){
    // we use req.query when the request is sent via GET and we use req.body when the request is sent via POST
    
    
    query=req.query.search;
    var url="http://www.omdbapi.com/?s="+query+"&apikey=thewdb"
    request(url,function(error,response,body){
        if (!error && response.statusCode == 200) {
            data=JSON.parse(body);
            console.log("RESULT = "+query);
            if(data.Response !=='False' ){
                res.render("details.ejs",{data : data});
            }else{
                res.render("not_found_page.ejs");
            }
        }
    });
});


app.get("/full_detail/:imdbId",function(req,res){
    
    var ID=req.params.imdbId;
    
    // Now requesting for the movie datails using IMDB id.
    
    var link="http://www.omdbapi.com/?i="+ID+"&apikey=thewdb";
    console.log(ID);
    
    request(link,function(error, response, body) {
        if (!error && response.statusCode == 200) {
            data=JSON.parse(body);
            //console.log(data);
            console.log("Full details : "+query);
            res.render("full_detail.ejs",{data: data, result: query});
        }
    });
});


app.listen(process.env.PORT,process.env.ID,function(){
    console.log("Server started");
});