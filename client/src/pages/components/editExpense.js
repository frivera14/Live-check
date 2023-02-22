import React from 'react';
import { dateFormat } from '../../utils/dateFormat';

function EditExpense({ item, ranchId }) {

    const [formState, setForm] = React.useState(item)

    const [disabler, setDisable] = React.useState(false)

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target
        setForm({ ...formState, [name]: value })
    };

    const handleEdit = () => {

        fetch(`/api/ranchos/${ranchId}/gastos/`, {
            method: 'put',
            body: JSON.stringify(formState),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then(() => disabler ? setDisable(false) : setDisable(true));
    }

    return (
        <>


            <tr className='position-relative'>
                <td><input disabled={disabler} style={{ maxWidth: '120px', maxHeight: '24px' }} onChange={handleChange} name={'name'} placeholder={item.name} value={formState.name} /></td>
                {item.cantidad < 0 ?
                    <td><input disabled={disabler} style={{ maxWidth: '120px', maxHeight: '24px' }} onChange={handleChange} name={'cantidad'} placeholder={item.cantidad} value={formState.cantidad} /></td> :
                    <td><input disabled={disabler} style={{ maxWidth: '120px', maxHeight: '24px' }} onChange={handleChange} name={'cantidad'} placeholder={item.cantidad} value={formState.cantidad} /></td>}
                <td><input disabled={disabler} style={{ maxWidth: '120px', maxHeight: '24px' }} onChange={handleChange} type={'date'} name={'fecha'} placeholder={dateFormat(item.fecha)} value={formState.fecha} /></td>
                <button type='button' style={{ borderRadius: '20px', maxHeight: '30px', alignItems: 'center' }} onClick={handleEdit} className='btn d-flex btn-sm btn-warning bg-warning text-light position-absolute top-50 start-100 translate-middle'>✓</button>
            </tr>
        </>

                    
         

    )
}

export default EditExpense