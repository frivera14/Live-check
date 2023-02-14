import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'

function UserPage({ profileId }) {

    const [show, setShow] = useState(false)

    const [view, setView] = useState([])

    const apiUrl = `/api/users/${profileId}`

    const [formData, setFormData] = useState({ ranchName: '', ubicacion: '', owner: profileId })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    };

    useEffect(() => {
        fetch(apiUrl)
            .then(res => res.json())
            .then((data) => setView(data))
    }, [apiUrl])

    const makeRanch = (e) => {
        e.preventDefault();
        fetch(apiUrl, {
            method: "post",
            body: JSON.stringify(formData),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then(() => setShow(false))
    }

    return (
        <>

            <div>

                <button type='button' onClick={() => setShow(true)} className='btn btn-success mb-2'>+ Agregar Rancho</button>




                {view.ranchos?.map((item) => {
                    return <>
                        <Card style={{backgroundColor: '#F4EBD0', borderColor: '#59981A'}} text='dark' className='mb-2'>
                            <Card.Header style={{borderColor: '#59981A'}}>

                            <Card.Title>
                                <a style={{ color: '#122620', textDecoration: 'none' }}  href={`/ranchos/${item._id}`}>{item.ranchName}</a>

                            </Card.Title>
                            </Card.Header>
                            <Card.Body style={{ padding: '10px', marginLeft: '8px' }}>
                                Ubicacion:  {item.ubicacion}
                            </Card.Body>
                        </Card>
                    </>
                })}


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
                            <Form.Label>Ubicacion</Form.Label>
                            <Form.Control
                                type='text'
                                name='ubicacion'
                                onChange={handleChange}
                                value={formData.ubicacion}
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