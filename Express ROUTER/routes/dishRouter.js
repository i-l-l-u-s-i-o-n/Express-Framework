const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

// Here we do not require to type /dishes again and again. We can simply create a router endpoint in app.js and use that.

dishRouter.route('/')
    .all((req, res, next) => {

        // Modifying the res object.
        res.statusCode = 202;
        res.setHeader('Content-Type', 'text/plain')

        // Sending these changes to the res object to all the routes below for /dishes.
        next()
    })
    .get((req, res) => {
        // res.status code is 202 as we modified in above middleware and called next to propagate those changes to route that starts with /dishes.
        res.end("Here is the list of all the dishes.")
    })
    .post((req, res) => {
        // res.status code is 202 as we modified in above middleware and called next to propagate those changes to route that starts with /dishes.

        // When we submit the post data, the body-parser will parse that data and add it to the body property of req object.
        // So we can access the post data using 'req.body'
        res.end("Will add the dish to the database: " + req.body.name + " with description : " + req.body.desc)
    })
    .put((req, res) => {
        res.statusCode = 403 // forbidden
        res.end("PUT is not supported for /dishes. You must provide the dishID to update the particular dish")
    })
    .delete((req, res) => {
        // res.status code is 202 as we modified in above middleware and called next to propagate those changes to route that starts with /dishes.
        res.end("Deleting all the dishes.")
    });



dishRouter.route('/:dishID')
    .all((req, res, next) => {

        // Modifying the res object.
        res.statusCode = 202;
        res.setHeader('Content-Type', 'text/plain')

        // Sending these changes to the res object to all the routes below for /dishes.
        next()
    })
    .get((req, res) => {
        // res.status code is 202 as we modified in above middleware and called next to propagate those changes to route that starts with /dishes.
        res.end("Here is the list of dish: " + req.params.dishID)
    }).post((req, res) => {
        // res.status code is 202 as we modified in above middleware and called next to propagate those changes to route that starts with /dishes.

        // When we submit the post data, the body-parser will parse that data and add it to the body property of req object.
        // So we can access the post data using 'req.body'
        res.statusCode = 403 // forbidden
        res.end("POST is not supported for /dishes/:dishID.")

    }).put((req, res) => {
        res.write("Updating dish ID : " + req.params.dishID + "\n")
        res.end("Will update dish name : " + req.body.name + " with description : " + req.body.desc)
    }).delete((req, res) => {
        // res.status code is 202 as we modified in above middleware and called next to propagate those changes to route that starts with /dishes.
        res.end("Deleting dish ID : " + req.params.dishID)
    });



module.exports = dishRouter;