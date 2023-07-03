import { createContext } from 'react';

const AirportContext = createContext({ airports: [] });
export const AirportProvider = AirportContext.Provider;
export default AirportContext;
