import React, { Component } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

class MapContainer extends Component {
  render() {
    const containerStyle = {
      width: '100%',
      height: '100%'
    };

    const center = {
      lat: -0.178880,  // Latitud de Quito como ejemplo
      lng: -78.482560
       
    };

    return (
      <LoadScript googleMapsApiKey="AIzaSyDcw4n3APLA58T-j2C_l6g5qhKtK_hpNss">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={18}
        >
          {/* Puedes agregar marcadores y otros componentes aquí */}
        </GoogleMap>
      </LoadScript>
    );
  }
}

export default MapContainer;