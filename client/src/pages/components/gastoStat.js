import React from 'react';
import { dateFormat } from '../../utils/dateFormat';
import { changeIt } from '../../utils/helpers';

function GastoStat({ item, deleteBtn, ranchId, functionObject }) {

    const deleteConfirm = (e) => {
        e.preventDefault();

        if (window.confirm('Estas seguro que quieres borrar esta transaccion?')) {
            handleDelete(e.target.name)
        } else {
            return deleteBtn = false
        }
    };

    const handleDelete = (data) => {
        fetch(`/api/ranchos/${ranchId}/gastos/${data}`, {
            method: 'delete',
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .then(() => functionObject.setFalse())
    }

    return (
        <>
            {item.sort(changeIt).map((cosa) => {
                return <>
                    <tr className={`position-relative`}>
                        <td>{cosa.name}</td>
                        {cosa.cantidad < 0 ? <td>- ${(cosa.cantidad)*-1}</td> :
                            <td>+ ${cosa.cantidad}</td>}
                        <td>{dateFormat(cosa.fecha)}</td>
                        {deleteBtn ? <><button type='button' name={cosa._id} onClick={deleteConfirm} style={{borderRadius: '20px', maxHeight: '30px', alignItems: 'center'}} className='btn d-flex btn-sm btn-danger bg-danger text-light position-absolute top-50 start-100 translate-middle'>X</button></>:<></>}
                        
                    </tr>
                </>
            })}
        </>
    )
}

export default GastoStat