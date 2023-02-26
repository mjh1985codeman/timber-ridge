import React from 'react'
import Nav from 'react-bootstrap/Nav';

export default function NavItem(props) {
  return (
        <Nav.Link href={props.to} className="nav-icon">
            {props.text}
        </Nav.Link>
  )
}
