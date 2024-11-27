import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const Map = () => {
  const mapContainerStyle = {
    width: '100%',
    height: '400px'
  };

  const center = {
    lat: -0.1807,  // Coordenadas aproximadas de Quito
    lng: -78.4678
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyDcw4n3APLA58T-j2C_l6g5qhKtK_hpNss">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={15}
      >
        <Marker position={center} />
        {/* Aquí puedes agregar más marcadores o configuraciones si es necesario */}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;