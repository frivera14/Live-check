import React,  { useEffect, useState } from 'react';


function UserPage() {
    let url = window.location.pathname
    let eluser = url.split('/users/')

    let query = `/api/users/${eluser[1]}`


    const [view, setView] = useState([])

    useEffect(() => {
        fetch(query)
       .then(res => res.json())
       .then((data) => setView(data))
    })

    return (
        <>

            <div className='m-4'>

                <table className='table table-secondary table-striped'>
                    <thead className='table-dark'>
                        <tr>
                            <th scope={'col'}>Rancho</th>
                            <th scope={'col'}>Kilos de Alimento</th>
                            <th scope={'col'}>Diesel</th>
                        </tr>
                    </thead>
                    <tbody>


                        {view.ranchos?.map((item) => {
                            return <tr>

                                <td className='p-2 m-2'><a href={`/ranchos/${item._id}`}>{item.ranchName}</a></td>
                                <td className='p-2 m-2'>{item.alimento} Kilos</td>
                                <td className='p-2 m-2'>{item.diesel} Litros</td>

                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}


export default UserPage