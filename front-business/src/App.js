import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom";
import { Container } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Home from "./components/Home"
import Signup from "./components/Signup";
import Disponibilities from "./components/Disponibilities";
import Bookings from "./components/Bookings";

function App() {
  return (
    <Router>
      <Container className="pt-3 pb-5">
        <h1 className="display-3 title text-center mb-4">
          <Link to="/">ShopSafe</Link>
        </h1>

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/signup" component={Signup} />
          <Route path="/dispo" component={Disponibilities} />
          <Route path="/bookings" component={Bookings} />
          <Redirect to="/" />
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
