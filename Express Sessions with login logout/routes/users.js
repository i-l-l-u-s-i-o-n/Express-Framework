var express = require('express');
const bodyParser = require('body-parser')
var User = require('../models/user');
const { route } = require('.');
var router = express.Router();

router.use(bodyParser.json());




// Register User
router.post('/signup', function(req, res, next) {

    // Make sure that user does not already exists!
    User.findOne({ username: req.body.username })
        .then((user) => {
            if (user != null) {
                var err = new Error("User " + req.body.username + " already exists!")
                err.status = 403 // forbidden
                next(err);
            } else {
                return User.create({ username: req.body.username, password: req.body.password });
                // it will return a promise so we have to handle that promise in then.
            }
        })
        // Resoving promise after registering user
        .then((user) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ status: "Registered Successfully!", user: user });
        })
        .catch((err) => {
            next(err);
        })
        // If there is some problemm in checking the already existing user.
        .catch((err) => {
            next(err);
        })
});


// Login User
router.post('/login', (req, res, next) => {

    // If user logs in for the first time
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

        User.findOne({ username: username })
            .then((user) => {

                if (user === null) {

                    // Means user is not registered!
                    let err = new Error("User doesn't exists!");
                    err.status = 403;
                    next(err);

                } else if (user.password != password) {

                    // Means user has entered wrong password!
                    let err = new Error("Password is incorrect");
                    err.status = 403;
                    next(err);

                } else if (user.username === username && user.password === password) {

                    //===================================  SETTING UP SESSION ===========================================================//

                    // Here the user will reach only after successful authentication.
                    // So this is the best place we set up our session before going to next set of middleware.

                    req.session.user = 'authenticated';
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'text/plain');
                    res.end('You are authenticated and successfully logged in!')

                    //===================================================================================================================//

                }
            })
            .catch((err) => {
                next(err);
            });
    }

    // If session has user property
    else {

        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('You are authenticated and successfully logged in!')

    }
})



// Logout User

// Here we are using the 'get' as we do not need to submit any data.
router.get('/logout', (req, res) => {

    // Checking if session exists or not
    if (req.session) {
        // Now removing the session info from server.
        req.session.destroy();

        // Also deleting cookie from client side
        // In app.js where we initialised our session, we gave name: 'session-id'. So we have to delete the cookie with name session-id
        res.clearCookie('session-id');

        // Redirecting user to home page
        res.redirect('/');

    } else {
        let err = new Error("You are not logged in");
        err.status = 403;
        next(err);
    }
})



/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;