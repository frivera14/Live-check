import React from 'react';

function EditFields({item, ranchId}) {

    const [disabler, setDisable] = React.useState(false)
    
    const [formState, setForm] = React.useState(item)

    const handleChange = (e) => {
        e.preventDefault();

        const {name, value} = e.target;
        setForm({...formState, [name]: value});
    }

    const submitEdit = () => {
        fetch(`/api/ranchos/${ranchId}`, {
            method: 'put',
            body: JSON.stringify(formState),
            headers: {"Content-Type": "application/json"}
        })
        .then(res => res.json())
        .then(() => setDisable(true))
    }



    return (
        <>
            <td className='p-2 m-2'><input style={{maxWidth: '120px', maxHeight: '24px'}} type={'text'} disabled={disabler} placeholder={item.siniiiga} name={'siniiiga'} onChange={handleChange} value={formState.siniiiga}/></td>
            <td className='p-2 m-2'><input style={{maxWidth: '120px', maxHeight: '24px'}} type={'text'} disabled={disabler} placeholder={item.etapa} name={'etapa'} onChange={handleChange} value={formState.etapa}/></td>
            <td className='p-2 m-2'><input style={{maxWidth: '120px', maxHeight: '24px'}} type={'text'} disabled={disabler} placeholder={item.guia} name={'guia'} onChange={handleChange} value={formState.guia}/></td>
            <td className='p-2 m-2'><input style={{maxWidth: '120px', maxHeight: '24px'}} type={'text'} disabled={disabler} placeholder={item.remo} name={'remo'} onChange={handleChange} value={formState.remo}/></td>
            <td className='p-2 m-2'><input style={{maxWidth: '120px', maxHeight: '24px'}} type={'text'} disabled={disabler} placeholder={item.origen} name={'origen'} onChange={handleChange} value={formState.origen}/></td>
            <td className='p-2 m-2'><input style={{maxWidth: '120px', maxHeight: '24px'}} type={'text'} disabled={disabler} placeholder={item.propietario} name={'propietario'} onChange={handleChange} value={formState.propietario}/></td>
            <td className='p-2 m-2'><input style={{maxWidth: '120px', maxHeight: '24px'}} type={'text'} disabled={disabler} placeholder={item.consignado} name={'consignado'} onChange={handleChange} value={formState.consignado}/></td>
            <td className='p-2 m-2'><input style={{maxWidth: '120px', maxHeight: '24px'}} type={'date'} disabled={disabler} name={'createdAt'} onChange={handleChange} value={formState.createdAt}/></td>
            <button type='button' style={{borderRadius: '20px', maxHeight: '25px', alignItems: 'center'}} onClick={submitEdit} className='btn d-flex btn-sm btn-warning bg-warning text-light position-absolute top-50 start-100 translate-middle'>✓</button>

        </>
    )
}

export default EditFields