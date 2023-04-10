import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import { useMutation } from '@apollo/client';
import { Container } from 'react-bootstrap';
import { ADD_PROPERTY } from '../controllers/mutations';
import Loading from '../components/Loading';
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
  const [imageNames, setImageNames] = useState([]);

  //mutation. 
  const [addProperty, {data, loading, error}] = useMutation(ADD_PROPERTY);
  

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
    console.log(value);
    if (name === 'reserveReady') {
      console.log(typeof(value));
        return setReserveReady(value)
    } else if (name === 'available') {
      console.log(typeof(value));
        return setAvailable(value)
    };
  }
  
  async function handleFileUpload (e){
    e.preventDefault();
    const image = e.target.files[0];
    const imageName = image.name;
    const convertedImage = await base64.convertToBase64(image);
    propImages.push(convertedImage);
    //Use this syntax to force the component to re-render immediately as it detects a change. 
    setImageNames(imageNames => [...imageNames, imageName]);
}

  async function handleSubmit(e) {
      // Prevent the browser from reloading the page
      e.preventDefault();
      console.log('reserveReady On Submit: ' , reserveReady);
      console.log('available upon submit', available);
      console.log('propImages Array upon Submit: ' , propImages);
      //LOGIC TO ADD THE PROPERTY. 
      const propObj = {
        name: propName,
        //hardcoding reserved to false for now. 
        reserved: false,
        reserveCost: JSON.parse(reserveCost),
        addressSt: addressSt,
        city: propCity,
        state: propState,
        zip: propZip,
        pictures: propImages,
        readyToReserve: JSON.parse(reserveReady),
        available: JSON.parse(available)
      };

      console.log(propObj);
      //Mutation being called and the propObj being passed in as the variables. 
      await addProperty({
        variables: {
          name: propObj.name,
          reserved: propObj.reserved,
          reserveCost: propObj.reserveCost,
          addressSt: propObj.addressSt,
          city: propObj.city,
          state: propObj.state,
          zip: propObj.zip,
          pictures: propObj.pictures,
          readyToReserve: propObj.readyToReserve,
          available: propObj.available
        }
      });
      console.log('loading' , loading);
      if(loading) return <Loading/>;
      if(error) return `Property Add Error. . .${error.message}`;
      console.log('data' , data);

      //resetting state.
      setPropImages([]);
      setImageNames([]);
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
          <select className='calinput' type="text" name="propState" value={propState} onChange={handleInputChange}>
	          <option value="AL">Alabama</option>
	          <option value="AK">Alaska</option>
	          <option value="AZ">Arizona</option>
	          <option value="AR">Arkansas</option>
	          <option value="CA">California</option>
	          <option value="CO">Colorado</option>
	          <option value="CT">Connecticut</option>
	          <option value="DE">Delaware</option>
	          <option value="DC">District Of Columbia</option>
	          <option value="FL">Florida</option>
	          <option value="GA">Georgia</option>
	          <option value="HI">Hawaii</option>
	          <option value="ID">Idaho</option>
	          <option value="IL">Illinois</option>
	          <option value="IN">Indiana</option>
	          <option value="IA">Iowa</option>
	          <option value="KS">Kansas</option>
	          <option value="KY">Kentucky</option>
	          <option value="LA">Louisiana</option>
	          <option value="ME">Maine</option>
	          <option value="MD">Maryland</option>
	          <option value="MA">Massachusetts</option>
	          <option value="MI">Michigan</option>
	          <option value="MN">Minnesota</option>
	          <option value="MS">Mississippi</option>
	          <option value="MO">Missouri</option>
	          <option value="MT">Montana</option>
	          <option value="NE">Nebraska</option>
	          <option value="NV">Nevada</option>
	          <option value="NH">New Hampshire</option>
	          <option value="NJ">New Jersey</option>
	          <option value="NM">New Mexico</option>
	          <option value="NY">New York</option>
	          <option value="NC">North Carolina</option>
	          <option value="ND">North Dakota</option>
	          <option value="OH">Ohio</option>
	          <option value="OK">Oklahoma</option>
	          <option value="OR">Oregon</option>
	          <option value="PA">Pennsylvania</option>
	          <option value="RI">Rhode Island</option>
	          <option value="SC">South Carolina</option>
	          <option value="SD">South Dakota</option>
	          <option value="TN">Tennessee</option>
	          <option value="TX">Texas</option>
	          <option value="UT">Utah</option>
	          <option value="VT">Vermont</option>
	          <option value="VA">Virginia</option>
	          <option value="WA">Washington</option>
	          <option value="WV">West Virginia</option>
	          <option value="WI">Wisconsin</option>
	          <option value="WY">Wyoming</option>
          </select>
      </Form.Label>
      <Form.Label className='formlabel'>
          <h3>Zip Code</h3>
          <input className='calinput' type="number" name="propZip" value={propZip} onChange={handleInputChange}/>
      </Form.Label>
      <Form.Label className='formlabel'>
        <h3>Cost to Reserve this Property</h3>
        <input className='calinput' type="number" name="reserveCost" value={reserveCost} onChange={handleInputChange}/>
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
        <h3>Upload Property Images</h3>  
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
      <div>
        {imageNames.map(img => (
          <h5 key={img}>{img}</h5>
        ))}
      </div>  
    <Button type="submit">Submit New Property</Button>
  </Form.Group>
  </Form> 
  </Container>
  </>
  )
}