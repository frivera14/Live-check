import React, { useState, useEffect } from 'react';
import Auth from '../utils/auth'
import { dateFormat } from '../utils/dateFormat';
import { orderDates, reverseDates } from '../utils/helpers';
import EditStock from './components/editInStock';

function AllCows() {

    const ranchId = window.location.pathname.split('/')

    const [viewCows, setView] = useState([])

    const [ranchData, setRanch] = useState([])

    const [buttonValue, setValue] = useState('↓')

    const [editAll, setEditAll] = useState(false)

    const [deleteBtn, setDelete] = useState(false)

    const editHandler = () => {
        if (editAll) {
            setEditAll(false)
        } else {
            setEditAll(true)
        }
    };

    const deleteHandler = () => {
        if (deleteBtn) {
            setDelete(false)
        } else {
            setDelete(true)
        }
    }

    
    const handleSwitch = () => {
        if (buttonValue === '↓') {
            setValue('↑')
            viewCows.sort(orderDates)
        } else {
            viewCows.sort(reverseDates)
            setValue('↓')
        }
    };
    
    useEffect(() => {
        fetch(`/api/ranchos/${ranchId[2]}`)
            .then(res => res.json())
            .then((data) => {
                const cows = data.ganado
                setRanch(data)
                return setView(cows)
            })
    }, [editAll || deleteBtn]);

    const deleteConfirm = (e) => {
        if (window.confirm('Estas seguro/a que quieres borrar este dato?')){
            deleteVaca(e.target.name)
        } else {
            setDelete(false)
        }
    }

    const deleteVaca = (e) => {

        fetch(`/api/ranchos/${ranchId[2]}/ganado/${e}`, {
            method: 'delete',
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .then(() => setDelete(false))
    }



    return (
        <>
            {Auth.getToken() && Auth.getProfile().data._id === ranchData.owner ? <>
                <div className='d-flex justify-content-between'>
                <button className='btn btn-warning m-4 text-light' onClick={() => editHandler()}> {editAll ? <>Listo!</> : <>Editar Ganado</>}</button>
                <button className='btn btn-danger m-4 text-light' onClick={() => deleteHandler()}>Borrar Ganado</button>
                </div>
                <div className='m-4 p-2 d-flex justify-content-around'>
                    <table className='table table-light'>
                        <thead className='table text-light' style={{ backgroundColor: '#122620' }}>
                            <tr>
                                <th scope={'col'}>SINIIIGA</th>
                                <th scope={'col'}>ETAPA REP.</th>
                                <th scope={'col'}>GUIA</th>
                                <th scope={'col'}>REMO</th>
                                <th scope={'col'}>ORIGEN</th>
                                <th scope={'col'}>PROPIETARIO</th>
                                <th scope={'col'}>CONSIGNADO</th>
                                <th scope={'col'}>FECHA DE COMPRA <button className='btn btn-dark' onClick={handleSwitch}>{buttonValue}</button></th>
                            </tr>
                        </thead>
                        <tbody>
                            {viewCows.map((item) => {
                                return item.status === 'Comprado' ?
                                    <>
                                        {editAll ? <>

                                        <tr className='position-relative'>
                                            <EditStock item={item} ranchId={ranchId[2]}></EditStock>
                                        </tr>
                                        
                                        </> : 
                                        <tr className='position-relative'>

                                            <td className='p-2 m-2'>{item.siniiiga}</td>
                                            <td className='p-2 m-2'>{item.etapa}</td>
                                            <td className='p-2 m-2'>{item.guia}</td>
                                            <td className='p-2 m-2'>{item.remo}</td>
                                            <td className='p-2 m-2'>{item.origen}</td>
                                            <td className='p-2 m-2'>{item.propietario}</td>
                                            <td className='p-2 m-2'>{item.consignado}</td>
                                            <td className='p-2 m-2'>{dateFormat(item.createdAt)}</td>
                                            {deleteBtn ? <button type='button' name={item._id} style={{borderRadius: '20px', maxHeight: '30px', alignItems: 'center'}} onClick={deleteConfirm} className='btn d-flex btn-sm btn-danger bg-danger text-light position-absolute top-50 start-100 translate-middle'>X</button>: <></>}

                                        </tr>
                                        
                                        }

                                    </>
                                    : null

                            })}

                        </tbody>
                    </table>
                </div>

            </> : <>
                <h3 className='m-4 text-light'>No tienes acceso a estos datos</h3>
            </>}

        </>
    )
}

export default AllCows