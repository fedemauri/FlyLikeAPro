const db = require('../services/db');
const config = require('../config');

function getMultiple(from, to) {
    console.log(from, to);
    const data = db.query(
        `SELECT * FROM flights WHERE code_departure = ? OR code_arrival = ?`,
        [from, to]
    );

    const connectionFlights = getBestFlightsWithPrices(data, from, to);

    return {
        connectionFlights,
    };
}

/**
 * Return list of flight connection between two airports
 * @param {*} flights
 * @param {*} departureAirport
 * @param {*} arrivalAirport
 */
function getBestFlightsWithPrices(flights, departureAirport, arrivalAirport) {
    const flightsWithPrices = [];
    const directFlights = flights.filter((flight) => {
        return (
            flight.code_departure === departureAirport &&
            flight.code_arrival === arrivalAirport
        );
    });

    if (directFlights.length > 0) {
        directFlights.sort((a, b) => a.price - b.price);
        flightsWithPrices.push(...directFlights);
    }

    const departureFlights = flights.filter((flight) => {
        return flight.code_departure === departureAirport;
    });

    const arrivalFlights = flights.filter((flight) => {
        return flight.code_arrival === arrivalAirport;
    });

    const connectionFlights = [];
    departureFlights.forEach((departureFlight) => {
        arrivalFlights.forEach((arrivalFlight) => {
            if (departureFlight.code_arrival === arrivalFlight.code_departure) {
                const price = departureFlight.price + arrivalFlight.price;
                connectionFlights.push({
                    first_fly_id: departureFlight.id,
                    second_fly_id: arrivalFlight.id,
                    code_departure: departureFlight.code_departure,
                    code_layover: departureFlight.code_arrival,
                    code_arrival: arrivalFlight.code_arrival,
                    price: price,
                });
            }
        });
    });
    connectionFlights.sort((a, b) => a.price - b.price);

    return [...directFlights, ...connectionFlights];
}

module.exports = {
    getMultiple,
    getBestFlightsWithPrices,
};
