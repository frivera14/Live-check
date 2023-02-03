import React from 'react';
import { useState } from 'react';


function IndRanch() {
    const link = ''

    const [view, setView] = useState([])

    const getData = () => {
        fetch(link)
        .then(res => res.json())
        .then((data) => setView(data))
    }
    return (
        <>
            {getData()}

            <h1>{view.ranchName}</h1>
            <div className='m-4 p-2 d-flex justify-content-around column-gap-3'>

                <table className='table table-secondary table-striped'>
                    <thead>
                        <tr>
                            <th scope={'col'}>Nombre</th>
                            <th scope={'col'}>Kilos de Alimento</th>
                            <th scope={'col'}>Cabezas de Ganado</th>
                        </tr>
                    </thead>
                    <tbody>


                        {view.ganado?.map((item) => {
                            return <tr>

                                <td className='p-2 m-2'><a href={'https://www.google.com'} target={'_blank'} rel={'noreferrer'}>{item.ranchName}</a></td>
                                <td className='p-2 m-2'>{item.alimento}</td>
                                <td className='p-2 m-2'>{item.ganado.length}</td>

                            </tr>
                        })}
                    </tbody>
                </table>
                <table className='table table-secondary table-striped'>
                    <thead>
                        <tr>
                            <th scope={'col'}>Nombre</th>
                            <th scope={'col'}>Kilos de Alimento</th>
                            <th scope={'col'}>Cabezas de Ganado</th>
                        </tr>
                    </thead>
                    <tbody>


                        {view.salidas?.map((item) => {
                            return <tr>

                                <td className='p-2 m-2'><a href={'https://www.google.com'} target={'_blank'} rel={'noreferrer'}>{item.ranchName}</a></td>
                                <td className='p-2 m-2'>{item.alimento}</td>
                                <td className='p-2 m-2'>{item.ganado.length}</td>

                            </tr>
                        })}
                    </tbody>
                </table>
            </div>

        </>
    )
}

export default IndRanch