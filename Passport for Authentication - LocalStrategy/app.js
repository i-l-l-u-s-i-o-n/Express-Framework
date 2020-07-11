// by Shivam Shukla

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Requiring Express Session
var session = require('express-session');
var FileStore = require('session-file-store')(session); // To store the session info in the file at server.
var passport = require('passport');
var authenticate = require('./authenticate');

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


app.use(passport.initialize());
app.use(passport.session());



app.use('/', indexRouter);
app.use('/users', usersRouter);

//=========================== Checking if user is logged in ===========================================================//

function auth(req, res, next) {

    // Since using passport will add the username to req.user, we can use this to authenticate.
    if (!req.user) {

        // This means the session doesn't has user field i.e. user is not authenticated.
        let err = new Error("You are not authenticated!");
        err.status = 401;
        next(err);

    }

    // If signed cookie already exists in the request
    else {
        next();
    }
}

// Using auth middleware
app.use(auth);


// In this way we can set up cookies and user need not to login again and again. Only the 1st time user need to login and the that username will be stored 
// in the browse cache as cookie.

// we can also set the time for cookie to expire i.e after sometime cookie will automatically deleted and user need to login.


//=======================================================================================================================================//





app.use(express.static(path.join(__dirname, 'public')));

app.use('/dishes', dishRouter);
app.use('/promotions', promoRouter);
app.use('/leaders', leaderRouter);


const mongoose = require('mongoose');

// Including our model
const Dishes = require('./models/dishes');

// const url = 'mongodb://localhost:27017/conFusion';

const url = "mongodb+srv://predator:predator22@cluster0.sjmgv.mongodb.net/conFusion?retryWrites=true&w=majority"

// Creating connection object
const connect = mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.connect("mongodb+srv://predator:predator22@cluster0.sjmgv.mongodb.net/conFusion?retryWrites=true&w=majority");
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