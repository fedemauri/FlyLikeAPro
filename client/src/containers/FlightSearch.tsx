import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, ListGroup, Tabs, Tab } from 'react-bootstrap';
import { SelectionData } from '../App';
import { SERVER_ADDR } from './../utils/utils.ts';
import { Flight as FlightComponent } from '../components/Flight.tsx';

type FlightSearchProps = {
    from: SelectionData | null;
    to: SelectionData | null;
};

type Flight = {
    id: number;
    code_departure: string;
    code_arrival: string;
    price: number;
    code_layover?: string;
    first_fly_id?: string;
    second_fly_id?: string;
};

export const FlightSearch: React.FC<FlightSearchProps> = ({
    from,
    to,
}: FlightSearchProps) => {
    const [flights, setFlights] = useState<Flight[]>([]);
    const [filter, setFilter] = useState<string>('all');

    useEffect(() => {
        if (from?.value && to?.value) fetchData(from?.value, to?.value);
    }, [from, to]);

    const fetchData = async (from: string, to: string) => {
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
                console.log(`Filter not available`);
                return [];
        }
    };

    const handleSelect = (key: string) => {
        setFilter(key);
    };

    if (flights?.length) {
        return (
            <Card className='flight-search'>
                {/* <Card.Img variant="top" />  */}
                <Card.Body>
                    <Card.Title>
                        <div className='header d-flex flex-row justify-content-around'>
                            <span className='header-info'>{`Best flights available (${flights.length})`}</span>
                            <div className='resume-prices'>
                                <Tabs
                                    defaultActiveKey='all'
                                    // @ts-ignore
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
                            <span className='header-info'>{`From: ${from?.value} To: ${to?.value}`}</span>
                        </div>
                    </Card.Title>
                </Card.Body>
                <ListGroup className='list-group-flush'>
                    {getFilteredData().map((el) => {
                        const {
                            code_departure,
                            code_arrival,
                            price,
                            code_layover = null,
                        } = el;

                        return (
                            <ListGroup.Item
                                key={
                                    el.id ??
                                    el.first_fly_id + ' ' + el.second_fly_id
                                }
                            >
                                <FlightComponent
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
    }

    return null;
};
