import logo from './logo.svg';
import './App.css';
import {Button, Alert, Breadcrumb, Card} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import Frame1 from "./Frame1.png";

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
  width: '100px',
  height: '200px',
  top: '80px',
  right: '20px',
};

const h1Styles = {
  backgroundColor: '#012A4A',
  color: 'white',
  width: '416px',
  height: '1024px',
  left: '0px',
  top: '0px',
  background: '#012A4A',
}

export class MapContainer extends Component {
  
  state = {
    showingInfoWindow: false,  // Hides or shows the InfoWindow
    activeMarker: {},          // Shows the active marker upon click
    selectedPlace: {}          // Shows the InfoWindow to the selected place upon a marker
  };
  
  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

    onClose = props => {
      if (this.state.showingInfoWindow) {
        this.setState({
          showingInfoWindow: false,
          activeMarker: null
        });
      }
    };
  
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={
          {
            lat: 43.073051,
            lng: -89.401230
          }
        }
      >

        <Marker onClick={this.onMarkerClick}
          name={'Kenyatta International Convention Centre'}
        />
        <InfoWindow 
          marker={this.state.activeMarker}          
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
      <div style = {h1Styles}>
        <h1>Food Inspection</h1>
        <div>
          <h2 id = 'zip'></h2>
        </div>
        <div className = 'frame1' style = {Frame1Styles}>
          <img src = {Frame1} ></img>
        </div>
      </div>     
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDtgrJ9xlgi1LtRJPedrf24Lm3ANVg7imo'
})(MapContainer);
