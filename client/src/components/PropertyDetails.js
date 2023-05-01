import React, {useState, useEffect} from 'react'
import {useParams, useLocation} from 'react-router-dom';
import {Container} from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import Loading from '../components/Loading';
import { useQuery } from '@apollo/client';
const {GET_PROPERTY_BY_ID} = require('../controllers/queries');

export default function PropertyDetails() {
    //look at the Path on the App.js file for this component to see why we use propertyId here.  
    let { propertyId } = useParams();
    const [data, setData] = useState([]);
    const [index, setIndex] = useState(0);
    const [propPics, setPropPics] = useState([]);

    const location = useLocation();

    const compKey = location.pathname + location.search;

    useEffect(() => {
        fetch(`https://s3.amazonaws.com/tr-prop-bucket/${propertyId}.json`)
        .then(response => response.json())
        .then(data => setPropPics(data))
        .catch(error => console.error(error));
    },[propertyId]);     

    const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
    };

    function RedirectToAddReservation() {
        alert(`They want to reserve this property: ` + propertyId);
    };

    function ShowPictures(id) {
                    const pictures = propPics.jsonPicArray?.images || [];
                    if(pictures.length > 0) {
                        return<>
                            <Carousel slide={false} key={id} activeIndex={index} onSelect={handleSelect}>
                            {pictures.map(pic => (
                            <Carousel.Item key={pic}className="carousel-item">
                            <img
                            className="d-block propimg w-100"
                            src={pic}
                            alt="A Picture of the property."
                            />
                            </Carousel.Item>
                            ))}    
                            </Carousel> 
                            </> 
                    } else {
                        return <div>No Pictures Yet for this Property.</div>;
                    }
    };

    function GetProperty({id}) {
        const {loading, error, data} = useQuery(GET_PROPERTY_BY_ID, {
        variables: {id},
        });
        if(data) {
            const property = data.getProperty;
            const propId = data.getProperty._id;
            return<>
            <div className='propertylist'>
            <div key={property._id} className='propertyCard'>
            <h2>{property.name}</h2>
            <h5>{property.addressSt}</h5> 
            <h5>{property.city}, {property.state} {property.zip}</h5>
            </div>
            {ShowPictures(propId)}
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
        <Container key={compKey}>  
        <div className='propListDiv'>
        {GetProperty({id: propertyId})}
        </div>
        </Container>    
        </>
    )  
}
