import { useEffect, useState, useContext } from 'react';
import { getAirportFromCode } from '../utils/utils.ts';
import AirportContext from '../containers/AirportContext.tsx';
import { Spinner, Accordion } from 'react-bootstrap';
import logo from './../img/fly.png';

type Airport = {
    name: string;
    code: string;
};

type FlightProps = {
    from: string | null;
    to: string | null;
    price: number;
    layover: string | null;
};

export const Flight = ({
    from,
    to,
    price,
    layover,
}: FlightProps): JSX.Element => {
    const airportContext = useContext(AirportContext);
    const { airports } = airportContext;

    const [airportInfo, setAirportInfo] = useState<{
        from: Airport | null;
        to: Airport | null;
        layover: Airport | null;
    }>({
        from: null,
        to: null,
        layover: null,
    });

    useEffect(() => {
        const airportFrom = getAirportFromCode(airports, from);
        const airportTo = getAirportFromCode(airports, to);
        const airportLayover = layover
            ? getAirportFromCode(airports, layover)
            : null;

        setAirportInfo({
            from: airportFrom,
            to: airportTo,
            layover: airportLayover,
        });
    }, [from, to, layover, airports]);

    if (airportInfo.from && airportInfo.to)
        return (
            <Accordion>
                <Accordion.Item eventKey='0'>
                    <Accordion.Header>
                        <div className='flight'>
                            <img
                                className='grid-item logo'
                                src={logo}
                                alt='logo'
                            ></img>

                            <div className='grid-item from'>
                                <span className='name'>
                                    {airportInfo.from.name}
                                </span>
                                (
                                <span className='code'>
                                    {airportInfo.from.code}
                                </span>
                                )
                            </div>
                            {airportInfo.layover ? (
                                <div className='grid-item direct'>ONE STOP</div>
                            ) : (
                                <div className='grid-item direct'>
                                    DIRECT FLY
                                </div>
                            )}
                            <div className='grid-item to'>
                                <span className='name'>
                                    {airportInfo.to.name}
                                </span>
                                (
                                <span className='code'>
                                    {airportInfo.to.code}
                                </span>
                                )
                            </div>
                            <div className='grid-item price'>{price}€</div>
                        </div>
                    </Accordion.Header>
                    <Accordion.Body className='d-flex flex-row'>
                        <div className='w-50'>
                            <Timeline
                                from={airportInfo.from}
                                to={airportInfo.to}
                                stop={airportInfo.layover}
                            />
                        </div>
                        <div className='w-50'></div>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        );
    return <Spinner animation='border' />;
};

type TimelineProps = {
    from: Airport;
    to: Airport;
    stop: Airport | null;
};

const Timeline = ({ from, to, stop }: TimelineProps): JSX.Element => {
    return (
        <div className='timeline'>
            <div className='timeline-item'>
                <div className='timeline-content'>
                    <h5 className='timeline-title'>
                        {from.name} ({from.code})
                    </h5>
                    <p className='timeline-description'>Departure</p>
                </div>
            </div>
            {stop && (
                <div className='timeline-item'>
                    <div className='timeline-content'>
                        <h5 className='timeline-title'>
                            {stop.name} ({stop.code})
                        </h5>
                        <p className='timeline-description'>Layover</p>
                    </div>
                </div>
            )}

            <div className='timeline-item'>
                <div className='timeline-content'>
                    <h5 className='timeline-title'>
                        {to.name} ({to.code})
                    </h5>
                    <p className='timeline-description'>Arrival</p>
                </div>
            </div>
        </div>
    );
};
