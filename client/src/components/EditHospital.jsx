import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const EditHospital = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Gets the id for the entry being edited from the endpoint
    const hospitalId = location.pathname.split('/')[2];

    // const [input, setInput] = useState([]);

    const [input, setInput] = useState({
        name: '',
        location: '',
        type: '',
        phone: '',
    });

    useEffect(() => {
        const getInputs = async () => {
            try {
                const res = await axios.get(
                    'http://localhost:4000/hospitals/' + hospitalId
                );
                setInput(res.data[0]);
                console.log(res.data);
            } catch (err) {
                console.log(err);
            }
        };

        getInputs();
    }, []);

    const handleChange = (event) => {
        setInput((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };

    const handleClick = async (event) => {
        event.preventDefault();
        try {
            await axios.put(
                'http://localhost:4000/hospitals/' + hospitalId,
                input
            );
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
                value={input.name}
            />
            <input
                type='text'
                placeholder='location'
                onChange={handleChange}
                name='location'
                value={input.location}
            />
            <select
                onChange={handleChange}
                className='hospital-type-dropdown'
                name='type'
                value={input.type}
            >
                <option value='General'>General</option>
                <option value='Pediatric'>Pediatric</option>
                <option value='Cardiology'>Cardiology</option>
                <option value='Neurology'>Neurology</option>
                <option value='Orthopedic'>Orthopedic</option>
            </select>
            <input
                type='text'
                placeholder='phone'
                onChange={handleChange}
                name='phone'
                value={input.phone}
            />
            <button className='form-button' onClick={handleClick}>
                Save
            </button>
        </div>
    );
};

export default EditHospital;
