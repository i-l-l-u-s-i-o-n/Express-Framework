const express = require('express');
const User = require('../models/user');
var bodyParser = require('body-parser');
const passport = require('passport');

const middleware = require('../middleware');

const router = express.Router();

router.use(bodyParser.json());

// Login form route for student
router.get('/login', (req, res, next) => {
    res.render('login', { actionURL: '/student/login' });
})


// Login Logic
router.post('/login', passport.authenticate("local", {

    successRedirect: "/student/studentHome",
    failureRedirect: "/student/login",
    successFlash: "Successfully Logged In!",
    failureFlash: true

}), function(req, res) {

    req.flash("success", "Successfully Logged In!");

});



// Signup form
router.get('/signup', (req, res, next) => {
    res.render('signup', { actionURL: '/student/signup' });
})

// Register User
router.post('/signup', function(req, res, next) {

    // Make sure that student does not already exists!
    User.findOne({ username: req.body.username })
        .then((user) => {

            // If a user exists
            if (user != null) {

                res.status = 403 // forbidden
                req.flash("error", "Username" + req.body.username + " already exists!");
                res.redirect('/student/signup');

            } else {

                // Create a new user
                User.register(new User({ username: req.body.username, student: true, name: req.body.name }), req.body.password, (err, user) => {

                    if (err) {

                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json({ err: err });

                    } else {

                        // Instead of redirecting to login page again, we directly authenticate and redirect to homepage
                        passport.authenticate('local')(req, res, () => {
                            res.statusCode = 200;
                            req.session.user = 'authenticated';
                            req.session.student = true;
                            req.flash("Successfully registered!");
                            res.redirect('/student/studentHome');
                        });

                    }
                });
            }
        });
});





// student home
router.get('/studentHome', middleware.isStudentLoggedIn, (req, res) => {
    res.render("student/studentHome");
})


// Logout route 
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Successfully Logged Out !")
    res.redirect("/");
})

module.exports = router