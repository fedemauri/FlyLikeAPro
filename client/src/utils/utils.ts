export const getBestFlightsWithPrices = (
    flights: array<any>,
    departureAirport: string,
    arrivalAirport: string
): Flight[] => {
    const flightsWithPrices: Flight[] = [];
    const directFlights = flights.filter((flight) => {
        return (
            flight.code_departure === departureAirport &&
            flight.code_arrival === arrivalAirport
        );
    });

    if (directFlights.length > 0) {
        flightsWithPrices.push(...directFlights);
    }

    const departureFlights = flights.filter((flight) => {
        return flight.code_departure === departureAirport;
    });

    const arrivalFlights = flights.filter((flight) => {
        return flight.code_arrival === arrivalAirport;
    });

    departureFlights.forEach((departureFlight) => {
        arrivalFlights.forEach((arrivalFlight) => {
            if (departureFlight.code_arrival === arrivalFlight.code_departure) {
                const price = departureFlight.price + arrivalFlight.price;
                flightsWithPrices.push({
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

    return flightsWithPrices;
};
