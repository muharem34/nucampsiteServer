const express = require('express');
const promotionRouter = express.Router();

promotionRouter.route('/')

.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end('Will send all the promotions to you');
})
.post((req, res) => {
    res.end(`Will add the promotions: ${req.body.name} with description: ${req.body.description}`);
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions');
})
.delete((req, res) => {
    res.end('Deleting all promotions');
});

// this is workshop task 1

promotionRouter.route('/:promotionId')

.all((req, res, next)=> {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end(`Will send details of the promotions: ${req.params.promotionId} to you`);
})
.post((req, res) => {
    // res.statusCode = 403;
    res.write(`Updating the promotions: ${req.params.promotionId}\n`);
    res.end(`Will update the promotions: ${req.body.name}
        with description: ${req.body.description}`);})
.put((req, res) => {
    res.write(`Updating the promotions: ${req.params.promotioinId}\n`);
    res.end(`Will update the promotions: ${req.body.name}
        with description: ${req.body.description}`);

})
.delete((req, res) => {
    res.end(`Deleting promotions: ${req.params.promotionId}`);
});

module.exports = promotionRouter;