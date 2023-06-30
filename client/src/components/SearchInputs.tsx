import React, { useContext, useState } from 'react';
import { Form } from 'react-bootstrap';
import AsyncSelect from 'react-select/async';
import AirportContext from '../containers/AirportContext.tsx';
import { log } from 'console';

function SearchInputs({ data, setData }) {
    const airportContext = useContext(AirportContext);

    const debounceNoPromise = (func, wait = 500, immediate) => {
        let timeout;
        return function () {
            const context = this,
                args = arguments;
            const later = function () {
                timeout = null;
                func.apply(context, args);
            };

            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };

    const filterAirport = (inputValue: string, callback) => {
        let filteredOptions = [];
        console.log('airportContext.airports', airportContext.airports);
        if (inputValue)
            filteredOptions = airportContext.airports
                .filter(
                    (airport) =>
                        airport.name
                            .toLowerCase()
                            .includes(inputValue.toLowerCase()) ||
                        airport.code
                            .toLowerCase()
                            .includes(inputValue.toLowerCase())
                )
                .map((filterAirport) => {
                    return {
                        value: filterAirport.code,
                        label: filterAirport.name,
                    };
                });
        callback(filteredOptions);
    };

    return (
        <div className='search-inputs d-flex flex-row d-flex justify-content-between p-3 mt-3 mb-3'>
            <Form.Group className='form-group mb-3 w-25' controlId='from'>
                <Form.Label controlId='from' label='From'>
                    {/* <Form.Control type='text' /> */}
                </Form.Label>
                <div className='select w-100'>
                    <AsyncSelect
                        cacheOptions
                        defaultOptions
                        loadOptions={debounceNoPromise(filterAirport, 500)}
                        noOptionsMessage={() => 'Type to search'}
                        placeholder={'From'}
                        onChange={(selected) =>
                            setData({ ...data, from: selected })
                        }
                        value={data.from}
                    />
                </div>
            </Form.Group>

            <Form.Group className='form-group mb-3 w-25' controlId='to'>
                <Form.Label controlId='to' label='To'></Form.Label>
                <div className='select w-100'>
                    <AsyncSelect
                        cacheOptions
                        defaultOptions
                        loadOptions={debounceNoPromise(filterAirport, 500)}
                        noOptionsMessage={() => 'Type to search'}
                        placeholder={'To'}
                        onChange={(selected) =>
                            setData({ ...data, to: selected })
                        }
                        value={data.to}
                    />
                </div>
            </Form.Group>

            <Form.Group className='form-group mb-3 w-25' controlId='depart'>
                <Form.Label controlId='depart' label='Depart'></Form.Label>
                <Form.Control type='date' />
            </Form.Group>

            <Form.Group className='form-group mb-3 w-25' controlId='return'>
                <Form.Label controlId='return' label='Return'></Form.Label>
                <Form.Control type='date' />
            </Form.Group>
        </div>
    );
}

export default SearchInputs;
