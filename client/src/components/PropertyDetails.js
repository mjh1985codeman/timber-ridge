import React from 'react'
import {useParams} from 'react-router-dom';
import {Container} from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import Loading from '../components/Loading';
import { useQuery } from '@apollo/client';
const {GET_PROPERTY_BY_ID} = require('../controllers/queries');

export default function PropertyDetails() {
    //look at the Path on the App.js file for this component to see why we use propertyId here.  
    let { propertyId } = useParams();
    
    function RedirectToAddReservation() {
        console.log(`They want to reserve this property: ` , propertyId);
    }
    function GetProperty({id}) {
        const {loading, error, data} = useQuery(GET_PROPERTY_BY_ID, {
        variables: {id},
        });
        if(data) {
            const property = data.getProperty;
            const propPics = property.pictures;
            console.log("This property has pictures");
            function ShowPictures() {
                if(propPics.length > 0) {
                    for(let i = 0; i < propPics.length; i++) {
                        return<>
                        <Carousel>
                        <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src={propPics[i]}
                        alt="A Picture of the property."
                        />
                        <Carousel.Caption>
                        <h3>{property.name}</h3>
                        </Carousel.Caption>
                        </Carousel.Item>
                        </Carousel> 
                        </> 
                    }
                } else {
                    return null;
                }
            }
            return<>
            <div className='propertylist'>
            <div key={property._id} className='propertyCard'>
            <h2>{property.name}</h2>
            <h5>{property.addressSt}</h5> 
            <h5>{property.city}, {property.state} {property.zip}</h5>
            </div>
            {ShowPictures()}
            <button type='click' onClick={RedirectToAddReservation}>Reserve This Property?</button>
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
        <div>Property Details</div>
        {GetProperty({id: propertyId})}

        </Container>    
        </>
    )  
}
