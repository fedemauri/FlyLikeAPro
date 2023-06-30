import { useEffect, useContext } from 'react';
import { Flight } from '../components/Flight.tsx';
import AirportContext from './AirportContext.tsx';
import { getBestFlightsWithPrices } from '../utils/utils.ts';

type FlightSearchProps = {
    from: string;
    to: string;
    price: number;
};

export const FlightSearch = ({ from, to }: FlightSearchProps) => {
    const airportContext = useContext(AirportContext);

    console.log(from, to);
    useEffect(() => {
        let bestFlights = null;
        if (from?.value && to?.value)
            bestFlights = getBestFlightsWithPrices(
                airportContext.flight,
                from.value,
                to.value
            );
        console.log('bestFlights', bestFlights);
    }, [from, to]);

    return <Flight from={'milano'} to={'ostia'} price={'12'} />;
};
