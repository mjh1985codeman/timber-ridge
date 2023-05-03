import React, {useState, useEffect} from 'react'
import Carousel from 'react-bootstrap/Carousel';
import Loading from '../components/Loading';

export default function PropPics({propIdForPics}) {
    const [picArray, setpicArray] = useState([]);

    const url = `https://s3.amazonaws.com/tr-prop-bucket/${propIdForPics}.json`;

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(url);
            result.json().then(json => {
                updateImageArray(json);
            });
        }
        fetchData();
    }, []);

    function updateImageArray(obj) {
        const pictures = obj.jsonPicArrayObj.images;
        setpicArray([]);
        pictures.forEach(pic => {
            setpicArray(picArray => [...picArray, pic]);
        });
    }
        if(picArray.length > 0) {
            return (
            <>
            <Carousel>
            {picArray.map(pic => (
                <Carousel.Item key={pic} className="carousel-item">
                    <img
                    className="d-block propimg w-100"
                    src={pic}
                    alt="A Picture of the property."
                    />
                </Carousel.Item>
            ))}    
            </Carousel> 
            </>
            )
        }else {
        return <Loading/>
        }
};
