// mongoose makes easy to deal with MONGO DB in JS

// MONGOOSE is npm package so we have to install it first.

var mongoose=require("mongoose");


// connecting to mongo db
mongoose.connect("mongodb://localhost:27017/demo_cat_app",{ useNewUrlParser: true });


// Creating a new schema ..... we have to specify a basic structure of table ....i.e type of fields.
// however we can change the fields, add new fields, remove existing fields.

var catSchema= new mongoose.Schema({
    name: String,
    age: Number,
    temprament: String
});


// Saving a Cat model from a catSchema to Cat variable.
// OR we are making  a collection Cat .
var Cat=mongoose.model("Cat",catSchema);

// Now we can use various CRUD operation i.e insert,find,update,remove on Cat.



// Adding a new cat to DB.
var Silly=new Cat({
    name:"Silly",
    age:6,
    temprament:"Grouchy"
});

Silly.save(function(err,cat){
    if (err) {
        console.log("Cat not added to the DB");
    }else{
        console.log("Cat successfully added to the DB");
        console.log(cat);
    }
})

