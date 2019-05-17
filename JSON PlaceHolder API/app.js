var express=require("express"),
    request=require("request");
    
var app=express();
var count=0;




app.get("/", function(req,res){
    
    var url="https://jsonplaceholder.typicode.com/posts"
    request(url,function(error,response,body){
        if (!error && response.statusCode == 200) {
            var data=JSON.parse(body);
            if(data.Response !=='False' ){
                res.render("home.ejs",{post : data,count: count});
            }else{
                res.send("Error !!");
            }
        }
    });
});

app.get("/posts/:post_id",function(req,res){
    count = Number(req.params.post_id);
    res.redirect("/");
})

app.listen(process.env.PORT,process.env.ID,function(){
    console.log("Server started");
})