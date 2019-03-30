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



// ==================================================== Adding a new cat to DB.====================================//

var Silly=new Cat({
    name:"Silly",
    age:6,
    temprament:"Grouchy"
});


// To add, we use save().
Silly.save(function(err,cat){
    if (err) {
        console.log("Cat not added to the DB");
    }else{
        console.log("Cat successfully added to the DB");
        console.log(cat);
    }
})

var Norris=new Cat({
    name:"Norris",
    age:11,
    temprament:"Evil"
});


// To add, we use save().
Norris.save(function(err,cat){
    if (err) {
        console.log("Cat not added to the DB");
    }else{
        console.log("Cat successfully added to the DB");
        console.log(cat);
    }
})


// ================================== Another method of adding record to db. ===========================================//

Cat.create({
    name:"Snow white",
    age:8,
    temprament:"Bland"
}, function(err,cat){
    if (err) {
        console.log("Cat not added to the DB");
    }else{
        console.log("Cat successfully added to the DB");
        console.log(cat);
    }
});


//======================================= Retriving all cats from DB ==================================================//


// It returns the array of cats.
Cat.find({}, function (err, cats) {
    if (err) {
        console.log("Can't retrieve cats : ( " +err);
    }else{
        cats.forEach(function(cat){
            console.log(cat);
        })
    }
})

// Returns the cat named Silly.
Cat.find({name:"Silly"}, function (err, cats) {
    if (err) {
        console.log("Can't retrieve cats : ( " +err);
    }else{
        cats.forEach(function(cat){
            console.log(cat);
        })
    }
})