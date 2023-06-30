const express = require('express');
const router = express.Router();
const airport = require('../services/airport');

/* GET airport listing. */
router.get('/', function (req, res, next) {
    try {
        res.json(airport.getMultiple());
    } catch (err) {
        console.error(`Error while getting airport `, err.message);
        next(err);
    }
});

module.exports = router;
