var middleObjects = {};

middleObjects.isStudentLoggedIn = function auth(req, res, next) {


    // now checking for the particular property that we have set for the cookie if the user is authenticated(below in this part of code.).


    if (!req.session.user) {

        // This means the session doesn't has user field i.e. user is not authenticated.

        req.flash('error', "Better luck next time :)")
        res.redirect('/student/login');

    }

    // If signed cookie already exists in the request
    else {

        // checking for username 
        if (req.session.user === 'authenticated' && req.session.student === true) {

            // As the user matches, we allow to move to below middleware.
            next();

        }
        // Normally it doesn't happen as the cookie is set on the client side so it must include correct name but for sake of completeness we are doing else part
        else {

            let err = new Error("Better Luck next Time : )!");
            err.status = 401;
            next(err);


        }

    }

}


middleObjects.isFacultyLoggedIn = function auth(req, res, next) {


    // now checking for the particular property that we have set for the cookie if the user is authenticated(below in this part of code.).


    if (!req.session.user) {

        // This means the session doesn't has user field i.e. user is not authenticated.

        req.flash('error', "Better luck next time :)")
        res.redirect('/faculty/login');

    }

    // If signed cookie already exists in the request
    else {

        // checking for username 
        if (req.session.user === 'authenticated' && req.session.faculty === true) {

            // As the user matches, we allow to move to below middleware.
            next();

        }
        // Normally it doesn't happen as the cookie is set on the client side so it must include correct name but for sake of completeness we are doing else part
        else {

            let err = new Error("Better Luck next Time : )!");
            err.status = 401;
            next(err);


        }

    }

}


module.exports = middleObjects;