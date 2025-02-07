import React, { useState } from 'react';
import ItemHeader from './ItemHeader';
import ItemBajoHeader from './ItemBajoHeader';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Container, Typography } from '@mui/material';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const UsConfirmacion = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Guardar los datos recibidos
  const { parqueId, canchaId, horariosSeleccionados, fecha, usuarioId } = location.state || {};

  const [reservaCreada, setReservaCreada] = useState(false); // Estado para saber si la reserva fue creada

  const token = localStorage.getItem('token'); // Obtener el token desde el localStorage

  // Función para obtener los encabezados con el token
  const obtenerHeadersConToken = () => {
    if (!token) {
      throw new Error("No se encontró el token de autorización.");
    }
    return {
      Authorization: `Bearer ${token}`  // Retornar el encabezado con el token
    };
  };

  // Función para crear la reserva solo cuando el usuario hace clic en el botón
  const crearReserva = async () => {
    console.log("Enviando reserva con usuarioId:", usuarioId);

    if (!usuarioId) {
        console.error("Error: usuarioId es undefined o null en UsConfirmacion");
        return;
    }

    try {
        const response = await axios.post('http://localhost:8000/reservas', {
            parqueId,
            canchaId,
            horarios: horariosSeleccionados,
            fecha,
            usuarioId,  // Asegurar que se envía el usuarioId
        }, {
            headers: obtenerHeadersConToken() // Usar los encabezados con el token
        });

        console.log('Reserva creada exitosamente:', response.data);
        setReservaCreada(true);

        // Emitir evento para actualizar reservas
        window.dispatchEvent(new Event("reservaCreada"));

        // Redirigir al usuario sin necesidad de enviar estado extra
        navigate('/HomeUser');
    } catch (error) {
        console.error('Error al crear la reserva:', error.response?.data || error.message);
    }
  };

  return (
    <div>
      <ItemHeader />
      <ItemBajoHeader />
      <Container className="app py-5">
        <div className="contenedorp">
          {!reservaCreada ? (
            <Typography variant="h6" gutterBottom>
              Reserva confirmada. Puedes revisar la sección de reservas para visualizarla en la tabla.
              Recuerda que puedes cancelarla hasta 24 horas antes de la fecha programada.
            </Typography>
          ) : (
            <Typography variant="h6" gutterBottom>
              Tu reserva ha sido realizada con éxito. ¡Gracias por elegirnos!
            </Typography>
          )}
        </div>
        <div className="item1">
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              if (!reservaCreada) {
                crearReserva(); // Crear la reserva solo cuando el usuario hace clic
              }
              navigate('/HomeUser', {
                state: { parqueId, canchaId, horariosSeleccionados, fecha, usuarioId }, // Navega con los datos actualizados
              });
            }}
          >
            Volver al inicio
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default UsConfirmacion;
