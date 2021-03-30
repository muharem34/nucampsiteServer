const express = require('express');
const Favorite = require('../models/favorite');
const authenticate = require('../authenticate');
const cors = require('./cors');

const favoriteRouter = express.Router();
//.get part in /favorites task 2 week 4 asssignment
favoriteRouter.route('/')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, authenticate.verifyUser, (req, res, next) => {
    Favorite.find({user:req.user._id})
    .populate('user.ref')
    .populate('campsite.ref')
    .then(favorite => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(favorite);
    })
    .catch(err => next(err));
})

// POST section in task 2 workshop assignment week 4
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorite.findOne({user:req.user._id})
    //Favorite.create(req.body)
    .then(favorite => {
        if (favorite) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(campsite);
        } else {
            Favorite.create(req.body)
            .then(favorite => {
                console.log('Favorite Created ', favorite);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorite);
            })
        }
    })
    .catch(err => next(err));
}) 
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /favorites');
})

//complete i think .delete for /favorites in task 2
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorite.findOneAndDelete({user:req.user._id})
    .then(favorite => {
        if(favorite) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(response);
        } else {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.json(response);
        }
    })
    .catch(err => next(err));
});
 //stopped here task 2
favoriteRouter.route('/:campsiteId')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /campsites');
})

//confused here
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
    Favorite.findOne({user: req.user._Id})
    .then(favorite => {


    })  
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /favorites');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorite.findOne(req.user._id)
    .then(favorite => {
        if(favorite) {
            Favorite.findOneAndDelete(req.params.campsiteId)
            .then(favorite  => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorite);
            })
        } else {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.json(response);
        }
    })
    .catch(err => next(err));
});

module.exports = favoriteRouter;