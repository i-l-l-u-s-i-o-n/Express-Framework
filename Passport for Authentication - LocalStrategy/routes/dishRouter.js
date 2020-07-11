// by Shivam Shukla

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Including dish model to perform db operation on dishes collection.
const Dishes = require('../models/dishes');

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());


dishRouter.route('/')
    .get((req, res, next) => {

        Dishes.find({})
            .then((dishes) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                // Sending dishes back as res body.
                res.json(dishes);
            }, (err) => next(err)) // We can handle error this way or using catch. Here we simply passing the error to our error handler.
            .catch((err) => next(err));
    })
    .post((req, res, next) => {

        Dishes.create(req.body) // We are passing req.body as this is the post req, and data is contained in req.body.
            .then((dish) => {
                console.log("Dish Created : \n", dish);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);
            })
            .catch((err) => next(err));

    })
    .put((req, res, next) => {

        res.statusCode = 403 // forbidden
        res.end("PUT is not supported for /dishes. You must provide the dishID to update the particular dish")

    })
    .delete((req, res, next) => {

        Dishes.remove({})
            .then((response) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(response);
            })
            .catch((err) => next(err));
    });



dishRouter.route('/:dishID')
    .get((req, res, next) => {

        // Finding dish by Dish ID.
        Dishes.findById(req.params.dishID)
            .then((dish) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);
            })
            .catch((err) => next(err));

    }).post((req, res, next) => {

        res.statusCode = 403 // forbidden
        res.end("POST is not supported for /dishes/:dishID.")

    }).put((req, res, next) => {

        // Updating a particular dish with given dish ID.
        Dishes.findByIdAndUpdate(req.params.dishID, { $set: req.body }, { new: true })
            .then((dish) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);
            })
            .catch((err) => next(err));

    }).delete((req, res, next) => {

        Dishes.findByIdAndRemove(req.params.dishID)
            .then((dish) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);
            })
            .catch((err) => next(err));
    });


// Creating routes for the comments inside particular dish!!!!!


dishRouter.route('/:dishID/comments')
    .get((req, res, next) => {

        Dishes.findById(req.params.dishID)
            .then((dish) => {

                if (dish != null) {

                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');

                    // Returning all the comments for dish
                    res.json(dish.comments);

                } else {

                    // Creating a new Error
                    err = new Error('Dish' + req.params.dishID + " not found!");
                    err.status = 404; // not found 

                    // Now going to the error handler and it will take us to the app.js where the error handler is pre defined by the express generator.
                    return next(err);

                }
            }, (err) => next(err)) // We can handle error this way or using catch. Here we simply passing the error to our error handler.
            .catch((err) => next(err));
    })
    .post((req, res, next) => {

        // For a particular dish, we have to add a new comment.
        Dishes.findById(req.params.dishID) // We are passing req.body as this is the post req, and data is contained in req.body.
            .then((dish) => {


                if (dish != null) {

                    // Adding comment to dish
                    dish.comments.push(req.body);
                    dish.save()
                        .then((dish) => {

                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(dish);

                        })
                        .catch((err) => next(err));

                } else {

                    // Creating a new Error
                    err = new Error('Dish' + req.params.dishID + " not found!");
                    err.status = 404; // not found 

                    // Now going to the error handler and it will take us to the app.js where the error handler is pre defined by the express generator.
                    return next(err);

                }
            })
            .catch((err) => next(err));

    })
    .put((req, res, next) => {

        res.statusCode = 403 // forbidden
        res.end("PUT is not supported for /dishes/" + req.params.dishID + "/comments. You must provide the commentID to update the particular comment for dish")

    })
    .delete((req, res, next) => {

        // Deleting all the comments for the dish.
        Dishes.findById(req.params.dishID)
            .then((dish) => {
                if (dish != null) {

                    // Deleting all the comments.
                    for (let i = (dish.comments.length - 1); i >= 0; i--) {
                        // Removing comment using it;s id.
                        dish.comments.id(dish.comments[i]._id).remove();
                    }

                    // Now saving the changes.
                    dish.save()
                        .then((dish) => {

                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(dish);

                        })
                        .catch((err) => next(err));

                } else {

                    // Creating a new Error
                    err = new Error('Dish' + req.params.dishID + " not found!");
                    err.status = 404; // not found 

                    // Now going to the error handler and it will take us to the app.js where the error handler is pre defined by the express generator.
                    return next(err);

                }
            })
            .catch((err) => next(err));
    });



dishRouter.route('/:dishID/comments/:commentID')
    .get((req, res, next) => {

        // Finding dish by Dish ID.
        Dishes.findById(req.params.dishID)
            .then((dish) => {
                if (dish != null && dish.comments.id(req.params.commentID)) {

                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');

                    // Returning comment 
                    res.json(dish.comments.id(req.params.commentID));

                } else if (dish == null) {

                    err = new Error('Dish' + req.params.dishID + " not found!");
                    err.status = 404; // not found 
                    return next(err);

                } else {

                    err = new Error('Comment' + req.params.commentID + " not found!");
                    err.status = 404; // not found 
                    return next(err);

                }
            })
            .catch((err) => next(err));

    })
    .post((req, res, next) => {

        res.statusCode = 403 // forbidden
        res.end("POST is not supported for /dishes/" + req.params.dishID + "/comments/" + req.params.commentID);

    })
    .put((req, res, next) => {

        Dishes.findById(req.params.dishID)
            .then((dish) => {
                if (dish != null && dish.comments.id(req.params.commentID)) {

                    // We should not allow user to update the author. USer can only change the rating and the comment itself.

                    // Allowing to update the rating
                    if (req.body.rating) {
                        dish.comments.id(req.params.commentID).rating = req.body.rating;
                    }

                    // Allowing to update the comment
                    if (req.body.comment) {
                        dish.comments.id(req.params.commentID).comment = req.body.comment;
                    }

                    dish.save()
                        .then((dish) => {

                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(dish);

                        })
                        .catch((err) => next(err));

                } else if (dish == null) {

                    err = new Error('Dish' + req.params.dishID + " not found!");
                    err.status = 404; // not found 
                    return next(err);

                } else {

                    err = new Error('Comment' + req.params.commentID + " not found!");
                    err.status = 404; // not found 
                    return next(err);

                }
            })

        .catch((err) => next(err));

    })
    .delete((req, res, next) => {

        // Deleting specific comments for the dish.
        Dishes.findById(req.params.dishID)
            .then((dish) => {
                if (dish != null && dish.comments.id(req.params.commentID)) {

                    // Deleting comment using commentID
                    dish.comments.id(req.params.commentID).remove();

                    // Now saving the changes.
                    dish.save()
                        .then((dish) => {

                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(dish);

                        })
                        .catch((err) => next(err));

                } else if (dish == null) {

                    err = new Error('Dish' + req.params.dishID + " not found!");
                    err.status = 404; // not found 
                    return next(err);

                } else {

                    err = new Error('Comment' + req.params.commentID + " not found!");
                    err.status = 404; // not found 
                    return next(err);

                }
            })
            .catch((err) => next(err));
    });



module.exports = dishRouter;