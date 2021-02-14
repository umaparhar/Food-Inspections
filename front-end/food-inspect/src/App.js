import logo from './logo.svg';
import './App.css';
import {Button, Alert, Breadcrumb, Card, InputGroup} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import Frame1 from "./Frame1.png";
import {Route, BrowserRouter as Router} from "react-router-dom";
import MapPage from "./Map"
import AppPage from "./App"

const mapStyles = {
  //width: '70%',
  //height: '100%',
  //marginLeft: '30%',
  //position: 'absolute',
  width: '1024px',
  height: '1024px',
  left: '416px',
  top: '0px',
  background: '#CAE9FF',
  textalign: 'center',
};

const Frame1Styles = {
  position: 'relative',
  font: '40px',
  width: '100px',
  height: '200px',
  top: '80px',
  right: '20px',
  color: 'white',
};

const homeStyles = {
  width: '100%',
  height: '1024px',
  left: '416px',
  top: '0px',
  background: '#CAE9FF',
}

const h1Styles = {
  backgroundColor: '#012A4A',
  color: 'white',
  width: '416px',
  height: '1024px',
  left: '0px',
  top: '0px',
  background: '#012A4A',
}

const zipCodeStyles = {
  width: '385px',
  height: '74px',
  left: '20px',
  top: '81px',
  background: '#A9D6E5',
  boxshadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  borderradius: '50px',
}

  function App() {
    return (
      <Router>
      <div style = {homeStyles}>
      <div style = {h1Styles}>
        <div>
          <br></br>
          <form>
            <input style = {zipCodeStyles} type="text" name = 'zipCode' placeholder = 'Enter Zipcode'>
            </input>
          </form>
          <br></br>
        </div>
        <div className = 'frame1' style = {Frame1Styles}>
          <img src = {Frame1} ></img>
        </div>
      </div>
      </div>
      <Route path = "./" component = {AppPage}></Route>
      <Route path = "./Map" component = {MapPage}></Route>
      </Router>
    );
  }


export default App;

