import React from 'react';
import { tickFormat } from '../utils/dateFormat';
import { AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import Auth from '../utils/auth'
import { deReversa } from '../utils/helpers';
import GastoStat from './components/gastoStat';
import IndividualWrapper from './components/indWrapper';

function Gastos() {

    const url = window.location.pathname.split('/')

    const [otherData, setOther] = React.useState([])

    const [update, setUpdate] = React.useState(false)

    const [newArr, setNew] = React.useState([])

    const [editAll, setEditAll] = React.useState(false)

    const [deleteBtn, setDelete] = React.useState(false)

    const [gastoData, setGasto] = React.useState({ name: '', cantidad: '', fecha: '' })

    React.useEffect(() => {
        fetch(`/api/ranchos/${url[2]}`)
            .then(res => res.json())
            .then((data) => {
                setOther(data)
                setNew(data.gastos)
            })
    }, [update || editAll || deleteBtn])

    const createGraph = (
        <>
            <AreaChart
                width={500}
                height={350}
                baseValue={0}
                data={newArr.sort(deReversa)}>
                <XAxis type='category' dataKey={'fecha'} tickFormatter={(tick) => tickFormat(tick)} />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="cantidad" stroke="#59981A" fill="#59981A" />
            </AreaChart>
        </>
    )

    const editHandler = () => {
        if (editAll) {
            setEditAll(false)
        } else {
            setEditAll(true)
        }
    };

    const deleteHandler = () => {
        if (deleteBtn) {
            setDelete(false)
        } else {
            setDelete(true)
        }
    }

    const handleChange = (e) => {
        e.preventDefault();
        setUpdate(false)
        const { name, value } = e.target;
        setGasto({ ...gastoData, [name]: value })
    }

    const handleSubtract = () => {
        const subtract = gastoData.cantidad * (-1)
        gastoData.cantidad = subtract;
        enterGasto()
    }

    const enterGasto = () => {
        fetch(`/api/ranchos/${url[2]}/gastos`, {
            method: 'post',
            body: JSON.stringify(gastoData),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then(() => {
                setUpdate(true)
                setGasto({ name: '', cantidad: '', fecha: '' })
            })
    }

    const functionObject = {
        setFalse: () => setDelete(false),
        setTrue: () => setDelete(true)
    }

    return (
        <>
            {Auth.getToken() && Auth.getProfile().data._id === otherData.owner ?

                <div className='container'>
                    <a style={{ color: '#4B4848', textDecoration: 'none' }} href={`/ranchos/${otherData._id}`}>
                        <h3 className='mt-3 d-flex justify-content-center'>{otherData.ranchName}</h3>
                    </a>
                    <div className='d-flex justify-content-center mt-3 input-group'>
                        <input name={'name'} value={gastoData.name} onChange={handleChange} className='form-control' placeholder={'Descripcion:'} style={{ maxWidth: '300px' }} type={'text'} />
                        <input name={'cantidad'} value={gastoData.cantidad} onChange={handleChange} className='form-control' placeholder={'Total:'} style={{ maxWidth: '150px' }} type={'text'} />
                        <input name={'fecha'} formTarget={'dd/mm/yyyy'} value={gastoData.fecha} onChange={handleChange} className='form-control' placeholder={'Fecha'} style={{ maxWidth: '150px' }} type={'date'} />
                    </div>
                    <div className='d-flex justify-content-center mt-2'>
                        <button onClick={enterGasto} className='btn btn-lg btn-outline-success m-2'>Agregar + </button>
                        <button onClick={handleSubtract} className='btn btn-lg btn-outline-danger m-2'>Descontar -  </button>
                    </div>
                    <div className='d-flex justify-content-center'>
                        {createGraph}
                    </div>
                    <div className='d-flex m-4 justify-content-between'>
                        <button onClick={editHandler} className='btn text-light btn-warning'>{editAll ? <>Listo</> : <>Editar</>}</button>
                        <button onClick={deleteHandler}className='btn btn-danger'>Borrar</button>
                    </div>
                    <div className='m-4 p-2 d-flex  justify-content-around'>
                        {/* Table component goes here */}
                        <table className='table table-light mt-2'>
                            <thead style={{ backgroundColor: '#122620', color: 'white' }} className='table'>
                                <tr>
                                    <th scope={'col'}>Descripcion</th>
                                    <th scope={'col'}>Monto</th>
                                    <th scope={'col'}>Fecha</th>
                                </tr>
                            </thead>
                            <tbody>
                                {editAll ? <>
                                    <IndividualWrapper item={newArr} ranchId={url[2]}></IndividualWrapper>
                                </> :
                                    <><GastoStat item={newArr} deleteBtn={deleteBtn} ranchId={url[2]} functionObject={functionObject}></GastoStat></>}
                            </tbody>
                        </table>
                    </div>
                </div>
                : <h3 className='m-4'>No tienes accesso a estos datos</h3>}
        </>
    )
}

export default Gastos