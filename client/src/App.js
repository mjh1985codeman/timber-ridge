
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ReactComponent as HomeIcon} from './assets/homeicon.svg';
import { ReactComponent as RecordsIcon } from "./assets/recordsicon.svg";
import { ReactComponent as ContactIcon} from "./assets/contacticon.svg";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Records from "./components/Records";
import Contact from "./components/Contact";
import NavItem from "./components/NavItem";

function App() {
  return (
    <Router>
    <>
      <Navbar>
        <NavItem icon={<HomeIcon />} to="/" text="Home"/>
        <NavItem icon={<RecordsIcon />} to="/records" text="Records"/>
        <NavItem icon={<ContactIcon />} to="/contact" text="Contact"/>
      </Navbar>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/records" component={Records} />
        <Route exact path="/contact"component={Contact} />
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
