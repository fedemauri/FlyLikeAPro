import { createContext } from 'react';
import airports from '../data/airports';
import flight from '../data/flight';

const AirportContext = createContext({});
export const AirportProvider = AirportContext.Provider;
export default AirportContext;
