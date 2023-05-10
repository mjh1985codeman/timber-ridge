import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { useMutation } from '@apollo/client';

//Controllers and Helpers.
import { LOGIN } from '../controllers/mutations';
import Auth from '../helpers/auth';
import Validator from '../helpers/validators';

//Components.
import Loading from '../components/Loading';
import Modal from '../components/Modal';

export default function LoginRegisterModal() {
    
    //state things. 
    const [showIncompleteModal, setShowIncompleteModal] = useState(false);
    const [showInvalidLoginModal, setShowInvalidLoginModal] = useState(false);
    const [formClass, setFormClass] = useState("");
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { error }] = useMutation(LOGIN);
    
    const navigate = useNavigate();

    function redirectToRegister() {
      navigate('/register');
    }

    function resetState() {
      setFormState({ email:"" , password:""});
      setShowIncompleteModal(false);
      setShowInvalidLoginModal(false);
      setFormClass("");
      // setUserRole("customer");
      // setUserFirstName("");
      // setUserLastName("");
      // setUserPhone("");
      // setUserEmail("");
      // setUserPassword("");
      // setShowModal(false);
      // setShowPWModal(false);
      // setFormClass("");
    };
    
    const callInvalidLoginModal = () => {
        setFormClass('modal-open');
        setShowInvalidLoginModal(true);
    };

    const callIncompleteModal = () => {
        setFormClass('modal-open');
        setShowIncompleteModal(true);
    };
    
    const handleCloseModal = () => {
        resetState();
    };
  
    const handleFormSubmit = async (event) => {
      event.preventDefault();
      const emailNotEmpty = Validator.notEmpty(formState.email);
      const pwNotEmpty = Validator.notEmpty(formState.password);
  
      if(emailNotEmpty || pwNotEmpty) {
        try {
          const mutationResponse = await login({
            variables: { email: formState.email, password: formState.password },
          });
          console.log('mutationResponse: ' , mutationResponse);
          const token = mutationResponse.data.login.token;
          Auth.login(token);
        } catch (error) {
          callInvalidLoginModal();
        }
      } else {
        callIncompleteModal();
      }
    };
  
    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormState({
        ...formState,
        [name]: value,
      });
    };
  
    return (
      <>
      <Container className='form-container'>
      {showIncompleteModal ? (
      <Modal handleClose={handleCloseModal} className='modalstyle overlay'>
            <h1>All Fields are Required!</h1>
            <h4>Please Verify all fields and try again.</h4>
      </Modal>
      ) : (null)}
      {showInvalidLoginModal ? (
      <Modal handleClose={handleCloseModal} className='modalstyle'>
            <h1>Invalid Username or Password.</h1>
      </Modal>
    ) : (null)}  
        <Form className={formClass} onSubmit={handleFormSubmit}>
          <Form.Group className='formcontent'>
            <Form.Label className='formlabel'>
            <h3>Email</h3> 
            <input
              placeholder="youremail@test.com"
              name="email"
              type="email"
              id="email"
              onChange={handleChange}
            />
            </Form.Label>
            <Form.Label className='formlabel'>
            <h3>Password</h3>
            <input
              placeholder="******"
              name="password"
              type="password"
              id="pwd"
              onChange={handleChange}
            />
            </Form.Label>
          <div className="flex-row flex-end">
            <button type="submit">LOGIN</button>
          </div>
        </Form.Group>  
        </Form>
          <div className='disclaimer' onClick={redirectToRegister}>
          Don't have a Login? Click here to Register!
          </div>
      </Container>
      </>
    );
  }
  