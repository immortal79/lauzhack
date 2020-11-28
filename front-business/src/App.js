import './App.css';
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from "react-bootstrap/Container";
import Home from "./components/Home"
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Signup from "./components/Signup";
import Disponibilities from "./components/Disponibilities";
import Bookings from "./components/Bookings";


function App() {
  return (
      <Router>
          <Switch>
              <Route exact path={"/"} component={Home}>
              </Route>
              <Route path={"/signup"} component={Signup}>
              </Route>
              <Route path={"/dispo"} component={Disponibilities}>
              </Route>
              <Route path={"/bookings"} component={Bookings}>
              </Route>
          </Switch>
      </Router>


  );
}



export default App;
