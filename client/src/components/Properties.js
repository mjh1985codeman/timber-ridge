//This component serves as the list of properties and the ability to upload new properties.
import React, {useState} from 'react';
import {Container} from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import { useNavigate } from "react-router-dom";
import Loading from '../components/Loading.js';
const {GET_PROPERTIES} = require('../controllers/queries');


export default function Properties(props) {
  const navigate = useNavigate();
  //TODO update logic so that Properties is using state to render on the page the correct / react way.
  const [properties, setProperties] = useState([]);

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
        <h2 key={property.id}>{property.name}</h2>
        <h5 key={property.id}>{property.addressSt}</h5> 
        <h5 key={property.id}>{property.city}, {property.state} {property.zip}</h5>
        </div>  
        ))}
        <button type='click' onClick={RedirectToAddProperty}>Add a Property</button>
        </div>  
        </>
    
    
    } else if(propData.loading) {
      return <Loading/>
    } else if (propData.error) {
      return `There was an error loading the Data: ${propData.error}`
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
    </Container>    
    </>
  )
}
