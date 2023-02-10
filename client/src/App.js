import './App.css';
import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import OneRanch from './pages/indRancho'
import UserPage from './pages/user-page'
import Auth from '../src/utils/auth'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import AllCows from './pages/allGanado'
import AllSalidas from './pages/allSalidas';

function App() {
  const [show, setShow] = useState(false);

  const [showOther, setOther] = useState(false)

  const [profileId, setProfile] = useState('')

  const [loginForm, setLogin] = useState({ username: '', password: '' })

  const [signUpForm, setSignUp] = useState({ username: '', password: '' })

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value } = e.target
    setLogin({ ...loginForm, [name]: value })
  };

  const handleSignUpChange = (e) => {
    const { name, value } = e.target
    setSignUp({ ...signUpForm, [name]: value })
  }

  const createUser = (e) => {
    e.preventDefault();

    fetch('/api/users', {
      method: 'post',
      body: JSON.stringify(signUpForm),
      headers: { 'Content-Type' : 'application/json'}
    }).then(response => response.json())
    .then((newUser) => {
      Auth.login(newUser.token)
    })
  }

  const getDataNew = () => {
    setProfile(Auth.getProfile().data._id)
  };

  const handleLogin = (e) => {
    e.preventDefault();

    fetch('/login', {
      method: 'post',
      body: JSON.stringify(loginForm),
      headers: { 'Content-Type': 'application/json' }
    }).then(response =>
      response.json()
    ).then((result) => {

      Auth.login(result.token)
    })


  }



  return (
    <>
      <div className="App">
        <h1 className='text-light fonter'> Live-Check</h1>
        {Auth.loggedIn() ? <div>
          <button type='button' onClick={Auth.logout} className='btn bg-gradient text-light jober m-2'>Cerrar Sesion</button>
          <a href={`/users/${profileId}`}>
            <button type='button' onClick={getDataNew} className='btn bg-gradient text-light jober m-2'>Ver Perfil</button>
          </a> </div> : <div>
          <button onClick={handleShow} type='button' className='btn bg-gradient text-light jober'>Iniciar Sesion</button>
          <br></br>
          <p className='m-2 text-light' onClick={() => setOther(true)} >Crear usuario nuevo</p>
          </div>
          }
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            Inicia Sesion:
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Nombre de usuario</Form.Label>
                <Form.Control
                  type="text"
                  autoFocus
                  name='username'
                  onChange={handleChange}
                  value={loginForm.username}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type='password' name='password' onChange={handleChange} value={loginForm.password} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleLogin}>
              Iniciar Sesion
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showOther} onHide={() => setOther(false)}>
          <Modal.Header closeButton>
            Crea tu usuario:
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Nombre de usuario</Form.Label>
                <Form.Control
                  type="text"
                  autoFocus
                  placeholder={'Debe ser unico'}
                  name='username'
                  onChange={handleSignUpChange}
                  value={signUpForm.username}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type='password' name='password' 
                onChange={handleSignUpChange} 
                value={signUpForm.password} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={createUser}>
              Crear tu cuenta
            </Button>
          </Modal.Footer>
        </Modal>



      </div>
      <Router>
        <Switch>
          <Route exact path='/ranchos/:id' component={OneRanch}></Route>
          <Route exact path='/users/:id' component={UserPage}></Route>
          <Route exact path='/ranchos/:id/ganado' component={AllCows}></Route>
          <Route exact path='/ranchos/:id/salidas' component={AllSalidas}></Route>
        </Switch>
      </Router>
    </>

  );
}

export default App;
