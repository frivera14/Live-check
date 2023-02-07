import './App.css';
import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import OneRanch from './pages/indRancho'
import UserPage from './pages/user-page'

function App() {

  return (
    <>
    <div className="App">
      <h1 className='text-light fonter'> Live-Check</h1>
    <button type='button' className='btn bg-gradient text-light jober'>Iniciar Sesion</button>
   <a href={`/users/63e144c1c22132f774198807`}>
    <button type='button' className='btn bg-gradient text-light jober m-2'>Ver Perfil</button>
    </a> 
    </div>
    <Router>
      <Switch>
        <Route exact path ='/ranchos/:id' component={OneRanch}></Route>
        <Route exact path ='/users/:id' component={UserPage}></Route>
      </Switch>
    </Router>
    </>

  );
}

export default App;
