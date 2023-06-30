const express = require('express');
const router = express.Router();
const flightConnection = require('../services/flight-connection');

/* GET flight connections */
router.get('/', function (req, res, next) {
    try {
        res.json(flightConnection.getMultiple(req.query.from, req.query.to));
    } catch (err) {
        console.error(`Error while getting flight connections `, err.message);
        next(err);
    }
});

module.exports = router;
