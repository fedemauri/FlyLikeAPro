import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Flight } from '../components/Flight.tsx';
import AirportContext from './AirportContext.tsx';
import { SERVER_ADDR, getBestFlightsWithPrices } from '../utils/utils.ts';

type FlightSearchProps = {
    from: string;
    to: string;
    price: number;
};

export const FlightSearch = ({ from, to }: FlightSearchProps) => {
    const [flights, setFlights] = useState([]);
    const airportContext = useContext(AirportContext);

    console.log('from, to', from, to);
    useEffect(() => {
        let bestFlights = null;
        if (from?.value && to?.value) fetchData(from?.value, to?.value);
    }, [from, to]);

    const fetchData = async (from, to) => {
        try {
            const response = await axios.get(
                `${SERVER_ADDR}/flight-connection?from=${from}&to=${to}`
            );
            console.log(response.data);
            if (response?.data?.connectionFlights)
                setFlights(response.data.connectionFlights);
        } catch (error) {
            console.error(error);
        }
    };

    if (flights)
        return flights.map((el) => {
            const { code_departure, code_arrival, price, code_layover } = el;
            return (
                <>
                    <Flight
                        from={code_departure}
                        to={code_arrival}
                        price={price}
                        layover={code_layover}
                    />
                    <br />
                </>
            );
        });

    return null;
};
