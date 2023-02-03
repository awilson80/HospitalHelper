import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const EditHospital = () => {
    const [input, setInput] = useState({
        name: '',
        location: '',
        type: '',
        npi: '',
    });

    const navigate = useNavigate();
    const location = useLocation();

    // Gets the id for the entry being edited from the endpoint
    const hospitalId = location.pathname.split('/')[2];

    const handleChange = (event) => {
        setInput((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };

    const handleClick = async (event) => {
        event.preventDefault();
        try {
            await axios.put('http://localhost:4000/hospitals/' + hospitalId, input);
            navigate('/');
        } catch (err) {
            console.log('Unable to process update.');
        }
    };

    return (
        <div className='form'>
            <h1>Edit Hospital Details</h1>
            <input
                type='text'
                placeholder='name'
                onChange={handleChange}
                name='name'
            />
            <input
                type='text'
                placeholder='location'
                onChange={handleChange}
                name='location'
            />
            <input
                type='text'
                placeholder='type'
                onChange={handleChange}
                name='type'
            />
            <input
                type='text'
                placeholder='npi'
                onChange={handleChange}
                name='npi'
            />
            <button className='form-button' onClick={handleClick}>
                Save
            </button>
        </div>
    );
};

export default EditHospital;
