const express = require('express');
const User = require('../models/user');
var bodyParser = require('body-parser');
const { route } = require('.');

const middleware = require('../middleware');

const router = express.Router();

router.use(bodyParser.json());

// Login form route for faculty
router.get('/login', (req, res, next) => {

    res.render('login', { actionURL: '/faculty/login' });
})


// Login Logic
router.post('/login', (req, res, next) => {

    // If user logs in for the first time
    if (!req.session.user) {

        // Checking for username and pass.

        User.findOne({ username: req.body.username, faculty: true })


        .then((user) => {


                console.log(user)
                console.log(req.body.username)
                console.log(req.body.password)
                if (user === null) {

                    // Means user is not registered!
                    req.flash("error", "You are not registered!");
                    res.redirect('/faculty/login');


                } else if (user.password != req.body.password) {

                    // Means user has entered wrong password!
                    req.flash("error", "Username and password do not match!");
                    res.redirect('/faculty/login');


                } else if (user.username === req.body.username && user.password === req.body.password) {

                    //===================================  SETTING UP SESSION ===========================================================//

                    // Here the user will reach only after successful authentication.
                    // So this is the best place we set up our session before going to next set of middleware.

                    req.session.user = 'authenticated';
                    req.session.faculty = true;
                    res.statusCode = 200;
                    req.flash("success", "Welcome " + user.name + "!");
                    res.redirect('/faculty/facultyHome')

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
        req.flash("success", "Successfully Logged In!");
        res.render('facultyHome')

    }
});


router.get('/signup', (req, res, next) => {
    res.render('signup', { actionURL: '/faculty/signup' });
})

// Register User
router.post('/signup', function(req, res, next) {

    // Make sure that faculty does not already exists!
    User.findOne({ username: req.body.username })
        .then((user) => {
            if (user != null) {
                err.status = 403 // forbidden
                req.flash("error", "Username" + req.body.username + " already exists!");
                res.redirect('/faculty/signup');
            } else {
                return User.create({ username: req.body.username, password: req.body.password, name: req.body.name, faculty: true });
                // it will return a promise so we have to handle that promise in then.
            }
        })
        // Resolving promise after registering user
        .then((user) => {
            res.statusCode = 200;
            req.flash("success", "Registered Successfully!");
            res.redirect('/faculty/facultyHome')
        })
        .catch((err) => {
            next(err);
        })
        // If there is some problem in checking the already existing user.
        .catch((err) => {
            next(err);
        })
});


// faculty home
router.get('/facultyHome', middleware.isFacultyLoggedIn, (req, res) => {
    res.render('faculty/facultyHome');
})


// logout
// Here we are using the 'get' as we do not need to submit any data.
router.get('/logout', (req, res) => {

    // Checking if session exists or not
    if (req.session) {

        // Here we are destroying session and Flash message depends on session. So here we get error that flas() requires session. But we ignore that. We can turn off flash message or try something similar like flash which do not depend on session.

        // Now removing the session info from server.
        req.session.destroy();

        // Also deleting cookie from client side
        // In app.js where we initialized our session, we gave name: 'session-id'. So we have to delete the cookie with name session-id
        res.clearCookie('session-id');

        // Redirecting user to home page

        res.redirect('/');

    } else {
        let err = new Error("You are not logged in");
        err.status = 403;
        next(err);
    }
})


module.exports = router