var middleObjects = {};

middleObjects.isStudentLoggedIn = function auth(req, res, next) {

    // Since using passport will add the all the fields of user schema except password to req.user, we can use this to authenticate.
    if (req.user && req.user.student === true) {
        next();
    }

    // If no property in req.user, the user is not authenticated
    else {

        // This means the session doesn't has user field i.e. user is not authenticated.
        // let err = new Error("You are not authenticated!");
        // err.status = 401;
        // next(err);

        req.flash("error", "Better Luck next Time :) ");
        res.status = 401;
        res.redirect('/student/login');
    }
}


middleObjects.isFacultyLoggedIn = function auth(req, res, next) {

    // Since using passport will add the all the fields of user schema except password to req.user, we can use this to authenticate.
    if (req.user && req.user.faculty === true) {
        next();
    }

    // If no property in req.user, the user is not authenticated
    else {

        // This means the session doesn't has user field i.e. user is not authenticated.
        // let err = new Error("Better Luck next Time!");
        // err.status = 401;
        // next(err);

        req.flash("error", "Better Luck next Time :) ");
        res.status = 401;
        res.redirect('/faculty/login');
    }
}



module.exports = middleObjects;