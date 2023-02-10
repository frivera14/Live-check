import React,  { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'

function UserPage() {
    let url = window.location.pathname
    let eluser = url.split('/users/')

    let query = `/api/users/${eluser[1]}`

    const [show, setShow] = useState(false)

    const [formData, setFormData] = useState({ ranchName: '', alimento: '', diesel: '', owner: eluser[1]})

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value})
    }

    const [view, setView] = useState([])

    useEffect(() => {
        fetch(query)
       .then(res => res.json())
       .then((data) => setView(data))
    }, [])

    const makeRanch = (e) => {
        e.preventDefault();

        fetch(query, {
            method: "post",
            body: JSON.stringify(formData),
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .then(() => window.location.reload())
     }

    return (
        <>

            <div className='m-4'>

                <button type='button' onClick={() => setShow(true)} className='btn btn-primary mb-2'>+ Agregar Rancho</button>
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
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header>

                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
                            <Form.Label>Nombre del Rancho:</Form.Label>
                                <Form.Control
                                type='text'
                                autoFocus
                                name='ranchName'
                                onChange={handleChange}
                                value={formData.ranchName}
                                />
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
                            <Form.Label>Kilos de Alimento Actuales:</Form.Label>
                                <Form.Control
                                type='text'
                                name='alimento'
                                onChange={handleChange}
                                value={formData.alimento}
                                />
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
                            <Form.Label>Galones o Litros de Diesel</Form.Label>
                                <Form.Control
                                type='text'
                                name='diesel'
                                onChange={handleChange}
                                value={formData.diesel}
                                />
                        </Form.Group>
                        <button type='button' onClick={makeRanch} className='btn btn-dark'>Registrar Rancho</button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}


export default UserPage