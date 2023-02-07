import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal'


function IndRanch() {
    const link = window.location.pathname
    const url = link.split('/ranchos/')

    const [view, setView] = useState([])

    const [lgShow, setLgShow] = useState(false);


    const getData = () => {
        fetch(`/api/ranchos/${url[1]}`)
            .then(res => res.json())
            .then((data) => setView(data))
    }
    return (
        <>
            {getData()}

            <h1 className='m-4 text-light'>ENTRADA</h1>
            <h3 className='m-4 text-light'>Cabezas de Ganado: {view.currentCount}</h3>
            <button onClick={() => setLgShow(true)} className='m-4 btn btn-primary bg-gradient'> + Agregar Compra</button>
            <Modal
                show={lgShow}
                onHide={() => setLgShow(false)}
                size='xl'
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        Registre los datos aqui:
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <table className='table table-secondary table-striped'>
                        <thead>
                            <tr>
                                <th scope={'col'}>SINIIIGA</th>
                                <th scope={'col'}>ETAPA REP.</th>
                                <th scope={'col'}>GUIA</th>
                                <th scope={'col'}>REMO</th>
                                <th scope={'col'}>ORIGEN</th>
                                <th scope={'col'}>PROPIETARIO</th>
                                <th scope={'col'}>CONSIGNADO</th>
                                <th scope={'col'}>OBSERVACION</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><input name='siniga' style={{width: '120px'}} type={'text'} /></td>
                                <td><input name='etapa' style={{width: '120px'}} type={'text'} /></td>
                                <td><input name='guia' style={{width: '120px'}} type={'text'} /></td>
                                <td><input name='remo' style={{width: '120px'}} type={'text'} /></td>
                                <td><input name='origen' style={{width: '120px'}} type={'text'} /></td>
                                <td><input name='propietario' style={{width: '120px'}} type={'text'} /></td>
                                <td><input name='consignado' style={{width: '120px'}} type={'text'} /></td>
                                <td><input name='observacion' style={{width: '120px'}} type={'text'} /></td>
                            </tr>
                        </tbody>
                    </table>
                    
                </Modal.Body>
            </Modal>
            <div className='m-4 p-2 d-flex justify-content-around'>
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
                            <th scope={'col'}>OBSERVACION</th>
                            <th scope={'col'}>FECHA DE COMPRA</th>
                        </tr>
                    </thead>
                    <tbody>


                        {view.ganado?.map((item) => {
                            return item.comprado ? <tr>

                                <td className='p-2 m-2'>{item.siniiiga}</td>
                                <td className='p-2 m-2'>{item.etapa}</td>
                                <td className='p-2 m-2'>{item.guia}</td>
                                <td className='p-2 m-2'>{item.remo}</td>
                                <td className='p-2 m-2'>{item.origen}</td>
                                <td className='p-2 m-2'>{item.propietario}</td>
                                <td className='p-2 m-2'>{item.consignado}</td>
                                <td className='p-2 m-2'>{item.observacion}</td>
                                <td className='p-2 m-2'>{item.createdAt}</td>

                            </tr> : null
                        })}
                    </tbody>
                </table>
            </div>
            <h1 className='m-4 text-light'>SALIDA</h1>
            <button type='button' className='m-4 btn btn-primary bg-gradient'> + Agregar Salida</button>

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


                        {view.ganado?.map((item) => {
                            return item.comprado ? null : <tr>

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
            </div>

        </>
    )
}

export default IndRanch