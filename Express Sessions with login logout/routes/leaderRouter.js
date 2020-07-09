const express = require('express');
const bodyParser = require('body-parser');

const Leaders = require('../models/leaders');
const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());


leaderRouter.route('/')
    .get((req, res, next) => {

        Leaders.find({})
            .then((leaders) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leaders);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {

        Leaders.create(req.body)
            .then((leader) => {
                console.log("Leader Created : \n", leader);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leader);
            })
            .catch((err) => next(err));

    })
    .put((req, res, next) => {

        res.statusCode = 403 // forbidden
        res.end("PUT is not supported for /leaders.");

    })
    .delete((req, res, next) => {

        Leaders.remove({})
            .then((response) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(response);
            })
            .catch((err) => next(err));
    });




leaderRouter.route('/:leaderID')
    .get((req, res, next) => {

        Leaders.findById(req.params.leaderID)
            .then((leader) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leader);
            })
            .catch((err) => next(err));

    }).post((req, res, next) => {

        res.statusCode = 403 // forbidden
        res.end("POST is not supported for /leaders/:leaderID.")

    }).put((req, res, next) => {

        Leaders.findByIdAndUpdate(req.params.leaderID, { $set: req.body }, { new: true })
            .then((leader) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leader);
            })
            .catch((err) => next(err));

    }).delete((req, res, next) => {

        Leaders.findByIdAndRemove(req.params.leaderID)
            .then((leader) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leader);
            })
            .catch((err) => next(err));
    });


module.exports = leaderRouter;