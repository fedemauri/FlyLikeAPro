type Flight = {
    first_fly_id?: string;
    second_fly_id?: string;
    code_departure: string;
    code_layover?: string;
    code_arrival: string;
    price: number;
};

export const getBestFlightsWithPrices = (
    flights: Array<any>,
    departureAirport: string,
    arrivalAirport: string
): Flight[] => {
    const flightsWithPrices: Flight[] = [];
    const directFlights: Flight[] = flights.filter((flight) => {
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

    const connectionFlights: Flight[] = [];
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

    connectionFlights.sort((a, b) => a.price - b.price);

    return [...directFlights, ...connectionFlights];
};

export const SERVER_ADDR = 'http://localhost:3003';

export const getAirportFromCode = (airports, code) => {
    return airports.find((el) => el.code === code);
};

export const getCoordinateObj = (coordinate) => {
    const formattedCoordinate = coordinate.replace(/\s+/g, '');
    const splitted = formattedCoordinate.split(',');

    return {
        lat: parseFloat(splitted[0]),
        lng: parseFloat(splitted[1]),
    };
};
