
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Records from "./components/Records";
import Contact from "./components/Contact";
import NavItem from "./components/NavItem";
import Packages from "./components/Packages";
import Properties from "./components/Properties";
import Reservations from "./components/Reservations";
import AddProperty from "./components/AddProperty";
import PropertyDetails from "./components/PropertyDetails";

function App() {
  return (
    <Router>
    <>
      <Navigation>
        <NavItem to="/" text="Home"/>
        <NavItem to="/packages" text="Packages"/>
        <NavItem to="/records" text="Records"/>
        <NavItem to="/contact" text="Contact"/>
        <NavItem to="/properties" text="Properties"/>
        <NavItem to="/reservations" text="Reservations" />
      </Navigation>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/packages"element={<Packages/>} />
        <Route exact path="/records" element={<Records/>} />
        <Route exact path="/contact"element={<Contact/>} />
        <Route exact path="/reservations"element={<Reservations/>} />
        <Route exact path="/properties"element={<Properties/>} />
        <Route exact path="/properties/addproperty" element={<AddProperty/>} />
        <Route exact path="/properties/:propertyId" element={<PropertyDetails/>}/>
        <Route
          render={() => (
            <h1 className="display-2">
              Oh My. . .You're lost. Try not to make up url routes because
              you have no idea where you'll end up! Play it safe and click
              on a link in the NavBar to get back on track.
            </h1>
          )}
        />
      </Routes>
    </>
  </Router>
  );
}

export default App;
