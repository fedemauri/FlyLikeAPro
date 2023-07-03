import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SERVER_ADDR } from './utils/utils.ts';
import SearchInputs from './components/SearchInputs.tsx';
import { AirportProvider } from './containers/AirportContext.tsx';
import { Header } from './containers/Header.tsx';
import { FlightSearch } from './containers/FlightSearch.tsx';
import Promotions from './containers/Promotions.tsx';

export type SelectionData = {
    value: string;
    label: string;
};

export type Data = {
    from: SelectionData | null;
    to: SelectionData | null;
};

function App() {
    const [formData, setFormData] = useState<Data>({
        from: null,
        to: null,
    });
    const [airports, setAirports] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${SERVER_ADDR}/airport`);
            if (response?.data?.data) setAirports(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSetTrip = (
        from: SelectionData | null,
        to: SelectionData | null
    ) => {
        setFormData({
            from,
            to,
        });
    };

    const resetTrip = () => handleSetTrip(null, null);

    return (
        <div className='App'>
            <AirportProvider value={{ airports }}>
                <Header resetTrip={resetTrip} />
                <div className='container'>
                    <SearchInputs data={formData} setData={setFormData} />
                    {formData?.from && formData.to ? (
                        <FlightSearch from={formData.from} to={formData.to} />
                    ) : (
                        <Promotions setTrip={handleSetTrip} />
                    )}
                </div>
            </AirportProvider>
        </div>
    );
}

export default App;
