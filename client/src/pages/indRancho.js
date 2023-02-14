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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLog(false)
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
                setLog(true)
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

                        <h1 className='m-4 '>ENTRADAS</h1>
                        <h3 className='m-4 '>Cabezas de Ganado: {view.currentCount}</h3>
                    </div>
                    <button onClick={() => setLgShow(true)} className='m-4 btn btn-outline-success bg-gradient'> + Agregar Compra</button>
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

                            {message()}
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
                    <div className='m-4 p-2 d-flex justify-content-around'>
                        <table className='table table-light table-striped'>
                            <thead className='table text-light' style={{ backgroundColor: '#122620'}}>
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
                    <h1 className='m-4 '>SALIDA</h1>
                    <button type='button' className='m-4 btn btn-outline-success' onClick={() => setEdit(true)}> + Agregar Salida</button>
                    <Salidas edit={showEdit} ranchoId={view._id} vacas={vacas} closer={() => setEdit(false)} message={() => message()} logger={() => setLog(true)} offer={() => setLog(false)}></Salidas>
                    <a className='d-flex justify-content-center h5 mb-4' href={`/ranchos/${view._id}/salidas`}>Ver mas</a>

                </>
                : <h3 className='m-4 text-light'> No tienes accesso a estos datos </h3>
            }
        </>
    )
}

export default IndRanch