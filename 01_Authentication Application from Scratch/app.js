var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var flash = require('connect-flash');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var studentRouter = require('./routes/student');



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
    saveUninitialized: false,
    resave: false,
    store: new FileStore() // This will create a folder 'sessions' and inside it, a file is created which contains the session information.
}))


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




//=========================== User Authentication ===========================================================//


// We want to authenticate user before we allow the user to to fetch data from public directory.(as the middleware runs in the order they are declared)
function auth(req, res, next) {


    // now checking for the particular property that we have set for the cookie if the user is authenticated(below in this part of code.).
    if (!req.session.user) {

        // This means the session doesn't has user field i.e. user is not authenticated.

        let err = new Error("You are not authenticated!");
        err.status = 401;
        next(err);

    }

    // If signed cookie already exists in the request
    else {

        // checking for username 
        if (req.session.user === 'authenticated') {

            // As the user matches, we allow to move to below middleware.
            next();

        }
        // Normally it doesn't happen as the cookie is set on the client side so it must include correct name but for sake of completeness we are doing else part
        else {

            let err = new Error("You are not authenticated!");
            err.status = 401;
            next(err);

        }

    }
}

// Using auth middleware
// Here we are using the function auth as a middleware to authenticate the user. app.use() tells our server to use that middleware.
app.use(auth);




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