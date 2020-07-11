var passport = require('passport');
var LocalStrategy = require('passport-local');
var passportLocalMongoose = require('passport-local-mongoose');

const User = require('./models/user');

exports.local = passport.use(new LocalStrategy(User.authenticate()));

// User.authenticate() will add the username to req.user if user is authenticated.

// here we used .authenticate() from User as we used PassportLocalMongoose in the user schema as plugin.
// This .authenticate() will directly fetch the username and password from the body and match it to DB data to authenticate user.
// If we do not use PassportLocalMongoose, we have to write our own strategy, i.e fetch username and pass and then match it in DB and return true if authenticated.


// If we use also use session in passport then we need to serialize and deserialize the session information of that user.
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());