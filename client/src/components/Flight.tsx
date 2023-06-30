import { useEffect } from 'react';

type FlightProps = {
    from: string;
    to: string;
    price: number;
};

export const Flight = ({ from, to, price }: FlightProps): JSX.Element => {
    return 'ciao';
};
