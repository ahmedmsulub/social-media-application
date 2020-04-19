import React, { useState, useEffect } from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import * as parkData from "./data/skateboard-parks.json";
import mapStyles from "./mapStyles";

function Map() {
  const [selectedPark, setSelectedPark] = useState(null);

  useEffect(() => {
    const listener = e => {
      if (e.key === "Escape") {
        setSelectedPark(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: 45.4211, lng: -75.6903 }}
      defaultOptions={{ styles: mapStyles }}
    >
      {parkData.features.map(park => (
        <Marker
          key={park.properties.PARK_ID}
          position={{
            lat: park.geometry.coordinates[1],
            lng: park.geometry.coordinates[0]
          }}
          onClick={() => {
            setSelectedPark(park);
          }}
          icon={{
            url: `/skateboarding.svg`,
            scaledSize: new window.google.maps.Size(25, 25)
          }}
        />
      ))}

      {selectedPark && (
        <InfoWindow
          onCloseClick={() => {
            setSelectedPark(null);
          }}
          position={{
            lat: selectedPark.geometry.coordinates[1],
            lng: selectedPark.geometry.coordinates[0]
          }}
        >
          <div>
            <h2>{selectedPark.properties.NAME}</h2>
            <p>{selectedPark.properties.DESCRIPTIO}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

const MapWrapped = withScriptjs(withGoogleMap(Map));

export default function Maps() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <MapWrapped
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${
          process.env.REACT_APP_GOOGLE_KEY
        }`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
}





// import React, { Component } from 'react'
// import {GOOGLE_API_KEY} from '../../config';
// import { Maps, GoogleApiWrapper } from 'google-maps-react';

// // const reverseGeoCoordinates = require('fetch-google-maps');

//  class Map extends Component {
//     constructor(props){
//         super(props)
//         this.state = {
//             latitude:null,
//             longitude:null,
//             userAddress:null
//         };
//         this.getLocation = this.getLocation.bind(this);
//         this.getCoordinates=this.getCoordinates.bind(this);
//         // this.reverseGeoCoordinates=this.reverseGeoCoordinates.bind(this);
//     }

//     getLocation(){
//         if(navigator.geolocation) {
//             navigator.geolocation.getCurrentPosition(this.getCoordinates, this.handleLocationError);
//         }else{
//             alert('Geolocation is not supported by this browser')
//         }
//     }
//     getCoordinates(position) {
//         console.log('pooostion',position)
//         this.setState({
//             latitude:position.coords.latitude,
//             longitude:position.coords.longitude
//             //  <img src={'https://maps.googleapis.com/maps/api/staticmap?center=${this.state.latitude},${this.state.longitude}&zoom=14&size=400x300&sensor=false&key=AIzaSyDrTruKTnUY8sWv3WlLHsb0G34_jNJMC80'} alt='map'/>:null
//         })
//         // this.reverseGeoCoordinates()
//     }
//     handleLocationError(error) {
//         switch(error.code){
//             case error.PERMISSION_DENIED:
//                 alert('user denied the request for Geolocation.')
//                 break;
//             case error.POSITION_UNAVAILABLE:
//                 alert('Location information is unavailable')
//                 break;
//             case error.TIMEOUT:
//                 alert('the request to get user location timed out.')
//                 break;
//             case error.UNKNOWN_ERROR:
//                 alert('An unknown error occurred')
//                 break;
//                 default:
//                 alert('An unknown error occurred.')
//         }
//     }
//     // fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.latitude},${this.state.longitude}&sensor=false&key=${GOOGLE_API_KEY}`)

//     // reverseGeoCoordinates(){
//     //      fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng=35.6512,139.68')
//     //     fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.latitude},${this.state.longitude}&sensor=false&key=${AIzaSyDrTruKTnUY8sWv3WlLHsb0G34_jNJMC80}`)
//     //     .then(response => response.json())
//     //     .then(data => console.log(data))
//     //     .catch(error=>alert(error))
//     // }

//     //  AIzaSyDrTruKTnUY8sWv3WlLHsb0G34_jNJMC80

//     render() {
//         // ${this.state.latitude},${this.state.longitude}
//         let KEY="AIzaSyDrTruKTnUY8sWv3WlLHsb0G34_jNJMC80"
//         let url=`https://maps.googleapis.com/maps/api/staticmap?center=${this.state.latitude},${this.state.longitude}&zoom=14&size=400x300&sensor=false&key=${KEY}`
//         return (
//             <div>
//                 <h2>get googleMap api</h2>
//                 <button onClick={this.getLocation}>Get coordinates</button>
//                 <h4>HTML coordinates</h4>
//                 <p>Latitude:{this.state.latitude}</p>
//                 <p>longitude:{this.state.longitude}</p>
//                 <h4>Google Maps Reverse Geocoding</h4>
//                 <p>Address:{this.state.userAddress}</p>
//                 {
//                     this.state.latitude&&this.state.longitude ? <img src={url} alt='map'/>:null
//                 }
//             </div>
//         )
//     }
// }
// // export default Map
// export default GoogleApiWrapper({
//     apiKey: ('AIzaSyDrTruKTnUY8sWv3WlLHsb0G34_jNJMC80')
//   })(Map)
