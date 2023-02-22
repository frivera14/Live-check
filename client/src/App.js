import './App.css';
import React, { useState, useRef } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal'
import Offcanvas from 'react-bootstrap/Offcanvas'
import Auth from '../src/utils/auth'
import OneRanch from './pages/indRancho'
import UserPage from './pages/user-page'
import AllCows from './pages/allGanado'
import AllSalidas from './pages/allSalidas';
import GanadoMuerto from './pages/GanadoMuerto';
import Gastos from './pages/gastos';
import SignUpModal from './pages/components/signupModal';
import LoginModal from './pages/components/loginModal';

function App() {
  const [show, setShow] = useState(false);

  const profileId = useRef('')

  const [showOther, setOther] = useState(false);

  const [canvas, setCanvas] = useState(false);

  React.useEffect(() => {
    profileId.current = Auth.loggedIn() ? Auth.getProfile().data._id : ''
  }, [])

  return (
    <>
      <div className="App">
        <div className='d-flex justify-content-center'>
        <h1 className='m-1'>🐄🚜</h1>
        </div>
        {Auth.loggedIn() ? <div className='d-flex justify-content-center'>
          <button type='button' onClick={() => setCanvas(true)} className='btn sandBoton m-2'>Lista de Ranchos</button>
          <button type='button' onClick={Auth.logout} className='btn sandBoton m-2'>Cerrar Sesion</button>
        </div> : <div className='d-flex justify-content-center'>
          <button onClick={() => setShow(true)} type='button' className='btn sandBoton m-2'>Iniciar Sesion</button>
          <br></br>
          <button onClick={()=> setOther(true)} type='button' className='btn sandBoton m-2'>Crear Usuario Nuevo</button>
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
         <LoginModal></LoginModal>
        </Modal>

        <Modal show={showOther} onHide={() => setOther(false)}>
          <SignUpModal></SignUpModal>
        </Modal>
      </div>

      <Router>
        <Switch>
          <Route exact path='/ranchos/:id' component={OneRanch}></Route>
          <Route exact path='/ranchos/:id/ganado' component={AllCows}></Route>
          <Route exact path='/ranchos/:id/salidas' component={AllSalidas}></Route>
          <Route exact path='/ranchos/:id/muertos' component={GanadoMuerto}></Route>
          <Route exact path='/ranchos/:id/gastos' component={Gastos}></Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
