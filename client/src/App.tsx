import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { SERVER_ADDR } from './utils/utils.ts';
import SearchInputs from './components/SearchInputs.tsx';
import AirportContext, {
    AirportProvider,
} from './containers/AirportContext.tsx';
import { Header } from './containers/Header.tsx';
import { FlightSearch } from './containers/FlightSearch.tsx';

function App() {
    const airportContext = useContext(AirportContext);

    const [formData, setFormData] = useState({
        from: null,
        to: null,
    });
    const [airports, setAirports] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async (from, to) => {
        try {
            const response = await axios.get(`${SERVER_ADDR}/airport`);
            console.log(response.data);
            if (response?.data?.data) setAirports(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='App'>
            <AirportProvider
                value={{
                    airports: airports,
                }}
            >
                <Header />
                <div className='container'>
                    <SearchInputs data={formData} setData={setFormData} />
                    {formData?.from && formData.to && (
                        <FlightSearch from={formData.from} to={formData.to} />
                    )}
                </div>
            </AirportProvider>
        </div>
    );
}

export default App;
