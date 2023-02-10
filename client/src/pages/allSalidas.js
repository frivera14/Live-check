import React, { useState, useEffect } from 'react';
import Auth from '../utils/auth'

function AllSalidas() {

    const ranchId = window.location.pathname.split('/')

    const [viewCows, setView] = useState([])

    const [ranchData, setRanch] = useState([])

    const [buttonValue, setValue] = useState('↓')

    useEffect(() => {
        fetch(`/api/ranchos/${ranchId[2]}`)
            .then(res => res.json())
            .then((data) => {
                const cows = data.ganado.reverse()
                setRanch(data)
                return setView(cows)
            })
    }, []);

    const handleSwitch = () => {
        buttonValue === '↓' ? setValue('↑') : setValue('↓')
        return viewCows.reverse()
    }


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
                                <th scope={'col'}>DESTINO</th>
                                <th scope={'col'}>CONSIGNADO</th>
                                <th scope={'col'}>PROPIETARIO</th>
                                <th scope={'col'}>FECHA DE VENTA</th>
                                <button className='btn btn-dark' onClick={handleSwitch}>{buttonValue}</button>
                            </tr>
                        </thead>
                        <tbody>
                            {viewCows.map((item) => {
                                return !item.comprado ?
                                    <>
                                        <tr>

                                            <td className='p-2 m-2'>{item.siniiiga}</td>
                                            <td className='p-2 m-2'>{item.etapa}</td>
                                            <td className='p-2 m-2'>{item.guia}</td>
                                            <td className='p-2 m-2'>{item.remo}</td>
                                            <td className='p-2 m-2'>{item.origen}</td>
                                            <td className='p-2 m-2'>{item.propietario}</td>
                                            <td className='p-2 m-2'>{item.consignado}</td>
                                            <td className='p-2 m-2'>{item.createdAt}</td>

                                        </tr>
                                    </>
                                    : null

                            })}


                        </tbody>
                    </table>
                </div>

            </> :
                <>
            <h3 className='text-light m-4'>No tienes accesso a estos datos</h3>
                </>}

        </>
    )
}

export default AllSalidas