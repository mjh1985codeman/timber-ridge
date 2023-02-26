import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../assets/RTR-logo-transbg.png'

const Navigation = (props) => {

  return (
    <>
     <Navbar className="navigation" collapseOnSelect expand="lg">
      <Container>
     <Navbar.Toggle aria-controls="responsive-navbar-nav" />
     <Navbar.Collapse id="responsive-navbar-nav">
     <Navbar.Brand href="/">
            <img
              src={logo}
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
      <Nav>
       {props.children}
      </Nav>
      </Navbar.Collapse>
      </Container>
     </Navbar>
    </>
  );
};

export default Navigation;