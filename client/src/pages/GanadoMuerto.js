import React from 'react';
import { dateFormat } from '../utils/dateFormat';
import Auth from '../utils/auth';
import Modal from 'react-bootstrap/Modal'
import AddDeath from './components/addDeath';
import EditMuerto from './components/editMuerto';
import { orderDates, reverseDates } from '../utils/helpers';


function GanadoMuerto() {

    const ranchId = window.location.pathname.split('/')

    const [viewModal, setModal] = React.useState(false)

    const [viewCows, setCows] = React.useState([]);

    const [confirm, setConfirm] = React.useState(false);

    const [editAll, setEdit] = React.useState(false);

    const [deleteBtn, setDelete] = React.useState(false);

    const [buttonValue, setValue] = React.useState('↓')

    const handleEdit = () => {
        return editAll ? setEdit(false) : setEdit(true)
    };

    const handleDelete = () => {
        return deleteBtn ? setDelete(false) : setDelete(true)
    }

    React.useEffect(() => {
        fetch(`/api/ranchos/${ranchId[2]}`)
            .then(res => res.json())
            .then((data) => {
                setCows(data)
            })
    }, [confirm || editAll || deleteBtn]);

    const messageConf = () => {
        return (
            <>
                <h4>💀</h4>
            </>
        )
    };

    const funciones = {
        message: () => messageConf(),
        setTrue: () => setConfirm(true),
        setFalse: () => setConfirm(false),
    };

    const deleteConfirm = (e) => {
        if (window.confirm('Estas seguro que quieres borrar este dato?')) {
            deleteDead(e.target.name)
        } else {
            return
        }
    };

    const deleteDead = (e) => {
        fetch(`/api/ranchos/${ranchId[2]}/ganado/${e}`, {
            method: 'delete',
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .then(() => setDelete(false))
    };

    const handleSwitch = (e) => {
        e.preventDefault();
        if (buttonValue === '↓') {
            setValue('↑')
           return viewCows.ganado.sort(orderDates)
        } 
        if (buttonValue === '↑') {
            setValue('↓')
            return viewCows.ganado.sort(reverseDates)
        }
    };

    return (
        <>
            {Auth.getToken() && Auth.getProfile().data._id === viewCows.owner ?
                <>
                    <buton type='button' className='btn btn-lg btn-outline-dark m-4 mb-0' onClick={() => setModal(true)}>+ Agregar Ganado Muerto</buton>
                    <div className='m-4 d-flex justify-content-between'>
                        <button onClick={handleEdit} className='btn text-light btn-warning'>{editAll ? <>Listo</> : <>Editar</>}</button>
                        <button onClick={handleDelete} className='btn text-light btn-danger'>Borrar</button>
                    </div>
                    <div className='m-4 p-2 d-flex justify-content-around'>
                        <table className='table table-light'>
                            <thead className='table text-light' style={{ backgroundColor: '#122620' }}>
                                <tr>
                                    <th scope={'col'}>SINIIIGA</th>
                                    <th scope={'col'}>ETAPA REP.</th>
                                    <th scope={'col'}>FECHA DE MUERTE<button className='btn btn-dark' onClick={handleSwitch}>{buttonValue}</button></th>
                                    <th scope={'col'}>CAUSA DE MUERTE</th>
                                    <th scope={'col'}>PROPIETARIO</th>
                                </tr>
                            </thead>
                            <tbody>
                                {viewCows.ganado.map((item) => {
                                    return item.status === 'Muerto' ?
                                        <tr className='position-relative'>
                                            {editAll ? <EditMuerto item={item} ranchId={ranchId[2]} funciones={funciones}></EditMuerto> :
                                                    <>
                                                    <td className='p-2 m-2'>{item.siniiiga}</td>
                                                    <td className='p-2 m-2'>{item.etapa}</td>
                                                    <td className='p-2 m-2'>{dateFormat(item.createdAt)}</td>
                                                    <td className='p-2 m-2'>{item.otros}</td>
                                                    <td className='p-2 m-2'>{item.consignado}</td>
                                                    {deleteBtn ? <button type='button' name={item._id} style={{borderRadius: '20px', maxHeight: '30px', alignItems: 'center'}} onClick={deleteConfirm} className='btn d-flex btn-sm btn-danger bg-danger text-light position-absolute top-50 start-100 translate-middle'>X</button> : <></>}
                                                    </>
                                            }
                                        </tr>
                                        : <></>
                                })}
                            </tbody>
                        </table>
                    </div>
                    <Modal show={viewModal} onHide={() => setModal(false)} fullscreen={true}>
                        <Modal.Header closeButton>
                            <Modal.Title>
                                Seleccione Ganado Muerto
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {confirm ? messageConf() : <></>}
                            <table className='table table-striped'>
                                <thead className='table text-light' style={{ backgroundColor: '#122620' }}>
                                    <tr>
                                        <th scope={'col'}>SINIIIGA</th>
                                        <th scope={'col'}>ETAPA REP.</th>
                                        <th scope={'col'}>FECHA DE COMPRA</th>
                                        <th scope={'col'}>FECHA DE MUERTE</th>
                                        <th scope={'col'}>CAUSA</th>
                                        <th scope={'col'}>PROPIETARIO</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {viewCows.ganado.map((item) => {
                                        return item.status === 'Comprado' ?
                                            <>
                                                <tr className='position-relative'>

                                                    <AddDeath cows={item} funciones={funciones}></AddDeath>
                                                </tr>
                                            </> : <></>
                                    })}
                                </tbody>
                            </table>
                        </Modal.Body>
                    </Modal>
                </>
                : <>No tienes acceso</>}
        </>
    )
}

export default GanadoMuerto