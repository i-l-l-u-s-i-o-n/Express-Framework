// ==================== By SHIVAM SHUKLA ==================================================== //


var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var flash = require('connect-flash');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var passportLocalMongoose = require('passport-local-mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var studentRouter = require('./routes/student');
var facultyRouter = require('./routes/faculty');



// Importing User schema to set up passport
const User = require('./models/user');



// Requiring Express Session
var session = require('express-session');
var FileStore = require('session-file-store')(session); // To store the session info in the file at server.


// =====================================  Setting up database  =================================================//

const url = "mongodb+srv://predator:predator22@cluster0.sjmgv.mongodb.net/conFusion?retryWrites=true&w=majority";
const connect = mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

connect.then((db) => {
        console.log("Connected to Database !");
    })
    .catch((err) => {
        console.log("Something went wrong while connecting to Database :", err);
    })

// ============================================================================================================//


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Telling node to use session
app.use(session({
    name: 'session-id',
    secret: '12312-23123-12321-23112',
    saveUninitialized: true,
    resave: true,
    store: new FileStore() // This will create a folder 'sessions' and inside it, a file is created which contains the session information.
}))




// ================================================ Setting up Passport start  =============================================================//

// Initializing passport
app.use(passport.initialize());
app.use(passport.session());



passport.use(new LocalStrategy(User.authenticate()));

// User.authenticate() will add the all the fields except password to req.user if user is authenticated.

// Here we used .authenticate() from User as we used PassportLocalMongoose in the user schema as plugin.
// This .authenticate() will directly fetch the username and password from the body and match it to DB data to authenticate user.
// If we do not use PassportLocalMongoose, we have to write our own strategy, i.e fetch username and pass and then match it in DB and return true if authenticated.


// If we use also use session in passport then we need to serialize and deserialize the session information of that user.
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// ================================================ Setting up Passport ends =============================================================//





app.use(bodyParser.json());
app.use(flash());

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next(); // Next specifies to continue execution which is mostly route handling(the callbacks).
})


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/student', studentRouter);
app.use('/faculty', facultyRouter);

app.use(express.static(path.join(__dirname, 'public')));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;