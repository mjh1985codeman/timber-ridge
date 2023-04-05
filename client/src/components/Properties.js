//This component serves as the list of properties and the ability to upload new properties.
import React, {useState} from 'react';
import {Container} from 'react-bootstrap';
import { useQuery } from '@apollo/client';
const base64 = require('../helpers/base64');
const {GET_PROPERTIES} = require('../controllers/queries');


export default function Properties(props) {
  const resObj = props.location.state;
  console.log(resObj);
  const imageArray = [];
  const [propImage, setPropImage] = useState(imageArray);

  function GetProperties() {
    const propData = useQuery(GET_PROPERTIES);
    if(propData.data) {
      const propArray = propData.data.getProperties;
      console.log(propArray);
        return<ul>
                {propArray.map(property => (
                <li key={property._id}>{property.name} -- {property.addressSt} {property.city}, {property.state} {property.zip}</li>
                ))}
              </ul>
    } else {
      return <div>Loading. . .</div>
    };
  };
  
  function handleSubmit(e) {
    e.preventDefault();
    setPropImage(imageArray);
    console.log('propImage on Submit', propImage);
  }


  async function handleFileUpload (e){
      const image = e.target.files[0];
      const convertedImage = await base64.convertToBase64(image);
      imageArray.push(convertedImage);
  }

  return (
    <>
    <Container>  
    <div>Upload Property</div>
    <form onSubmit={handleSubmit}>
      <label htmlFor='pic-upload'>
        <img alt='property pic' />
      </label>

      <input
        type="file"
        label="Image"
        name="propImage"
        id='pic-upload'
        accept='.jpeg, .png, .jpg'
        onChange={(e) => handleFileUpload(e)}
        />
      <button type='submit'>Submit</button>
    </form>
      <div className='propertylist'>
      <h2>Property List:</h2>
        {GetProperties()}
      </div>      
    </Container>    
    </>
  )
}
