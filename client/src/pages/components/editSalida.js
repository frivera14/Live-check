import React, { useState } from 'react';

function EditSalida({ item }) {
    const [editForm, setEditForm] = useState({ etapa: '', guia: '', remo: '', origen: '', consignado: '', comprado: false, _id: item._id, createdAt: Date.now() })

    const handleEdit = (e) => {
        const {name, value} = e.target
        setEditForm({...editForm, [name]: value})
    }

    const handleSale = () => {

        fetch(`/api/${window.location.pathname}`, {
            method: 'put',
            body: JSON.stringify(editForm),
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => res.json())
    }

    return (<>
        <td> {item.siniiiga}</td>
        <td><input name='etapa' onChange={handleEdit} style={{maxWidth: '120px', maxHeight: '24px'}} value={editForm.etapa} placeholder={item.etapa} /></td>
        <td><input name='guia' onChange={handleEdit} style={{maxWidth: '120px', maxHeight: '24px'}} value={editForm.guia} placeholder={item.guia} /></td>
        <td><input name='remo' onChange={handleEdit} style={{maxWidth: '120px', maxHeight: '24px'}} value={editForm.remo} placeholder={item.remo} /></td>
        <td><input name='origen' onChange={handleEdit} style={{maxWidth: '120px', maxHeight: '24px'}} value={editForm.origen} placeholder={item.origen} /></td>
        <td>{item.propietario}</td>
        <td><input name='consignado' onChange={handleEdit} style={{maxWidth: '120px', maxHeight: '24px'}} value={editForm.consignado} placeholder={item.consignado} /></td>
        <button type='button' onClick={handleSale} className='btn bg-success bg-gradient text-light'>✓</button>
    </>
    )
}

export default EditSalida