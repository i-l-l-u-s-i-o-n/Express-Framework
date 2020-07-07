// by Shivam Shukla

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dishRouter = require('./routes/dishRouter');
var promoRouter = require('./routes/promoRouter');
var leaderRouter = require('./routes/leaderRouter');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//=========================== BASIC AUTHENTICATION ===========================================================//


// We want to authenticate user before we allow the user to to fetch data from public directory.(as the middleware runs in the order they are declared)
// Here we are using the function auth as a middleware to authenticate the user. app.use() tells our server to use that middleware.
function auth(req, res, next) {

    // Just checking what is coming from the client in the header of request.
    console.log(req.headers);

    // The authorization code is {username:password} in Base64 encoded and is in the header. So let us extract that header.
    let authHeader = req.headers.authorization;

    if (!authHeader) {

        // If there is no authHeader, then it means that client has not provided the username and password in the request. So ask user to provide it.
        // Setting header of response to 'WWW-Authenticate', 'Basic' will make browser pop up the prompt to ask for username and password.

        let err = new Error("You are not authenticated!");

        // If a user is not authenticated, the server will respond with 401 status code and with 'WWW-Authenticate' 'Basic' header.
        res.setHeader('WWW-Authenticate', 'Basic');
        err.status = 401;

        // Now directly going to error handler defined at the bottom
        next(err);

    }

    // Else the user is authenticated
    // Now we have to separate the base64 string after 'Basic' from authHeader i.e 'Basic Qj5nh6y75df327yrb56c3r23r' 
    let auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':'); // using split(":") to separate username and pass from username:password


    let username = auth[0];
    let password = auth[1];

    console.log(username, " ", password)

    // Checking for username and pass.
    if (username === 'admin' && password === 'password') {
        next(); // Passing the req, res to next set of middleware.
    }
    // Username and pass do not match
    else {

        let err = new Error("Provide correct username and password!");
        res.setHeader('WWW-Authenticate', 'Basic');
        err.status = 401;

        next(err);
    }



}

// Using auth middleware
app.use(auth);


//=======================================================================================================//


app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dishes', dishRouter);
app.use('/promotions', promoRouter);
app.use('/leaders', leaderRouter);


const mongoose = require('mongoose');

// Including our model
const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';

// Creating connection object
const connect = mongoose.connect(url);

// connecting to db
connect.then((db) => {
    console.log("Connected to DB!");
}).catch((err) => {
    console.log("Error! : ", err);
});



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