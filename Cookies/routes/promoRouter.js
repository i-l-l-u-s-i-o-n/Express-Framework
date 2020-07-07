const express = require('express');
const bodyParser = require('body-parser');

const Promotions = require('../models/promotions');


const promoRouter = express.Router();

promoRouter.use(bodyParser.json())

promoRouter.route('/')
    .get((req, res, next) => {

        Promotions.find({})
            .then((promos) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promos);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {

        Promotions.create(req.body)
            .then((promo) => {
                console.log("Promotion Created : \n", promo);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promo);
            })
            .catch((err) => next(err));

    })
    .put((req, res, next) => {

        res.statusCode = 403 // forbidden
        res.end("PUT is not supported for /promos.");

    })
    .delete((req, res, next) => {

        Promotions.remove({})
            .then((response) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(response);
            })
            .catch((err) => next(err));
    });



promoRouter.route('/:promoID')
    .get((req, res, next) => {

        Promotions.findById(req.params.promoID)
            .then((promo) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promo);
            })
            .catch((err) => next(err));

    }).post((req, res, next) => {

        res.statusCode = 403 // forbidden
        res.end("POST is not supported for /promotions/:promoID.")

    }).put((req, res, next) => {

        Promotions.findByIdAndUpdate(req.params.promoID, { $set: req.body }, { new: true })
            .then((promo) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promo);
            })
            .catch((err) => next(err));

    }).delete((req, res, next) => {

        Promotions.findByIdAndRemove(req.params.promoID)
            .then((promo) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promo);
            })
            .catch((err) => next(err));
    });



module.exports = promoRouter