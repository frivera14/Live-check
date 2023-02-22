import React from 'react';
import { dateFormat } from '../../utils/dateFormat';

function AddDeath({ cows, funciones }) {

    const url = window.location.pathname.split('/')

    const [formData, setForm] = React.useState({ siniiiga: cows.siniiiga, etapa: cows.etapa, status: 'Muerto', createdAt: '', otros: '', _id: cows._id })

    const handleChange = (e) => {
        const { name, value } = e.target;
        funciones.setFalse()
        setForm({ ...formData, [name]: value })
    }

    const handleDeath = (e) => {
        e.preventDefault();

        fetch(`/api/ranchos/${url[2]}`, {
            method: 'put',
            body: JSON.stringify(formData),
            headers: { 'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .then(() => funciones.setTrue())
    }

    return (
        <>
            <td className='p-2 m-2'>{cows.siniiiga}</td>
            <td className='p-2 m-2'>{cows.etapa}</td>
            <td className='p-2 m-2'>{dateFormat(cows.createdAt)}</td>
            <td className='p-2 m-2'><input onChange={handleChange} type={'date'} name={'createdAt'} value={formData.createdAt} /></td>
            <td className='p-2 m-2'><input onChange={handleChange} type={'text'} name={'otros'} value={formData.otros} />{cows.otros}</td>
            <td className='p-2 m-2'>{cows.propietario}</td>
            <button type='button' style={{ borderRadius: '20px', maxHeight: '30px', alignItems: 'center' }} onClick={handleDeath} className='btn d-flex btn-sm bg-danger bg-gradient text-light position-absolute top-50 start-100 translate-middle'>✓</button></>

    )
}

export default AddDeath