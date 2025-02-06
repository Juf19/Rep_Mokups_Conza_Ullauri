import React, { useEffect, useState } from "react";
import axios from "axios";

const MapComponent = () => {
  const [map, setMap] = useState(null);

  // Inicializamos el mapa y añadimos el listener de clic
  useEffect(() => {
    // Comprobamos si el script ya ha sido añadido previamente
    if (document.getElementById("google-maps-script")) {
      console.log("El script de Google Maps ya ha sido cargado.");
      return;
    }

    const googleMapsScript = document.createElement("script");
    googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDcw4n3APLA58T-j2C_l6g5qhKtK_hpNss&callback=initMap`; // Reemplaza con tu API Key
    googleMapsScript.id = "google-maps-script";
    googleMapsScript.async = true;
    googleMapsScript.defer = true;

    // Insertamos el script en el body
    document.body.appendChild(googleMapsScript);

    // Definimos la función initMap
    window.initMap = () => {
      const mapInstance = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: -0.1807, lng: -78.4678 }, // Quito, Ecuador como centro inicial
        zoom: 18,
      });

      // Registramos el evento de clic en el mapa
      mapInstance.addListener("click", (event) => {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        console.log(`Coordenadas seleccionadas: Latitud: ${lat}, Longitud: ${lng}`);
        enviarCoordenadas({ lat, lng });
      });

      setMap(mapInstance); // Guardamos la referencia al mapa en el estado
    };

    // Limpiar el script cuando el componente se desmonte
    return () => {
      document.body.removeChild(googleMapsScript);
    };
  }, []);

  // Función para enviar las coordenadas al backend
  const enviarCoordenadas = async (coordenadas) => {
    try {
      const response = await axios.post("http://localhost:3000/guardar-coordenadas", coordenadas);
      console.log("Respuesta del backend:", response.data);
    } catch (error) {
      console.error("Error enviando coordenadas:", error);
    }
  };

  return (
    <div>
      <h1>Mapa Interactivo</h1>
      <div id="map" style={{ width: "100%", height: "500px" }}></div>
    </div>
  );
};

export default MapComponent;
