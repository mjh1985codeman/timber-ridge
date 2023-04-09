//This component serves as the list of properties and the ability to upload new properties.
import React, {useState} from 'react';
import {Container} from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import { useNavigate } from "react-router-dom";
const {GET_PROPERTIES} = require('../controllers/queries');


export default function Properties(props) {
  const navigate = useNavigate();

  function GetProperties() {
    const propData = useQuery(GET_PROPERTIES);
    if(propData.data) {
      const propArray = propData.data.getProperties;
      console.log(propArray);
      console.log('props' , props);
        return<>
        <div className='propertylist'>
        {propArray.map(property => (
        <div key={property.id} className='propertyCard'>
        <h2>{property.name}</h2>
        <h5>{property.addressSt}</h5> 
        <h5>{property.city}, {property.state} {property.zip}</h5>
        </div>  
        ))}
        </div>  
        </>
    
    } else {
      return <div>Loading. . .</div>
    };
  };

  function RedirectToAddProperty() {
    navigate("/properties/addproperty");
  }

  return (
    <>
    <Container>  
    <div>Upload Property</div>
    {GetProperties()}
    <button type='click' onClick={RedirectToAddProperty}>Add a Property</button>
    </Container>    
    </>
  )
}
