import React, { useContext } from 'react';
import { Form } from 'react-bootstrap';
import AsyncSelect from 'react-select/async';
import AirportContext from '../containers/AirportContext.tsx';
import { Data } from '../App.tsx';

type SearchInputsProps = {
    data: Data;
    setData: (data: Data) => void;
};

const SearchInputs: React.FC<SearchInputsProps> = ({ data, setData }) => {
    const airportContext = useContext(AirportContext);

    const debounceNoPromise = (func: Function, wait = 500) => {
        let timeout: any;
        return function () {
            const context = this;
            const args = arguments;
            const later = function () {
                timeout = null;
                func.apply(context, args);
            };

            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };

    const filterAirport = (inputValue: string, callback: Function) => {
        let filteredOptions: { value: string; label: string }[] = [];

        if (inputValue) {
            filteredOptions = airportContext.airports
                .filter(
                    (airport: any) =>
                        airport.name
                            .toLowerCase()
                            .includes(inputValue.toLowerCase()) ||
                        airport.code
                            .toLowerCase()
                            .includes(inputValue.toLowerCase())
                )
                .map((filterAirport: any) => {
                    return {
                        value: filterAirport.code,
                        label: filterAirport.name,
                    };
                });
        }
        callback(filteredOptions);
    };

    return (
        <div className='search-inputs d-flex flex-row d-flex justify-content-between p-3 mt-3 mb-3'>
            <Form.Group className='form-group mb-3 w-25' id='from'>
                <Form.Label htmlFor='from'>From</Form.Label>
                <div className='select w-100'>
                    <AsyncSelect
                        cacheOptions
                        defaultOptions
                        isClearable
                        loadOptions={debounceNoPromise(filterAirport, 500)}
                        noOptionsMessage={() => 'Type to search'}
                        placeholder='From'
                        onChange={(selected: any) =>
                            setData({ ...data, from: selected })
                        }
                        value={data.from}
                    />
                </div>
            </Form.Group>

            <Form.Group className='form-group mb-3 w-25' id='to'>
                <Form.Label htmlFor='to'>To</Form.Label>
                <div className='select w-100'>
                    <AsyncSelect
                        cacheOptions
                        defaultOptions
                        isClearable
                        loadOptions={debounceNoPromise(filterAirport, 500)}
                        noOptionsMessage={() => 'Type to search'}
                        placeholder='To'
                        onChange={(selected: any) =>
                            setData({ ...data, to: selected })
                        }
                        value={data.to}
                    />
                </div>
            </Form.Group>

            <Form.Group className='form-group mb-3 w-25' id='depart'>
                <Form.Label htmlFor='depart'>Depart</Form.Label>
                <Form.Control type='date' disabled />
            </Form.Group>

            <Form.Group className='form-group mb-3 w-25' id='return'>
                <Form.Label htmlFor='return'>Return</Form.Label>
                <Form.Control type='date' disabled />
            </Form.Group>
        </div>
    );
};

export default SearchInputs;
