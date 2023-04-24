import React, {useState} from 'react'
import {useParams} from 'react-router-dom';
import {Container} from 'react-bootstrap';
// import Carousel from 'react-bootstrap/Carousel';
import Loading from '../components/Loading';
import { useQuery } from '@apollo/client';
const {GET_PROPERTY_BY_ID} = require('../controllers/queries');

export default function PropertyDetails() {
    //look at the Path on the App.js file for this component to see why we use propertyId here.  
    let { propertyId } = useParams();
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };

    function RedirectToAddReservation() {
        alert(`They want to reserve this property: ` + propertyId);
    }
    function GetProperty({id}) {
        const {loading, error, data} = useQuery(GET_PROPERTY_BY_ID, {
        variables: {id},
        });
        if(data) {
            const property = data.getProperty;
            //const propPics = property.pictures;
            // const propPicsLength = property.pictures.length;
            // console.log("This property has ", propPicsLength, " pictures.");
            // function ShowPictures() {
            //     if(propPicsLength > 0) {
            //         return<>
            //             <Carousel slide={false} key={property._id} activeIndex={index} onSelect={handleSelect}>
            //             {propPics.map(pic => (
            //             <Carousel.Item className="carousel-item">
            //             <img
            //             className="d-block propimg w-100"
            //             src={pic}
            //             alt="A Picture of the property."
            //             />
            //             </Carousel.Item>
            //             ))}    
            //             </Carousel> 
            //             </> 
            //     } else {
            //         return "";
            //     }
            // }
            return<>
            <div className='propertylist'>
            <div key={property._id} className='propertyCard'>
            <h2>{property.name}</h2>
            <h5>{property.addressSt}</h5> 
            <h5>{property.city}, {property.state} {property.zip}</h5>
            </div>
            {/* {ShowPictures()} */}
            <button className="addPropBtn" type='click' onClick={RedirectToAddReservation}>Reserve This Property?</button>
            </div>  
            </>
        } else if(loading) {
            return <div><Loading/></div>;
        } else if (error) {
            return `Error!!! ${error}`;
        }
    };
    return (
        <>
        <Container>  
        <div className='propListDiv'>
        {GetProperty({id: propertyId})}
        </div>
        </Container>    
        </>
    )  
}
