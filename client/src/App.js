import './App.css';
import React, { useState, useRef } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import OneRanch from './pages/indRancho'
import UserPage from './pages/user-page'
import Auth from '../src/utils/auth'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Offcanvas from 'react-bootstrap/Offcanvas'
import Button from 'react-bootstrap/Button'
import AllCows from './pages/allGanado'
import AllSalidas from './pages/allSalidas';

function App() {
  const [show, setShow] = useState(false);

  const profileId = useRef('')

  const [showOther, setOther] = useState(false);

  const [canvas, setCanvas] = useState(false);

  const [loginForm, setLogin] = useState({ username: '', password: '' });

  const [signUpForm, setSignUp] = useState({ username: '', password: '' });

  React.useEffect(() => {
    profileId.current = Auth.loggedIn() ? Auth.getProfile().data._id : ''
  }, [])


  const handleChange = (e) => {
    const { name, value } = e.target
    setLogin({ ...loginForm, [name]: value })
  };

  const handleSignUpChange = (e) => {
    const { name, value } = e.target
    setSignUp({ ...signUpForm, [name]: value })
  };

  const createUser = (e) => {
    e.preventDefault();

    fetch('/api/users', {
      method: 'post',
      body: JSON.stringify(signUpForm),
      headers: { 'Content-Type': 'application/json' }
    }).then(response => response.json())
      .then((newUser) => {
        Auth.login(newUser.token)
      })
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


  };



  return (
    <>
      <div className="App">
        <div className='d-flex justify-content-center'>
        <h1>Live-Check</h1>
        <h1 className='m-1 text-danger inventada'>Ʊ</h1>

        </div>
        {Auth.loggedIn() ? <div>
          <button style={{color: '#B68D40', textDecoration: 'underline'}} type='button' onClick={Auth.logout} className='btn jober m-2'>Cerrar Sesion</button>

          <button style={{color: '#B68D40', textDecoration: 'underline'}} type='button' onClick={() => setCanvas(true)} className='btn jober m-2'>Ver Ranchos</button>
        </div> : <div>
          <button style={{color: '#B68D40', textDecoration: 'underline'}} onClick={() => setShow(true)} type='button' className='btn jober'>Iniciar Sesion</button>
          <br></br>
          <p className='m-2 ' onClick={() => setOther(true)} >Crear usuario nuevo</p>
        </div>
        }

        <Offcanvas style={{backgroundColor: '#292827'}} show={canvas} onHide={() => setCanvas(false)}>
          <Offcanvas.Header closeButton closeVariant='white'>

          </Offcanvas.Header>
          <Offcanvas.Body>
            <UserPage profileId={profileId.current}></UserPage>
          </Offcanvas.Body>
        </Offcanvas>

        <Modal show={show} onHide={() => setShow(false)}>
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
          <Route exact path='/ranchos/:id/ganado' component={AllCows}></Route>
          <Route exact path='/ranchos/:id/salidas' component={AllSalidas}></Route>
        </Switch>
      </Router>
    </>

  );
}

export default App;
