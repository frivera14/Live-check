import React from 'react';
import {useState} from 'react'


function UserPage() {

   const [view, setView] = useState([]) 

  const getData =() => { fetch('/api/users/63d94c53325bc15be2104f4f')
   .then(res => res.json())
   .then((data) => setView(data))}

    return(
        <>
        {getData()}
        <div className='m-4'>

        <table className='table table-secondary table-striped'>
            <thead>
                <tr>
                    <th scope={'col'}>Nombre</th>
                    <th scope={'col'}>Kilos de Alimento</th>
                    <th scope={'col'}>Cabezas de Ganado</th>
                </tr>
            </thead>
            <tbody>


        {view.ranchos?.map((item) => {
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


export default UserPage