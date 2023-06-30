import { useEffect, useState, useContext } from 'react';
import { getAirportFromCode } from '../utils/utils.ts';
import AirportContext from '../containers/AirportContext.tsx';
import { Spinner, Accordion } from 'react-bootstrap';
import logo from './../img/fly.png';
import FlyMap from './../components/FlyMap.tsx';

type FlightProps = {
    from: string;
    to: string;
    price: number;
};

export const Flight = ({
    from,
    to,
    price,
    layover,
}: FlightProps): JSX.Element => {
    const airportContext = useContext(AirportContext);
    const { airports } = airportContext;

    const [airportInfo, setAirportInfo] = useState({
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
    }, [from, to, layover]);

    if (airportInfo.from && airportInfo.to)
        return (
            <Accordion>
                <Accordion.Item eventKey='0'>
                    <Accordion.Header>
                        <div className='flight'>
                            <img className='grid-item logo' src={logo}></img>

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

const Timeline = ({ from, to, stop }) => {
    return (
        <div class='timeline'>
            <div class='timeline-item'>
                <div class='timeline-content'>
                    <h5 class='timeline-title'>
                        {from.name} ({from.code})
                    </h5>
                    <p class='timeline-description'>Departure</p>
                </div>
            </div>
            {stop && (
                <div class='timeline-item'>
                    <div class='timeline-content'>
                        <h5 class='timeline-title'>
                            {stop.name} ({stop.code})
                        </h5>
                        <p class='timeline-description'>Layover</p>
                    </div>
                </div>
            )}

            <div class='timeline-item'>
                <div class='timeline-content'>
                    <h5 class='timeline-title'>
                        {to.name} ({to.code})
                    </h5>
                    <p class='timeline-description'>Arrival</p>
                </div>
            </div>
        </div>
    );
};
