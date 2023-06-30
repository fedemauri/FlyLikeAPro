const db = require('../services/db');
const config = require('../config');

function getMultiple() {
    const data = db.query(`SELECT * FROM airports`, []);

    return {
        data,
    };
}

module.exports = {
    getMultiple,
};
