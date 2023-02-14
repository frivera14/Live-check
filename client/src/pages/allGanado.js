import React, { useState, useEffect } from 'react';
import Auth from '../utils/auth'
import { dateFormat } from '../utils/dateFormat';

function AllCows() {

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
                return  setView(cows)
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
                                <button className='btn btn-dark' onClick={handleSwitch}>{buttonValue}</button>
                            </tr>
                        </thead>
                        <tbody>
                            {viewCows.map((item) => {
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

            </> : <>
                <h3 className='m-4 text-light'>No tienes acceso a estos datos</h3>
            </>}
           
        </>
    )
}

export default AllCows