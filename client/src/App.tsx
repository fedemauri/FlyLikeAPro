import React, { useContext, useState } from 'react';
import { Flight } from './components/Flight.tsx';
import SearchInputs from './components/SearchInputs.tsx';
import AirportContext from './containers/AirportContext.tsx';
import { Header } from './containers/Header.tsx';
import { FlightSearch } from './containers/FlightSearch.tsx';

function App() {
    const airportContext = useContext(AirportContext);
    const [formData, setFormData] = useState({
        from: null,
        to: null,
    });

    return (
        <div className='App'>
            <Header />
            <div className='container'>
                <SearchInputs data={formData} setData={setFormData} />
                {formData?.from && formData.to && (
                    <FlightSearch from={formData.from} to={formData.to} />
                )}
            </div>
        </div>
    );
}

export default App;
