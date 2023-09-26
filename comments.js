// Create web server application
// ----------------------------

// Import express module
const express = require('express');

// Import body-parser module
const bodyParser = require('body-parser');

// Import mongoose module
const mongoose = require('mongoose');

// Import Comments model
const Comments = require('../models/comments');

// Create express router
const router = express.Router();

// Use body-parser module to parse request body
router.use(bodyParser.json());

// Define endpoints for all comments
router.route('/')
    // GET operation for all comments
    .get((req, res, next) => {
        Comments.find({})
            .populate('author')
            .then((comments) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(comments);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    // POST operation for all comments
    .post((req, res, next) => {
        Comments.create(req.body)
            .then((comment) => {
                console.log('Comment created ', comment);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(comment);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    // PUT operation for all comments
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /comments');
    })
    // DELETE operation for all comments
    .delete((req, res, next) => {
        Comments.remove({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

// Define endpoints for comments with commentId
router.route('/:commentId')
    // GET operation for comments with commentId
    .get((req, res, next) => {
        Comments.findById(req.params.commentId)
            .populate('author')
            .then((comment) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(comment);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    // POST operation for comments with commentId
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /comments/' + req.params.commentId);
    })
    // PUT operation for comments with commentId
    
