import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

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

    const sendData = async (data) => {
        try {
            await axios.post('http://localhost:4000/hospitals', data);
            navigate('/');
        } catch (err) {
            console.log('Unable to process new addition.');
        }
    };

    // Validation

    const onSubmit = (data) => {
        sendData(data);
    };

    const schema = yup.object().shape({
        name: yup.string().required('Please provide the name.'),
        location: yup.string().required(`Please provide the location.`),
        type: yup.string().required('Please specify the type.'),
        phone: yup
            .number()
            .positive()
            .integer()
            .required('Please provide the phone number.'),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    return (
        <form className='form'>
            <h1>Add New Hospital</h1>
            <input
                type='text'
                placeholder='name'
                onChange={handleChange}
                name='name'
                {...register('name')}
            />
            {errors.name && <p>{errors.name.message}</p>}
            <input
                type='text'
                placeholder='location'
                onChange={handleChange}
                name='location'
                {...register('location')}
            />
            {errors.location && <p>{errors.location.message}</p>}
            <select
                onChange={handleChange}
                className='hospital-type-dropdown'
                name='type'
                {...register('type')}
            >
                <option value='General'>General</option>
                <option value='Pediatric'>Pediatric</option>
                <option value='Cardiology'>Cardiology</option>
                <option value='Neurology'>Neurology</option>
                <option value='Orthopedic'>Orthopedic</option>
            </select>
            {errors.type && <p>{errors.type.message}</p>}
            <input
                type='text'
                placeholder='phone'
                onChange={handleChange}
                name='phone'
                {...register('phone')}
            />
            {errors.phone && <p>{errors.phone.message}</p>}
            <button
                type='submit'
                className='form-button'
                onClick={handleSubmit(onSubmit)}
            >
                Save
            </button>
        </form>
    );
};

export default AddHospital;
