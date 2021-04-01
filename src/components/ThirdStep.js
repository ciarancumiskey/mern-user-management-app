import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import csc from 'country-state-city';
import axios from 'axios';
import { BASE_API_URL } from '../utils/constants';

const ThirdStep = (props) => {
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');

    useEffect(() => {
        const getCountries = async () => {
            try {
                setIsLoading(true);
                const countryResult = await csc.getAllCountries();
                let allCountries = [];
                //Use map() so that only the ISO codes and names are obtained.
                allCountries = countryResult?.map(({ isoCode, name }) => ({
                    isoCode,
                    name
                }));
                //Assign a default empty object to prevent errors before the whole list is loaded
                const [{ isoCode: firstCountry } = {}] = allCountries;
                setCountries(allCountries);
                setSelectedCountry(firstCountry);
                setIsLoading(false);
                console.log(countryResult);
            } catch (error) {
                setCountries([]);
                setIsLoading(false);
            }
        };
        getCountries();
    }, []); //pass an empty array as useEffect's second arg so it'll only get called once
    useEffect(() => {
        const getStates = async () => {
            try {
                const stateResult = await csc.getStatesOfCountry(selectedCountry);
                let allStates = [];
                allStates = stateResult?.map(({ isoCode, name }) => ({
                    isoCode, name
                }));
                console.log({ allStates });
                const [{ isoCode: firstState = '' } = {}] = allStates;
                setCities([]);
                setSelectedCity('');
                setStates(allStates);
                setSelectedState(firstState);
            } catch (error) {
                setStates([]);
                setCities([]);
                setSelectedCity('');
            }
        };
        getStates();
    }, [selectedCountry]);
    useEffect(() => {
        const getCities = async () => {
            try {
                const cityResult = await csc.getCitiesOfState(selectedCountry, selectedState);
                let allCities = [];
                allCities = cityResult?.map(({ name }) => ({ name }));
                const [{ name: firstCity = '' } = {}] = allCities;
                setCities(allCities);
                setSelectedCity(firstCity);
            } catch (error) {
                setCities([]);
            }
        };
        getCities();
    }, [selectedState]);
    const handleSubmit = async (event) => {
        event.preventDefault();
    };

    return (
        <Form className="input-form" onSubmit={handleSubmit}>
            <div className="col-md-6 offset-md-3">
                <Form.Group controlId="country">
                    {isLoading && (
                        <p className="loading">Loading countries...</p>
                    )}
                    <Form.Label>Country</Form.Label>
                    <Form.Control as="select" name="country" value={selectedCountry}
                        onChange={(event) => setSelectedCountry(event.target.value)}>
                        {countries.map(({ isoCode, name }) => (
                            <option value={isoCode} key={isoCode}>
                                {name}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="state">
                    <Form.Label>State/Region/Province</Form.Label>
                    <Form.Control as="select" name="state" value={selectedState}
                        onChange={(event) => setSelectedState(event.target.value)}>
                        {states.length > 0 ?
                            (states.map(({ isoCode, name }) => (
                                <option value={isoCode} key={isoCode}>
                                    {name}
                                </option>
                            ))
                        ) : (
                                <option value="" key="">
                                    No state found
                                </option>
                        )}
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="city">
                    <Form.Label>City/Town</Form.Label>
                    <Form.Control as="select" name="city" value={selectedCity}
                        onChange={(event) => setSelectedCity(event.target.value)}>
                        {cities.length > 0 ? (cities.map(({ name }) => (
                            <option value={name} key={name}>
                                {name}
                            </option>
                        ))
                        ) : (
                                <option value="">No cities/towns found</option>
                            )}
                    </Form.Control>
                </Form.Group>

            </div>
        </Form>
    );
};
export default ThirdStep;