
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Records from "./components/Records";
import Contact from "./components/Contact";
import NavItem from "./components/NavItem";
import Packages from "./components/Packages";
import Reservations from "./components/Reservations";

function App() {
  return (
    <Router>
    <>
      <Navigation>
        <NavItem to="/" text="Home"/>
        <NavItem to="/packages" text="Packages"/>
        <NavItem to="/records" text="Records"/>
        <NavItem to="/contact" text="Contact"/>
        <NavItem to="/reservations" text="Reservations"/>
      </Navigation>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/packages"component={Packages} />
        <Route exact path="/records" component={Records} />
        <Route exact path="/contact"component={Contact} />
        <Route exact path="/reservations"component={Reservations} />
        <Route
          render={() => (
            <h1 className="display-2">
              Oh My. . .You're lost. Try not to make up url routes because
              you have no idea where you'll end up! Play it safe and click
              on a link in the NavBar to get back on track.
            </h1>
          )}
        />
      </Switch>
    </>
  </Router>
  );
}

export default App;
