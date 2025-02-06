import { StyleSheet, Text, View, StatusBar } from 'react-native';
import axios from 'axios';
import React, { useState, useEffect } from "react";

export default function App() {
  const [parques, setParques] = useState([]);

  useEffect(() => {
    axios
      .get('http://192.168.100.9:8000/parques')
      .then(response => {
        setParques(response.data);
      })
      .catch(error => {
        console.error('Error al obtener la lista de restaurantes:', error);
      });
  }, []);

  return (
    <View style={{ marginTop: StatusBar.currentHeight }}>
      <Text>Bienvenidos al sistema de reserva de canchas</Text>
      {parques.length > 0 ? (
        parques.map((parque, index) => (
          <View key={index}>
            <Text>Nombre: {parque.nombre}</Text>
          </View>
        ))
      ) : (
        <Text>No se encontraron parques.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
