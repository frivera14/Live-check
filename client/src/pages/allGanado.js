import React, { useState } from 'react';
import Auth from '../utils/auth'

function AllCows() {

    const ranchId = window.location.pathname.split('/')

    const [viewCows, setView] = useState([])

    const [ranchData, setRanch] = useState([])

    React.useEffect(() => {
        fetch(`/api/ranchos/${ranchId[2]}`)
            .then(res => res.json())
            .then((data) => {
                const vacas = data.ganado.reverse()
                setRanch(data)
                setView(vacas)
            })
    })

    return (
        <>
            {Auth.getToken() && Auth.getProfile().data._id === ranchData.owner ? <>
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
                            {viewCows.map((item) => {
                                return item.comprado ?
                                    <>
                                        <tr>

                                            <td className='p-2 m-2'>{item.siniiiga}</td>
                                            <td className='p-2 m-2'>{item.etapa}</td>
                                            <td className='p-2 m-2'>{item.guia}</td>
                                            <td className='p-2 m-2'>{item.remo}</td>
                                            <td className='p-2 m-2'>{item.origen}</td>
                                            <td className='p-2 m-2'>{item.propietario}</td>
                                            <td className='p-2 m-2'>{item.consignado}</td>
                                            <td className='p-2 m-2'>{item.observacion}</td>
                                            <td className='p-2 m-2'>{item.createdAt}</td>

                                        </tr>
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