import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Flight } from '../components/Flight.tsx';
import AirportContext from './AirportContext.tsx';
import { SERVER_ADDR, getBestFlightsWithPrices } from '../utils/utils.ts';
import { Card, ListGroup } from 'react-bootstrap';

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
        return (
            <Card>
                {/* <Card.Img variant="top" />  */}
                <Card.Body>
                    <Card.Title>{`Best flights available (${flights.length})`}</Card.Title>
                </Card.Body>
                <ListGroup className='list-group-flush overflow-auto h-50'>
                    {flights.map((el) => {
                        const {
                            code_departure,
                            code_arrival,
                            price,
                            code_layover,
                        } = el;
                        return (
                            <ListGroup.Item>
                                <Flight
                                    from={code_departure}
                                    to={code_arrival}
                                    price={price}
                                    layover={code_layover}
                                />
                            </ListGroup.Item>
                        );
                    })}
                </ListGroup>
            </Card>
        );
    return null;
};
