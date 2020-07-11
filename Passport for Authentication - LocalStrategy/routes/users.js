var express = require('express');
const bodyParser = require('body-parser')
var User = require('../models/user');
var passport = require('passport');


var router = express.Router();

router.use(bodyParser.json());




// Register User 
router.post('/signup', function(req, res, next) {

    // Storing the username and password(in hashed format)
    User.register(new User({ username: req.body.username }), req.body.password, (err, user) => {
        if (err) {

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ err: err });

        } else {
            passport.authenticate('local')(req, res, () => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({ success: true, status: "Registered Successfully!" });
            });

        }
    });
});


// Login User
router.post('/login', passport.authenticate('local'), (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({ success: true, status: "LoggedIn Successfully!" });

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