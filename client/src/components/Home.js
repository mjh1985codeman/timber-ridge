import React from "react";
import {Container} from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import gatePic from '../assets/gate-pic.jpg';


const Home = () => {
  return (
    <Container className="home-head-container">
        <h1 className="home-title">Timber Ridge Hunting Ranch</h1>
        <blockquote className="blockquote">
    <p className="home-quote">"Where success is just part of the experience."</p>
    </blockquote>
    <Card className="bg-dark text-white">
      <Card.Img className="gate-img" src={gatePic} alt="Card image" />
      <Card.ImgOverlay>
        <Card.Title><h2 className='pic-title'>About Our Ranch</h2></Card.Title>
        <Card.Text className='pic-txt'>
        Located in the heart of Hughes county just 30 miles from Mcalester and an hour and a half from Tulsa, sits a fully operational hunting ranch. From the mature oak trees to the mountain terrain, this ranch offers unlimited breathtaking views. This property has it all, including dense woods as well as clearings/trails to make the terrain as difficult or as easy as you want to traverse. The ranch offers a comfortable hunting lodge equipped with a pool table, stocked bar, poker table, kitchen, multiple bedrooms, washers and dryers along with many more items to make your experience something you will forever remember. From the sunsets at the top of the mountain to the early morning coffee views of buffalo, rams, hogs and Axis deer.  The ranch offers a shooting range to keep you busy and a fire pit to keep you relaxed. It offers a once in a lifetime experience for all ages of family and friends. With fences high and pressure low, this is a once in a lifetime ranch in the heart of the great state of Oklahoma.
        </Card.Text>
      </Card.ImgOverlay>
    </Card>
    </Container>
  );
};

export default Home;