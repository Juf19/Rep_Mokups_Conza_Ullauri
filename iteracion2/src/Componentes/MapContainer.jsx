import React, { Component } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

class MapContainer extends Component {
  // Función para convertir las coordenadas de string a números
  convertToNumber = (coordinate) => {
    const number = parseFloat(coordinate);
    return isNaN(number) ? null : number; // Si no es un número válido, retornamos null
  };

  // Referencia al mapa
  mapRef = React.createRef();

  markers = []; // Inicializamos la lista de marcadores

  // Función para convertir las coordenadas lat/lng a píxeles en el mapa
  convertLatLngToPixel = (lat, lng, map) => {
    const projection = map.getProjection(); // Obtener la proyección del mapa
    if (projection) {
      const point = projection.fromLatLngToPoint(new window.google.maps.LatLng(lat, lng));
      console.log(`Posición en píxeles:`, point); // Imprimir en consola la posición en píxeles
      return point; // Devuelve la posición en píxeles
    } else {
      console.log("La proyección no está disponible aún.");
    }
    return null; // Si no se puede obtener la proyección, retornamos null
  };

  componentDidUpdate(prevProps) {
    // Solo agregar los marcadores si las canchas han cambiado
    if (prevProps.canchas !== this.props.canchas) {
      this.addMarkers();
    }
  }

  addMarkers = () => {
    const { canchas, onPosicionesMarcadores } = this.props;

    // Acceder al objeto mapa
    const map = this.mapRef.current;
    const posicionesPixeles = [];

    if (map && window.google) {
      // Limpiar los marcadores previos
      this.markers.forEach(marker => marker.setMap(null));
      this.markers = []; // Limpiar la lista de marcadores

      // Crear nuevos marcadores
      canchas.forEach(cancha => {
        const lat = this.convertToNumber(cancha.latitud);
        const lng = this.convertToNumber(cancha.longitud);

        if (lat !== null && lng !== null) {
          const marker = new window.google.maps.Marker({
            position: { lat, lng },
            map: map,
            title: cancha.nombre,
          });

          // Intentar obtener la proyección y convertir las coordenadas a píxeles
          const interval = setInterval(() => {
            const pixelPosition = this.convertLatLngToPixel(lat, lng, map);
            if (pixelPosition) {
              posicionesPixeles.push({ id: cancha._id, pixelPosition }); // Guardamos las posiciones en píxeles
              clearInterval(interval); // Detener la verificación cuando la proyección esté disponible
            }
          }, 100); // Verificar cada 100 ms

          // Agregar un evento al marcador
          marker.addListener('click', () => {
            console.log(`Cancha seleccionada: ${cancha.nombre}`);
          });

          this.markers.push(marker); // Agregar el marcador a la lista
        }
      });

      // Pasar las posiciones de los marcadores al componente padre
      if (onPosicionesMarcadores) {
        onPosicionesMarcadores(posicionesPixeles);
      }
    }
  };

  render() {
    const { canchas } = this.props; // Recibir canchas como prop

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
          onLoad={map => {
            // Guardamos la referencia del mapa para usarla más tarde
            this.mapRef.current = map;
            console.log("Mapa cargado, ahora se pueden agregar marcadores");
            this.addMarkers();  // Agregamos los marcadores al cargar el mapa
          }}
        >
          {/* El mapa se cargará aquí, no es necesario renderizar los marcadores aquí */}
        </GoogleMap>
      </LoadScript>
    );
  }
}

export default MapContainer;
