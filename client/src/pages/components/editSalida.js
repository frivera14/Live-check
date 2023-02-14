import React, { useState } from 'react';
import { dateFormat } from '../../utils/dateFormat';

function EditSalida({ ranchoId, item, logger, offer }) {
    const [editForm, setEditForm] = useState({ etapa: '', guia: '', remo: '', origen: '', consignado: '', status: 'Vendido', _id: item._id, createdAt: '' })

    const handleEdit = (e) => {
        const {name, value} = e.target
        offer()
        setEditForm({...editForm, [name]: value})
    }

    const handleSale = () => {
        console.log(ranchoId)
        fetch(`/api/ranchos/${ranchoId}`, {
            method: 'put',
            body: JSON.stringify(editForm),
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .then(() => logger())
    }

    return (<>
        <td> {item.siniiiga}</td>
        <td><input name='etapa' onChange={handleEdit} style={{maxWidth: '110px', maxHeight: '24px'}} value={editForm.etapa} placeholder={item.etapa} /></td>
        <td><input name='guia' onChange={handleEdit} style={{maxWidth: '110px', maxHeight: '24px'}} value={editForm.guia} placeholder={item.guia} /></td>
        <td><input name='remo' onChange={handleEdit} style={{maxWidth: '110px', maxHeight: '24px'}} value={editForm.remo} placeholder={item.remo} /></td>
        <td><input name='origen' onChange={handleEdit} style={{maxWidth: '110px', maxHeight: '24px'}} value={editForm.origen} placeholder={item.origen} /></td>
        <td>{item.propietario}</td>
        <td><input name='consignado' onChange={handleEdit} style={{maxWidth: '110px', maxHeight: '24px'}} value={editForm.consignado} placeholder={item.consignado} /></td>
        <td><input name='createdAt' onChange={handleEdit} style={{maxWidth: '110px', maxHeight: '24px'}} value={editForm.createdAt} type={'date'} placeholder={dateFormat(item.createdAt)} /></td>
        <button type='button' style={{borderRadius: '20px', maxHeight: '30px', alignItems: 'center'}} onClick={handleSale} className='btn d-flex btn-sm bg-success bg-gradient text-light position-absolute top-50 start-100 translate-middle'>✓</button>
    </>
    )
}

export default EditSalida