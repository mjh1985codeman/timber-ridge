import React from "react";
import {Container} from "react-bootstrap";
import Packages from "../components/Packages"

const Home = () => {
  return (
    <>
    <div className="home-head-container">
        <h1 className="home-title">Timber Ridge Hunting Ranch</h1>
        <blockquote class="blockquote">
    <p className="home-quote">"Where success is just part of the experience."</p>
    </blockquote>  
    </div>
    <Container>
      <Packages/>
    </Container>
    </>
  );
};

export default Home;