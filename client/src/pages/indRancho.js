import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import Auth from '../utils/auth'
import Salidas from './components/salidasComp';
import { dateFormat } from '../utils/dateFormat'


function IndRanch() {

    const url = window.location.pathname.split('/ranchos/')

    const [showEdit, setEdit] = useState(false);

    const [view, setView] = useState([])

    const [vacas, setVacas] = useState([])

    const [lgShow, setLgShow] = useState(false);

    const [showLog, setLog] = useState(false);

    const [entryRow, setEntry] = useState({ siniiiga: '', etapa: '', guia: '', remo: '', origen: '', propietario: '', consignado: '', createdAt: '' })

    const message = () => {
        return (
            <>
                {showLog ? <h6 className='text-success'>Registrado!</h6> : <></>}
            </>
        )
    }

    const functionObject = {
        editFalse: () => setEdit(false),
        message: () => message(),
        logTrue: () => setLog(true),
        logFalse: () => setLog(false)
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        functionObject.logFalse()
        setEntry({ ...entryRow, [name]: value })
    }


    React.useEffect(() => {
        fetch(`/api/ranchos/${url[1]}`)
            .then(res => res.json())
            .then((data) => {
                const cows = data.ganado.reverse()
                setVacas(cows)
                setView(data)

            })
    }, [showLog])


    const createGanado = () => {

        fetch(`/api/ranchos/${url[1]}`, {
            method: 'post',
            body: JSON.stringify([entryRow]),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json())
            .then(() => {
                functionObject.logTrue();
                entryRow.siniiiga = ''
            }
            )
    }

    return (
        <>
            {Auth.getToken() && Auth.getProfile().data._id === view.owner ?
                // Conditional for unauthorized users in others documents
                <>
                    <div className='d-flex justify-content-between'>

                        <h3 className='m-2'>{view.ranchName}</h3>
                        <h3 className='m-2 '>Cabezas de Ganado: {view.currentCount}</h3>
                    </div>
                    <h2 className='m-2 '>Entrada</h2>
                    <div className='d-flex'>
                    <button onClick={() => setLgShow(true)} className='m-2 btn btn-outline-success btn-lg'> + Agregar Compra</button>
                    <button onClick={() => window.location.assign(`/ranchos/${url[1]}/gastos`)} className='sandBoton btn m-2 btn-lg'>Control de Gastos</button>
                    </div>
                    {/* Modal for adding to the collection */}
                    <Modal
                        show={lgShow}   
                        onHide={() => setLgShow(false)}
                        fullscreen={true}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="example-custom-modal-styling-title">
                                Registre los datos aqui:

                            </Modal.Title>
                        </Modal.Header>
                        <div className='p-2 m-2'>

                            {functionObject.message()}
                        </div>

                        <Modal.Body>
                            <div className='d-flex flex-column'>

                                <table className='table table-secondary table-striped'>
                                    <thead className='table-dark'>
                                        <tr>
                                            <th scope={'col'}>SINIIIGA</th>
                                            <th scope={'col'}>ETAPA REP.</th>
                                            <th scope={'col'}>GUIA</th>
                                            <th scope={'col'}>REMO</th>
                                            <th scope={'col'}>ORIGEN</th>
                                            <th scope={'col'}>PROPIETARIO</th>
                                            <th scope={'col'}>CONSIGNADO</th>
                                            <th scope={'col'}>FECHA DE COMPRA</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><input onChange={handleChange} value={entryRow.siniiiga} name='siniiiga' style={{ maxWidth: '100px' }} type={'text'} /></td>
                                            <td><input onChange={handleChange} value={entryRow.etapa} name='etapa' style={{ maxWidth: '100px' }} type={'text'} /></td>
                                            <td><input onChange={handleChange} value={entryRow.guia} name='guia' style={{ maxWidth: '100px' }} type={'text'} /></td>
                                            <td><input onChange={handleChange} value={entryRow.remo} name='remo' style={{ maxWidth: '100px' }} type={'text'} /></td>
                                            <td><input onChange={handleChange} value={entryRow.origen} name='origen' style={{ maxWidth: '100px' }} type={'text'} /></td>
                                            <td><input onChange={handleChange} value={entryRow.propietario} name='propietario' style={{ maxWidth: '100px' }} type={'text'} /></td>
                                            <td><input onChange={handleChange} value={entryRow.consignado} name='consignado' style={{ maxWidth: '100px' }} type={'text'} /></td>
                                            <td><input onChange={handleChange} value={entryRow.createdAt} name='createdAt' style={{ maxWidth: '120px' }} type={'date'} /></td>
                                        </tr>
                                    </tbody>
                                </table>
                                <button className='btn btn-dark w-25' type='button' onClick={createGanado}>Registrar</button>
                            </div>
                        </Modal.Body>
                    </Modal>
                    {/* Marked as in stock or 'true' displayed */}

                    <div className='m-2 p-2 d-flex flex-column justify-content-around'>
                        <table className='table flex-column table-light table-striped'>
                            <thead className='table text-light' style={{ backgroundColor: '#122620' }}>
                                <tr>
                                    <th scope={'col'}>SINIIIGA</th>
                                    <th scope={'col'}>ETAPA REP.</th>
                                    <th scope={'col'}>GUIA</th>
                                    <th scope={'col'}>REMO</th>
                                    <th scope={'col'}>ORIGEN</th>
                                    <th scope={'col'}>PROPIETARIO</th>
                                    <th scope={'col'}>CONSIGNADO</th>
                                    <th scope={'col'}>FECHA DE COMPRA</th>
                                </tr>
                            </thead>
                            <tbody>


                                {vacas.slice(0, 9).map((item) => {
                                    return item.status === 'Comprado' ?
                                    <>
                                            <tr>

                                                <td className='p-2 m-2'>{item.siniiiga}</td>
                                                <td className='p-2 m-2'>{item.etapa}</td>
                                                <td className='p-2 m-2'>{item.guia}</td>
                                                <td className='p-2 m-2'>{item.remo}</td>
                                                <td className='p-2 m-2'>{item.origen}</td>
                                                <td className='p-2 m-2'>{item.propietario}</td>
                                                <td className='p-2 m-2'>{item.consignado}</td>
                                                <td className='p-2 m-2'>{dateFormat(item.createdAt)}</td>

                                            </tr>
                                        </>
                                        : null
                                })}

                            </tbody>
                        </table>
                    </div>
                    <a className='d-flex justify-content-center h5' href={`/ranchos/${view._id}/ganado`}>Ver mas</a>

                    {/* Start Salida Component here */}
                    <h1 className='m-2 '>Salida</h1>
                    <div className='d-flex'>
                    <button type='button' className='m-2 btn btn-outline-danger btn-lg' onClick={() => setEdit(true)}> + Agregar Salida</button>
                    <a style={{textDecoration: 'none'}} href={`/ranchos/${url[1]}/muertos`}><button type='button' className='btn btn-outline-dark m-2 btn-lg'>Ganado Muerto: {view.ganadoMuerto}</button></a>
                    </div>
                    <Salidas edit={showEdit} ranchoId={view._id} vacas={vacas} functionObject={functionObject} showLog={showLog}></Salidas>
                    <a className='d-flex justify-content-center h5 mb-4' href={`/ranchos/${view._id}/salidas`}>Ver mas</a>

                </>
                : <h3 className='m-4'> No tienes accesso a estos datos </h3>
            }
        </>
    )
}

export default IndRanch