import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import { Container } from 'react-bootstrap';
const base64 = require('../helpers/base64');

export default function Property() {
  const navigate = useNavigate();
  const [propName, setPropName] = useState("");
  const [addressSt, setAddressSt] = useState("");
  const [propCity, setPropCity] = useState("");
  const [propState, setPropState] = useState("");
  const [propZip, setPropZip] = useState("");
  const [reserveCost, setReserveCost] = useState("");
  const [reserveReady, setReserveReady] = useState(false);
  const [available, setAvailable] = useState(false);
  const [propImages, setPropImages] = useState([]);

  function handleInputChange(e) {
      e.preventDefault();
      
      const {name, value} = e.target;

      if(name === 'propName') {
          return setPropName(value);
      } else if (name === 'addressSt') {
          return setAddressSt(value);
      } else if (name === 'propCity') {
          return setPropCity(value);
      } else if (name === 'propState') {
          return setPropState(value)
      }
      else if (name === 'propZip') {
          return setPropZip(value)
      }
      else if (name === 'reserveCost') {
          return setReserveCost(value)
      };
  }

  function handleRadioInputChange(e) {
    const {name, value} = e.target;
    if (name === 'reserveReady') {
        return setReserveReady(value)
    } else if (name === 'available') {
        return setAvailable(value)
    };
  }

  async function handleFileUpload (e){
    const image = e.target.files[0];
    const convertedImage = await base64.convertToBase64(image);
    propImages.push(convertedImage);
    console.log("propImages Array upon Upload: " , propImages);
}

  function handleSubmit(e) {
      // Prevent the browser from reloading the page
      e.preventDefault();
      console.log('reserveReady On Submit: ' , reserveReady);
      console.log('available upon submit', available);
      console.log('propImages Array upon Submit: ' , propImages);
      navigate("/properties");
      //resetting state.
      setPropImages([]);
    };
  return (
    <>
    <Container>
    <Form className='formstyle' onSubmit={handleSubmit}>
    <Form.Group className='formcontent'>
      <Form.Label className='formlabel'>
        <h3>Property Name</h3>
        <input className='calinput'type="text" name="propName" value={propName} onChange={handleInputChange}/>
      </Form.Label>
      <Form.Label className='formlabel'>
          <h3>Street Address</h3>
          <input className='calinput' type="text" name="addressSt" value={addressSt} onChange={handleInputChange}/>
      </Form.Label>
      <Form.Label className='formlabel'>
          <h3>City</h3>
          <input className='calinput' type="text" name="propCity" value={propCity} onChange={handleInputChange}/>
      </Form.Label>
      <Form.Label className='formlabel'>
          <h3>State</h3>
          <input className='calinput' type="text" name="propState" value={propState} onChange={handleInputChange}/>
      </Form.Label>
      <Form.Label className='formlabel'>
          <h3>Zip Code</h3>
          <input className='calinput' type="text" name="propZip" value={propZip} onChange={handleInputChange}/>
      </Form.Label>
      <Form.Label className='formlabel'>
        <h3>Cost to Reserve this Property</h3>
        <input className='calinput' type="text" name="reserveCost" value={reserveCost} onChange={handleInputChange}/>
      </Form.Label>
      <Form.Label className='formlabel'>
        <h3>Ready To Reserve?</h3>
        <div className="radioInputDiv">
        <input className='calinput' type="radio" name="reserveReady" value={true} onChange={handleRadioInputChange}/>
        <label>YES</label>
        <input className='calinput' type="radio" name="reserveReady" value={false} onChange={handleRadioInputChange}/>
        <label>NO</label>
        </div>
      </Form.Label>
      <Form.Label className='formlabel'>
        <h3>Available?</h3>
        <div className="radioInputDiv">
        <input className='calinput' type="radio" name="available" value={true} onChange={handleRadioInputChange}/>
        <label>YES</label>
        <input className='calinput' type="radio" name="available" value={false} onChange={handleRadioInputChange}/>
        <label>NO</label>
        </div>
      </Form.Label>
      <label htmlFor="pic-upload">
        <h3>Upload Property Image</h3>  
      <input
        className='hide' 
        type="file"
        label="Image"
        name="propImage"
        id='pic-upload'
        accept='.jpeg, .png, .jpg'
        onChange={(e) => handleFileUpload(e)}
        />
      </label>  
    <Button type="submit">Submit New Property</Button>
  </Form.Group>
  </Form> 
  </Container>
  </>
  )
}