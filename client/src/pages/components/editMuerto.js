import React from 'react';
import { dateFormat } from '../../utils/dateFormat';

function EditMuerto({item, ranchId}) {
    const [formState, setForm] = React.useState(item);

    const [disabler, setDisable] = React.useState(false)
    
    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setForm({...formState, [name]: value})
    };

    const handleEdit = () => {
        fetch(`/api/ranchos/${ranchId}/`, {
            method: 'put',
            body: JSON.stringify(formState),
            headers: { 'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .then(() => setDisable(true))
    }

    return(
        <>
        <td className='m-2 p-2'><input onChange={handleChange} disabled={disabler} name={'siniiiga'} value={formState.siniiiga} type={'text'} placeholder={item.siniiiga}/></td>
        <td className='m-2 p-2'><input onChange={handleChange} disabled={disabler} name={'etapa'} value={formState.etapa} type={'text'} placeholder={item.etapa}/></td>
        <td className='m-2 p-2'><input onChange={handleChange} disabled={disabler} name={'createdAt'} value={formState.createdAt} type={'date'} placeholder={dateFormat(item.createdAt)}/></td>
        <td className='m-2 p-2'><input onChange={handleChange} disabled={disabler} name={'otros'} value={formState.otros} type={'text'} placeholder={item.otros}/></td>
        <td className='m-2 p-2'><input onChange={handleChange} disabled={disabler} name={'consignado'} value={formState.consignado} type={'text'} placeholder={item.consignado}/></td>
        <button type='button' style={{borderRadius: '20px', maxHeight: '30px', alignItems: 'center'}} onClick={handleEdit} className='btn d-flex btn-sm btn-warning bg-warning text-light position-absolute top-50 start-100 translate-middle'>✓</button>
        </>
    )
}

export default EditMuerto