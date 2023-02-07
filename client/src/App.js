import './App.css';
import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import OneRanch from './pages/indRancho'
import UserPage from './pages/user-page'
import Auth from '../src/utils/auth'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function App() {
  const [show, setShow] = useState(false);
  // const check = 'check'
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="App">
        <h1 className='text-light fonter'> Live-Check</h1>
        {Auth.loggedIn() ? <div>
          <button type='button' className='btn bg-gradient text-light jober m-2'>Cerrar Sesion</button>
          <a href={`/users/63e144c1c22132f774198807`}>
            <button type='button' className='btn bg-gradient text-light jober m-2'>Ver Perfil</button>
          </a> </div> : <button onClick={handleShow} type='button' className='btn bg-gradient text-light jober'>Iniciar Sesion</button>}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Nombre de usuario</Form.Label>
                <Form.Control
                  type="text"
                  autoFocus
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type='password' />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
              Iniciar Sesion
            </Button>
          </Modal.Footer>
        </Modal>



      </div>
      <Router>
        <Switch>
          <Route exact path='/ranchos/:id' component={OneRanch}></Route>
          <Route exact path='/users/:id' component={UserPage}></Route>
        </Switch>
      </Router>
    </>

  );
}

export default App;
