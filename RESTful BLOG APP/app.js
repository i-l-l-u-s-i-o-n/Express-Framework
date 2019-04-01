// Created by Shivam Shukla.

var bodyParser      =require("body-parser"),
    express         =require("express"),
    mongoose        =require("mongoose"),
    app             =express(),
    methodOverride  =require("method-override"),
    expressSanitiser=require("express-sanitizer");   


// Connecting to mongo DB.
mongoose.connect("mongodb://localhost:27017/blog_app",{ useNewUrlParser: true });

app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));    // See the UPDATE route.
app.use(expressSanitiser()); // It removes all the <script> tags from the input when we use <%- %> to allow user to write html. It prevents from running malacious scripts.


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
    
    // Sanitising the body field of the blog.
    req.body.blog.body=req.sanitize(req.body.blog.body);    // Removing all the <script> tags from the body field.
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


// EDIT route
app.get("/blogs/:id/edit",function(req,res){
    
    Blog.findById(req.params.id,function (err,editBlog) {
        if (err) {
            console.log(err);
            res.redirect("/blogs");
        }else{
            res.render("edit", {blog:editBlog});
        }
        
    })

})



// UPDATE route

// We can use app.post() to do everything, but as we are following RESTful convention, here we use PUT method.
// But here's a problem!!!!!!!
//==============================================================================================================================//
//                                              FORM doesn't support PUT request.                                               //
//==============================================================================================================================//

// But there is also a solution.

//==============================================================================================================================//
//  We have to install a package "method-override" and the in the form section, we have to use method="POST" and write in the   //
//  action="/blogs/<%= blog._id%>?_method=PUT". Here ?_method=PUT is just a querry string, which tells that it is a PUT request.//
//==============================================================================================================================//
app.put("/blogs/:id",function(req,res){
     // Now update the data in the DATABASE. We will use following method.
    //  Blog.findByIDAndUpdate(id, newData , callback)
    
    var data=req.body.blog;   // As we used blog[title],blog[body] and blog[image] in the form so we do not need to fetch each parameter, 
                              // It will be automatically fetched as an object.
    Blog.findByIdAndUpdate(req.params.id, data, function(err, updatedPost){
        if (err) {
            console.log(err);
        }else{
            res.redirect("/blogs/"+req.params.id);
        }
    } )
})


// DELETE route
app.delete("/blogs/:id",function(req,res){
    // Delete the specific blog from the database.
    Blog.findByIdAndRemove(req.params.id,function(err){
        if (err) {
            console.log(err);
            res.redirect("/blogs");
        }else{
            res.redirect("/blogs");
        }
    })
})

app.listen(process.env.PORT,process.env.ID,function(){
    console.log("Server Started!");
})