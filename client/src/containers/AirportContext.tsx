import { createContext } from 'react';
import airports from '../data/airports';
import flight from '../data/flight';

const AirportContext = createContext({
    airports,
    flight,
});
export const AirportProvider = AirportContext.Provider;
export default AirportContext;
