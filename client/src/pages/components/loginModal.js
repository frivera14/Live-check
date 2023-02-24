import React from 'react';
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form';
import Auth from '../../utils/auth';

function LoginModal() {
    const [loginForm, setLogin] = React.useState({ username: '', password: '' });

    const handleChange = (e) => {
        const { name, value } = e.target
        setLogin({ ...loginForm, [name]: value })
      };
     
      const handleLogin = (e) => {
        e.preventDefault();
    
        fetch('/login', {
          method: 'post',
          body: JSON.stringify(loginForm),
          headers: { 'Content-Type': 'application/json' }
        }).then(response =>
          response.json()
        ).then((result) => 
        Auth.login(result.token)
        );
      };


    return (
        <>
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
            <button className="btn btn-primary" onClick={handleLogin}>
              Iniciar Sesion
            </button>
          </Modal.Footer>
        </>
    )
}

export default LoginModal