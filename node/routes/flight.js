const express = require('express');
const router = express.Router();
const flight = require('../services/flight');

/* GET flight listing. */
router.get('/', function (req, res, next) {
    try {
        res.json(flight.getMultiple(req.query.page));
    } catch (err) {
        console.error(`Error while getting flight `, err.message);
        next(err);
    }
});

module.exports = router;
