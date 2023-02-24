import React from 'react';
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form';
import Auth from '../../utils/auth'

function SignUpModal() {

    const [signUpForm, setSignUp] = React.useState({ username: '', password: '' });

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

    return (
        <>
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
            <button className="btn btn-primary" onClick={createUser}>
              Crear tu cuenta
            </button>
          </Modal.Footer>
        </>
    )
}

export default SignUpModal