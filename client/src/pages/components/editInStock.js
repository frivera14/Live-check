import React from 'react';

function EditStock({ item, ranchId }) {
    const [formState, setForm] = React.useState({ etapa: '', guia: '', remo: '', origen: '', propietario: '', consignado: '', createdAt: '', _id: item._id })

    const [enabler, setEnabler] = React.useState(false)
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...formState, [name]: value })
    }


    const handleSubmit = () => {

        fetch(`/api/ranchos/${ranchId}`, {
            method: 'put',
            body: JSON.stringify(formState),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then(() => setEnabler(true))
    }

    return (
        <>
            <td className='p-2 m-2'><input disabled={enabler} name={'siniiiga'} style={{ maxWidth: '120px', maxHeight: '24px'}} placeholder={item.siniiiga} type={'text'} value={formState.siniiiga} onChange={handleChange} /></td>
            <td className='p-2 m-2'><input disabled={enabler} name={'etapa'} style={{ maxWidth: '120px', maxHeight: '24px'}} placeholder={item.etapa} type={'text'} value={formState.etapa} onChange={handleChange}/></td>
            <td className='p-2 m-2'><input disabled={enabler} name={'guia'} style={{ maxWidth: '120px', maxHeight: '24px'}} placeholder={item.guia} type={'text'} value={formState.guia} onChange={handleChange} /></td>
            <td className='p-2 m-2'><input disabled={enabler} name={'remo'} style={{ maxWidth: '120px', maxHeight: '24px'}} placeholder={item.remo} type={'text'} value={formState.remo} onChange={handleChange} /></td>
            <td className='p-2 m-2'><input disabled={enabler} name={'origen'} style={{ maxWidth: '120px', maxHeight: '24px'}} placeholder={item.origen} type={'text'} value={formState.origen} onChange={handleChange} /></td>
            <td className='p-2 m-2'><input disabled={enabler} name={'propietario'} style={{ maxWidth: '120px', maxHeight: '24px'}} placeholder={item.propietario} type={'text'} value={formState.propietario} onChange={handleChange} /></td>
            <td className='p-2 m-2'><input disabled={enabler} name={'consignado'} style={{ maxWidth: '120px', maxHeight: '24px'}} placeholder={item.consignado} type={'text'} value={formState.consignado} onChange={handleChange} /></td>
            <td className='p-2 m-2'><input disabled={enabler} name={'createdAt'} style={{ maxWidth: '120px', maxHeight: '24px'}} placeholder={item.createdAt} type={'date'} value={formState.createdAt} onChange={handleChange}/></td>
            <button type='button' style={{borderRadius: '20px', maxHeight: '30px', alignItems: 'center'}} onClick={handleSubmit} className='btn d-flex btn-sm btn-warning bg-warning text-light position-absolute top-50 start-100 translate-middle'>✓</button>
        </>
    )
}

export default EditStock