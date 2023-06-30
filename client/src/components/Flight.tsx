import { useEffect } from 'react';

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
    return <div>{`Da: ${from}  A: ${to}  Price: ${price}  ${
        layover ? `Layover: ${layover}` : ''
    }`}</div>;
};
