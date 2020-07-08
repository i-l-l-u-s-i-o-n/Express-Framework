// by Shivam Shukla

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Requiring Express Session
var session = require('express-session');
var FileStore = require('session-file-store')(session); // To store the session info in the file at server.


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

// app.use(cookieParser('12312-23123-12321-23112'));
// Instead of cookie parser, we are going to use the sessions.
app.use(session({
    name: 'session-id',
    secret: '12312-23123-12321-23112',
    saveUninitialized: false,
    resave: false,
    store: new FileStore() // This will create a folder 'sessions' and inside it, a file is created which contains the session information.
}))



//=========================== Managing SESSIONS ===========================================================//


// We want to authenticate user before we allow the user to to fetch data from public directory.(as the middleware runs in the order they are declared)
// Here we are using the function auth as a middleware to authenticate the user. app.use() tells our server to use that middleware.
function auth(req, res, next) {

    // Just checking what info is coming from the client as session data.
    console.log(req.session);


    // now checking for the particular property that we have set for the cookie if the user is authenticated(below in this part of code.).
    if (!req.session.user) {

        // This means the session doesn't has user field i.e. user is not authenticated.

        // So now we will look for the authorization header (Basic authentication steps)

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
        let auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':'); // using split(":") to separate username and pass from username:password


        let username = auth[0];
        let password = auth[1];

        console.log(username, " ", password)

        // Checking for username and pass.
        if (username === 'admin' && password === 'password') {

            //===================================  SETTING UP SESSION ===========================================================//

            // Here the user will reach only after successful authentication.
            // So this is the best place we set up our session before going to next set of middleware.

            req.session.user = 'admin';

            next(); // Passing the req, res to next set of middleware.

            //===================================================================================================================//

        }
        // Username and pass do not match
        else {

            let err = new Error("Provide correct username and password!");
            res.setHeader('WWW-Authenticate', 'Basic');
            err.status = 401;

            next(err);
        }
    }

    // If signed cookie already exists in the request
    else {

        // checking for username 
        if (req.session.user === 'admin') {

            // As the user matches, we allow to move to below middleware.
            next();

        }
        // Normally it doesn't happen as the cookie is set on the client side so it must include correct name but for sake of completeness we are doing else part
        else {

            let err = new Error("You are not authenticated!");

            // But here we are not going to prompt the user for username and password as it had been done earlier.
            // res.setHeader('WWW-Authenticate', 'Basic');
            err.status = 401;

            next(err);

        }

    }




}

// Using auth middleware
app.use(auth);


// In this way we can set up cookies and user need not to login again and again. Only the 1st time user need to login and the that username will be stored 
// in the browse cache as cookie.

// we can also set the time for cookie to expire i.e after sometime cookie will automatically deleted and user need to login.


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