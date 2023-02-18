import React from 'react'

export default function NavItem(props) {
  return (
    <li className='nav-item'>
        <a href={props.to} className="nav-icon">
            {props.icon}
        </a>
        <h3 className='navText hide'>{props.text}</h3>
    </li>
  )
}
