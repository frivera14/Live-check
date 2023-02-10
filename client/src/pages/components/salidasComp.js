import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import ListGroup from 'react-bootstrap/ListGroup'
import SalidaStat from './salidaStat'
import EditSalida from './editSalida';


function Salidas({ vacas }) {
    const [showEdit, setEdit] = useState(false);

    const [newField, setNewField] = useState('');

    const changeType = (e) => {
        e.preventDefault();
        if (newField === e.target.name) {
            return setNewField('')
        }
      return setNewField(e.target.name)
    }



    return (<>
        <h1 className='m-4 text-light'>SALIDA</h1>
        <button type='button' className='m-4 btn btn-primary bg-gradient' onClick={() => setEdit(true)}> + Agregar Salida</button>

        <div className='m-4 p-2 d-flex justify-content-around'>

            <table className='table table-secondary table-striped'>
                <thead className='table-dark'>
                    <tr>
                        <th scope={'col'}>SINIIIGA</th>
                        <th scope={'col'}>ETAPA REP.</th>
                        <th scope={'col'}>GUIA</th>
                        <th scope={'col'}>REMO</th>
                        <th scope={'col'}>DESTINO</th>
                        <th scope={'col'}>CONSIGNADO</th>
                        <th scope={'col'}>PROPIETARIO</th>
                        <th scope={'col'}>FECHA DE VENTA</th>
                    </tr>
                </thead>
                <tbody>

                    {/* Marked as sold or 'false display */}
                    {vacas.slice(0 , 9).map((item) => {
                        return item.comprado ? <></> : <tr>

                            <td className='p-2 m-2'>{item.siniiiga}</td>
                            <td className='p-2 m-2'>{item.etapa}</td>
                            <td className='p-2 m-2'>{item.guia}</td>
                            <td className='p-2 m-2'>{item.remo}</td>
                            <td className='p-2 m-2'>{item.origen}</td>
                            <td className='p-2 m-2'>{item.consignado}</td>
                            <td className='p-2 m-2'>{item.propietario}</td>
                            <td className='p-2 m-2'>{item.createdAt}</td>

                        </tr>
                    })}
                </tbody>
            </table>
            {/* Modal for Salidas/Editing existing Ganado */}
            <Modal show={showEdit} onHide={() => setEdit(false)} fullscreen={true}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Registrar Salidas:
                        </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ListGroup>
                        <table className='table table-striped '>
                            <thead className='table-dark'>
                                <tr>
                                    <th scope={'col'}>Editar</th>
                                    <th scope={'col'}>SINIIIGA</th>
                                    <th scope={'col'}>ETAPA REP.</th>
                                    <th scope={'col'}>GUIA</th>
                                    <th scope={'col'}>REMO</th>
                                    <th scope={'col'}>DESTINO</th>
                                    <th scope={'col'}>CONSIGNADO</th>
                                    <th scope={'col'}>PROPIETARIO</th>
                                </tr>

                            </thead>
                            <tbody>

                                {vacas.map((item) => {
                                    return item.comprado ? <>
                                        <tr>
                                            <ListGroup.Item action name={item._id} variant='warning' onClick={changeType}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
                                                    <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
                                                </svg>
                                            </ListGroup.Item>
                                            {newField === item._id ? <>
                                            <EditSalida item={item}></EditSalida>
                                            </> : <>
                                            <SalidaStat item={item}></SalidaStat>
                                            </>}

                                        </tr>
                                    </> : null
                                })}
                            </tbody>
                        </table>
                    </ListGroup>

                </Modal.Body>
            </Modal>

        </div>

    </>
    )
}

export default Salidas