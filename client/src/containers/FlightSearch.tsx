import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Flight } from '../components/Flight.tsx';
import AirportContext from './AirportContext.tsx';
import { SERVER_ADDR, getBestFlightsWithPrices } from '../utils/utils.ts';
import { Card, ListGroup, Tabs, Tab } from 'react-bootstrap';
import { log } from 'console';

type FlightSearchProps = {
    from: string;
    to: string;
    price: number;
};

export const FlightSearch = ({ from, to }: FlightSearchProps) => {
    const [flights, setFlights] = useState([]);
    const [filter, setFilter] = useState('all');
    const airportContext = useContext(AirportContext);

    console.log('filter', filter);

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

    const getBestDirectPrice = () => {
        return flights.reduce((prev, curr) => {
            if (!curr.code_layover)
                return prev.price < curr.price ? prev : curr;
            else return prev;
        });
    };

    const getBestPriceWithStop = () => {
        return flights.reduce((prev, curr) => {
            if (!!curr.code_layover)
                return prev.price < curr.price ? prev : curr;
            else return prev;
        });
    };

    const getBestPrice = () => {
        return flights.reduce((prev, curr) =>
            prev.price < curr.price ? prev : curr
        );
    };

    const getFilteredData = () => {
        switch (filter) {
            case 'all':
                return flights;
            case 'stop':
                return flights.filter((el) => !!el.code_layover);
            case 'direct':
                return flights.filter((el) => !el.code_layover);
            default:
                console.log(`Sorry, we are out of ${expr}.`);
        }
    };

    const handleSelect = (key) => {
        setFilter(key);
    };

    if (flights?.length)
        return (
            <Card className='flight-search'>
                {/* <Card.Img variant="top" />  */}
                <Card.Body>
                    <Card.Title>
                        <div className='header d-flex flex-row justify-content-around'>
                            <span>{`Best flights available (${flights.length})`}</span>
                            <div className='resume-prices'>
                                {/* <div className='direct'>
                                    {getBestDirectPrice().price}
                                </div>
                                <div className='with-stop'>
                                    {getBestPriceWithStop().price}
                                </div> */}
                                <Tabs
                                    defaultActiveKey='all'
                                    onSelect={handleSelect}
                                >
                                    <Tab eventKey='direct' title='Direct'>
                                        <div className='price direct text-center mt-2'>
                                            Best price:{' '}
                                            {getBestDirectPrice().price}€
                                        </div>
                                    </Tab>
                                    <Tab eventKey='all' title='All'>
                                        <div className='price all text-center mt-2'>
                                            Best price: {getBestPrice().price}€
                                        </div>
                                    </Tab>
                                    <Tab eventKey='stop' title='With Stop'>
                                        <div className='price with-stop text-center mt-2'>
                                            Best price:{' '}
                                            {getBestPriceWithStop().price}€
                                        </div>
                                    </Tab>
                                </Tabs>
                            </div>
                            <span>{`From: ${from.value} To: ${to.value}`}</span>
                        </div>
                    </Card.Title>
                </Card.Body>
                <ListGroup className='list-group-flush'>
                    {getFilteredData().map((el) => {
                        const {
                            code_departure,
                            code_arrival,
                            price,
                            code_layover,
                        } = el;
                        return (
                            <ListGroup.Item
                                key={code_departure + ' ' + code_arrival}
                            >
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
