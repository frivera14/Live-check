import './App.css';
import React from 'react'
import UserPage from './pages/user-page'

function App() {

  return (
    <>
    <div className="App">
      <h1 className='text-light fonter'> Live-Check</h1>
    <button type='button' className='btn bg-gradient text-light jober'>Iniciar Sesion</button>
    </div>
    <UserPage />
    </>

  );
}

export default App;
