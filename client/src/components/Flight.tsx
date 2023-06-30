import { useEffect, useState, useContext } from 'react';
import { getAirportFromCode } from '../utils/utils.ts';
import AirportContext from '../containers/AirportContext.tsx';
import { log } from 'console';
import { Spinner } from 'react-bootstrap';
import logo from './../img/fly.png';

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

    console.log(airportInfo);

    if (airportInfo.from && airportInfo.to)
        return (
            <div className='flight'>
                <img className='grid-item logo' src={logo}></img>

                <div className='grid-item from'>
                    <span className='name'>{airportInfo.from.name}</span>(
                    <span className='code'>{airportInfo.from.code}</span>)
                </div>
                {airportInfo.layover ? (
                    <div className=' grid-item layover'>
                        <div className='layover-str'>Layover:</div>
                        <span className='name'>{airportInfo.layover.name}</span>
                        (
                        <span className='code'>{airportInfo.layover.code}</span>
                        )
                    </div>
                ) : (
                    <div className='grid-item direct'> DIRECT FLY</div>
                )}
                <div className='grid-item to'>
                    <span className='name'>{airportInfo.to.name}</span>(
                    <span className='code'>{airportInfo.to.code}</span>)
                </div>
                <div className='grid-item price'>{price}€</div>
            </div>
        );
    return <Spinner animation='border' />;
};
