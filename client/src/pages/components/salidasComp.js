import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import ListGroup from 'react-bootstrap/ListGroup'
import EditSalida from './editSalida';
import { dateFormat } from '../../utils/dateFormat';
import { orderDates, returnAscending, returnDescending, reverseDates } from '../../utils/helpers';


function Salidas({ edit, ranchoId, vacas, functionObject, showLog }) {

    const [elboton, setBoton] = useState('↓')

    const [otroBoton, setOtro] = useState('↓')

    const toggleDate = () => {
        if (otroBoton === '↓') {
            vacas.sort(orderDates)
            setOtro('↑');
        } else {
            vacas.sort(reverseDates)
            setOtro('↓')
        }

    }

    const toggleBoton = () => {

        if (elboton === '↓') {
            vacas.sort(returnAscending)
            setBoton('↑')
        } else {
            vacas.sort(returnDescending)
            setBoton('↓')
        }
    }



    return (<>

        <div className='m-2 p-2 d-flex flex-column justify-content-around'>

            <table className='flex-column table table-light table-striped'>
                <thead className='table text-light' style={{ backgroundColor: '#122620' }}>
                    <tr>
                        <th scope={'col'}>SINIIIGA</th>
                        <th scope={'col'}>ETAPA REP.</th>
                        <th scope={'col'}>GUIA</th>
                        <th scope={'col'}>REMO</th>
                        <th scope={'col'}>DESTINO</th>
                        <th scope={'col'}>PROPIETARIO</th>
                        <th scope={'col'}>CONSIGNADO</th>
                        <th scope={'col'}>FECHA DE VENTA</th>
                    </tr>
                </thead>
                <tbody>

                    {/* Marked as sold or 'false display */}
                    {vacas.slice(0, 9).map((item) => {
                        return item.status === 'Vendido' ? <tr>

                            <td className='p-2 m-2'>{item.siniiiga}</td>
                            <td className='p-2 m-2'>{item.etapa}</td>
                            <td className='p-2 m-2'>{item.guia}</td>
                            <td className='p-2 m-2'>{item.remo}</td>
                            <td className='p-2 m-2'>{item.origen}</td>
                            <td className='p-2 m-2'>{item.consignado}</td>
                            <td className='p-2 m-2'>{item.propietario}</td>
                            <td className='p-2 m-2'>{dateFormat(item.createdAt)}</td>

                        </tr> : <></>
                    })}
                </tbody>
            </table>
            {/* Modal for Salidas/Editing existing Ganado */}
            <Modal show={edit} onHide={functionObject.editFalse} fullscreen={true}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Registrar Salidas:
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        {showLog ? functionObject.message() : <></>}
                    <ListGroup>
                        <table className='table table-striped '>
                            <thead className='table-dark'>
                                <tr>

                                    

                                    <th scope={'col'}>
                                        <div className='d-flex flex-row'>
                                        SINIIIGA
                                        <button type='button' style={{maxHeight: '50px', marginLeft: '2px'}} className='btn btn-dark p-1' onClick={() => toggleBoton()}>{elboton}</button>
                                        </div>
                                        </th>
                                    <th scope={'col'}>ETAPA REP.</th>
                                    <th scope={'col'}>GUIA</th>
                                    <th scope={'col'}>REMO</th>
                                    <th scope={'col'}>DESTINO</th>
                                    <th scope={'col'}>CONSIGNADO</th>
                                    <th scope={'col'}>PROPIETARIO</th>
                                    <th scope={'col'}>FECHA DE COMPRA<button type='button' style={{maxHeight: '50px', marginLeft: '5px'}} className='btn btn-dark p-1' onClick={() => toggleDate()}>{otroBoton}</button></th>
                                    <th scope={'col'}>FECHA DE VENTA</th>
                                    
                                </tr>

                            </thead>
                            <tbody>

                                {vacas.map((item) => {
                                    return item.status === 'Comprado' ? <>
                                        <tr className='position-relative'>
                                                <EditSalida ranchoId={ranchoId} item={item} functionObject={functionObject}></EditSalida>
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