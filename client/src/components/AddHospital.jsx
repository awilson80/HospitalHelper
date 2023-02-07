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

    // console.log(input);

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
            {/* <input
                type='text'
                placeholder='type'
                onChange={handleChange}
                name='type'
            /> */}
            <select onChange={handleChange} className='hospital-type-dropdown' name='type'>
                <option value='general'>General</option>
                <option value='pediatric'>Pediatric</option>
                <option value='cardiology'>Cardiology</option>
                <option value='neurology'>Neurology</option>
                <option value='orthopedic'>Orthopedic</option>
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
