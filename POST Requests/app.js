var express=require("express");
var app=express();


// Intall and include body-parser to get the input data from request.
var bodyParser=require("body-parser");
// Now use it in our app as follows ->
app.use(bodyParser.urlencoded({extended: true}));


// Making express to look into public directory.
app.use(express.static("public"));



app.set("view engine","ejs");  // now no need to write home.ejs , only 'home' will do the same.



// Declaring todos array here so that different routes can access it.
var todos=["Meet Shivam","Meet Andrew at Hotel Parth Inn.","Appointment with Lisa","Pick up laundary clothes"];



// Handeling '/' get request.
app.get("/",function(req,res){
    res.render("home");
});



// Handeling Add Todo Button click(as '/listTodo'  is the 'action' specifed in the form in todos.ejs)
app.get("/listTodo",function(req,res){
    res.render("todos",{todos:todos}); 
});



// Handeling a POST request, made through a form.
// The action='/addTodo' is the route in the form tag in todos.ejs i.e if we click on submit button of form , it will take us to '/addTodo' route.
app.post("/addTodo",function(req,res){

    // We have to install "body-parser" to use the following method on request object -> req.body; 
    // This will create the request body and turn it into a JS object for our use .
    // We also must specify a attribute 'name' in the desired input tag for fetching the input data as follows (see the todos.ejs file)
    var newTodo=req.body.newTodoItem;
    todos.push(newTodo);
    
    // We can use redirect() to be redirected to a desired route.
    res.redirect("/listTodo");  // On adding a new ToDO , We are redirecting to /listTodo ROUTE to show the Todos with the Updated Todo Item.
});




// Starting server on c9 port.
app.listen(process.env.PORT,process.env.IP,function(){
    console.log("SERVER STARTED!"); 
});
