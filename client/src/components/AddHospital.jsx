import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddHospital = () => {
    const [input, setInput] = useState({
        name: '',
        location: '',
        type: '',
        phone: '',
    });

    const navigate = useNavigate();

    const handleChange = (event) => {
        setInput((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };

    const handleClick = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:4000/hospitals', input);
            navigate('/');
        } catch (err) {
            console.log('Unable to process new addition.');
        }
    };

    return (
        <div className='form'>
            <h1>Add New Hospital</h1>
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
            <select
                onChange={handleChange}
                className='hospital-type-dropdown'
                name='type'
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
            />
            <button className='form-button' onClick={handleClick}>
                Save
            </button>
        </div>
    );
};

export default AddHospital;
