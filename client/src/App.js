import logo from './logo.svg';
import './App.css';
import React from 'react'

function App() {

  return (
    <>
    <div className="App bg-success p-2">
      <h1 className='text-light fonter'> Live-Check</h1>
    <button type='button' className='btn bg-gradient text-light jober'> Login</button>
    </div>
    <div className='mt-5 text-center'>
    <img className='img-fluid  rounded mx-auto'  src={ require('../src/torito.png')} alt='something' />
    </div>
    </>
  );
}

export default App;
