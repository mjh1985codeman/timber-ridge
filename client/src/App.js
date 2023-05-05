
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Records from "./pages/Records";
import Contact from "./pages/Contact";
import NavItem from "./components/NavItem";
import Packages from "./pages/Packages";
import Properties from "./pages/Properties";
import ReserveProperty from "./components/ReserveProperty";
import AddProperty from "./pages/AddProperty";
import PropertyDetails from "./pages/PropertyDetails";
import Login from "./pages/Login";

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
      </Navigation>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/packages"element={<Packages/>} />
        <Route exact path="/records" element={<Records/>} />
        <Route exact path="/contact"element={<Contact/>} />
        <Route exact path="/properties"element={<Properties/>} />
        <Route exact path="/properties/addproperty" element={<AddProperty/>} />
        <Route exact path="/properties/:propertyId" element={<PropertyDetails/>}/>
        <Route exact path="/reserve/:propertyId" element={<ReserveProperty/>}/>
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
