import React from 'react';
import { dateFormat } from '../utils/dateFormat';
import Auth from '../utils/auth';
import Modal from 'react-bootstrap/Modal'
import AddDeath from './components/addDeath';


function GanadoMuerto() {

    const ranchId = window.location.pathname.split('/')

    const [viewModal, setModal] = React.useState(false)

    const [viewCows, setCows] = React.useState([]);

    const [confirm, setConfirm] = React.useState(false)

    React.useEffect(() => {
        fetch(`/api/ranchos/${ranchId[2]}`)
            .then(res => res.json())
            .then((data) => {
                setCows(data)
            })
    }, [confirm]);

    const messageConf = () => {
        return(
            <>
            <h4>💀</h4>
            </>
        )
    };

    const funciones = {
        message: () => messageConf(),
        setTrue: () => setConfirm(true),
        setFalse: () => setConfirm(false)
    };


    return (
        <>
            {Auth.getToken() && Auth.getProfile().data._id === viewCows.owner ?
                <>
                    <buton type='button' className='btn btn-lg btn-outline-dark m-4 mb-0' onClick={() => setModal(true)}>+ Agregar Ganado Muerto</buton>
                    <div className='m-4 p-2 d-flex justify-content-around'>
                        <table className='table table-light table-striped'>
                            <thead className='table text-light' style={{ backgroundColor: '#122620' }}>
                                <tr>
                                    <th scope={'col'}>SINIIIGA</th>
                                    <th scope={'col'}>ETAPA REP.</th>
                                    <th scope={'col'}>FECHA DE MUERTE</th>
                                    <th scope={'col'}>CAUSA DE MUERTE</th>
                                    <th scope={'col'}>PROPIETARIO</th>
                                    {/* <button className='btn btn-dark' onClick={handleSwitch}>{buttonValue}</button> */}
                                </tr>
                            </thead>
                            <tbody>
                                {viewCows.ganado.map((item) => {
                                    return item.status === 'Muerto' ?
                                        <>
                                            <tr>

                                                <td className='p-2 m-2'>{item.siniiiga}</td>
                                                <td className='p-2 m-2'>{item.etapa}</td>
                                                <td className='p-2 m-2'>{dateFormat(item.createdAt)}</td>
                                                <td className='p-2 m-2'>{item.otros}</td>
                                                <td className='p-2 m-2'>{item.consignado}</td>

                                            </tr>
                                        </>
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
                                        {/* <button className='btn btn-dark' onClick={handleSwitch}>{buttonValue}</button> */}
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