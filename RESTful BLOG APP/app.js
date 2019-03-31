// Created by Shivam Shukla.

var bodyParser  =require("body-parser"),
    express     =require("express"),
    mongoose    =require("mongoose"),
    app         =express();


// Connecting to mongo DB.
mongoose.connect("mongodb://localhost:27017/blog_app",{ useNewUrlParser: true });

app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


// Creating mongo Schema.
var blogSchema=new mongoose.Schema({
    title:String,
    image:String,
    body:String,
    created:{type:Date, default:Date.now}    // This will automatically add the date on which it is posted.
});


// Translating schema into model.
var Blog=mongoose.model("Blog",blogSchema);



//Creatind and adding first blog.
// Blog.create({
//     title:"How to delete one record from mongo DB.",
//     image:"https://cdn-images-1.medium.com/max/1200/1*Mx3MUKkPENbaIR-vKGeLDw.jpeg",
//     body:"You can delete only record in case of multiple records by using following syntax:\n"+
//         "db.collection.remove({\"condition\": \"some condition\"}, {justOne: true});"
//     },  function(err,blog){
//         if (err) {
//             console.log("Some error uccured while adding blog !");
//         }else{
//             console.log("Successfully added!"+blog);
//         }
//     });
    

// ============================================   RESTFUL ROUTES   ==============================================// 


app.get("/",function(req,res){
    res.redirect("/blogs");
})

// INDEX route
app.get("/blogs",function(req,res){
    
    // Retrieving blogs.
    Blog.find({},function(err,blogs){
        if (err) {
            console.log("Can't fetch blogs.");
        }else{
            res.render("index", {blogs: blogs});
        }
    })
    
})










app.listen(process.env.PORT,process.env.ID,function(){
    console.log("Server Started!");
})