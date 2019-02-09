var express=require("express");

var app=express();

app.get("/",function(req,res){
    res.send("Hello There ! Welcome to my workshop.");
});


app.get("/speak/:animal",function(req,res){
    var vocabulary={
        pig: "Oink !",
        dog: "Woof Woof !",
        cow: "Moo !"
    }
    var output;
    var animal_name=req.params.animal.toLowerCase();
    if(vocabulary[animal_name]){
        output="The "+animal_name+" says : "+vocabulary[animal_name];
    }else{
        output="The animal doens't Exist in the vocabulary :( ";
    }
    res.send(output);
});



// repeat the word n no. of time.
app.get("/repeat/:string/:number",function(req,res){
    var no_of_time=Number(req.params.number);
    var string_to_be_printed=req.params.string;
    
    var outputString="";
    for(var i=no_of_time;i>0;i--){
        outputString += string_to_be_printed +" ";
    }
    
    res.send(outputString);
    
    // for(var i=no_of_time  ; i>0 ;i--){
    //     res.send(string_to_be_printed+" ");           WE CAN'T DO THIS AS WE CAN ONLY SEND ONE RESPONSE PER REQUEST !!   
    // }
});


app.get("*",function(req,res){
    res.send("The Page not found ! Go back :( ")
})


app.listen(process.env.PORT,process.env.IP,function () {
    console.log("Server has benn started !");
});