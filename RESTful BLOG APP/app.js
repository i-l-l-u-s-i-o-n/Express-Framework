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
    
});


// NEW route
app.get("/blogs/new",function(req,res){
    res.render("new");
})


// CREATE route
app.post("/blogs",function(req,res){
    // Create a blog.
    // We have used blog[title] as a name for title, so that we can directly add the title to DB.
    var data=req.body.blog;
    Blog.create(data,function(err, newBlog){
        if (err) {
            console.log("Can't add new POST"+err);
            res.render("new");
        }else{
            res.redirect("/blogs");
        }
    })
})


// SHOW route
app.get("/blogs/:id",function(req, res) {
    
    // Retrieve the post for the ID.
    Blog.findById(req.params.id,function(err,post){
        if (err) {
            console.log(err);
            res.redirect("/blogs");
        }else{
            res.render("show", {blog: post});
        }
    })
    
});








app.listen(process.env.PORT,process.env.ID,function(){
    console.log("Server Started!");
})