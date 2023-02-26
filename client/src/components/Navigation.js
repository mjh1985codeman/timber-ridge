import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Navigation = (props) => {

  return (
    <>
     <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
     <Navbar.Toggle aria-controls="responsive-navbar-nav" />
     <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="me-auto">
       {props.children}
      </Nav>
      </Navbar.Collapse>
      </Container>
     </Navbar>
    </>
  );
};

export default Navigation;
