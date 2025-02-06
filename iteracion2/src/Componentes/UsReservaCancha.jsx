import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ItemHeader from './ItemHeader';
import ItemBajoHeader from './ItemBajoHeader';
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Swal from 'sweetalert2';
import axios from 'axios';

const UsReservaCancha = () => {
  const [horariosSeleccionados, setHorariosSeleccionados] = useState([]);
  const [aceptarTerminos, setAceptarTerminos] = useState(false);
  const [horarios, setHorarios] = useState([]);
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(() => {
    const hoy = new Date();
    return new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
  });

  const navigate = useNavigate();
  const location = useLocation();
  const { parque, cancha, usuarioId } = location.state || {}; // Recibir usuarioId

  const token = localStorage.getItem('token'); // Obtener el token desde el localStorage

  // Obtener encabezados con el token
  const obtenerHeadersConToken = () => {
    if (!token) {
      throw new Error("No se encontró el token de autorización.");
    }
    return {
      Authorization: `Bearer ${token}`  // Retornar el encabezado con el token
    };
  };

  const handleDateChange = (date) => {
    setFechaSeleccionada(date);
  };

  useEffect(() => {
    const fetchHorarios = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/canchas/${cancha._id}`, {
          headers: obtenerHeadersConToken() // Usar los encabezados con el token
        });
        setHorarios(response.data.horarios || []);
      } catch (error) {
        console.error('Error al cargar horarios:', error);
      } finally {
        setLoading(false);
      }
    };

    if (cancha?._id) {
      fetchHorarios();
    }
  }, [cancha, token]);

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const fechaISO = fechaSeleccionada.toISOString().split('T')[0];
        const response = await axios.get(
          `http://localhost:8000/reservas?canchaId=${cancha._id}&fecha=${fechaISO}`,
          { headers: obtenerHeadersConToken() } // Usar los encabezados con el token
        );
        setReservas(response.data || []);
      } catch (error) {
        console.error('Error al cargar reservas:', error);
        setReservas([]);
      }
    };

    if (cancha?._id && fechaSeleccionada) {
      fetchReservas();
    }
  }, [cancha, fechaSeleccionada, token]);

  const isHorarioReservado = (horario) => {
    return reservas.some((reserva) => {
      const fechaReserva = new Date(reserva.fecha).toISOString().split('T')[0];
      const fechaSeleccionadaISO = fechaSeleccionada.toISOString().split('T')[0];
      return fechaReserva === fechaSeleccionadaISO && reserva.horarios.includes(horario);
    });
  };

  const handleHorarioClick = (horario) => {
    if (horariosSeleccionados.includes(horario)) {
      setHorariosSeleccionados((prev) => prev.filter((h) => h !== horario));
    } else if (horariosSeleccionados.length < 2) {
      setHorariosSeleccionados((prev) => [...prev, horario]);
    } else {
      Swal.fire({
        title: 'Error',
        text: 'No puede seleccionar más de dos horarios',
        icon: 'warning',
        confirmButtonText: 'Aceptar',
      });
    }
  };

  const handleReserva = () => {
    if (aceptarTerminos && horariosSeleccionados.length > 0) {
      navigate('/confirmacion', {
        state: {
          usuarioId, // Pasamos usuarioId
          parqueId: parque?._id,
          canchaId: cancha?._id,
          horariosSeleccionados,
          fecha: fechaSeleccionada.toISOString(),
        },
      });
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Debe seleccionar al menos un horario y aceptar los términos y condiciones.',
        icon: 'warning',
        confirmButtonText: 'Aceptar',
      });
    }
  };

  return (
    <div className="espaciadocancha">
      <ItemHeader />
      <ItemBajoHeader nombre={`${parque?.nombre} - ${cancha?.nombre}`} />
      <div className="calendario">
        <Calendar
          onChange={handleDateChange}
          value={fechaSeleccionada}
          className="custom-calendar"
        />
      </div>
      <p className="fecha-seleccionada">
        Fecha seleccionada: {fechaSeleccionada.toISOString().split('T')[0]}
      </p>

      <div className="app">
        <h3>Seleccione el horario</h3>
        {loading ? (
          <p>Cargando horarios...</p>
        ) : (
          <div className="menuh">
            {horarios.map((time, index) => {
              const reservado = isHorarioReservado(time);
              const seleccionado = horariosSeleccionados.includes(time);

              return (
                <button
                  key={index}
                  onClick={() => handleHorarioClick(time)}
                  disabled={reservado}
                  style={{
                    backgroundColor: reservado
                      ? '#f44336'
                      : seleccionado
                      ? '#4CAF50'
                      : '#e0e0e0',
                    color: reservado ? '#ffffff' : '#000000',
                    cursor: reservado ? 'not-allowed' : 'pointer',
                    padding: '10px 15px',
                    margin: '5px',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                    fontSize: '14px',
                  }}
                >
                  {time}
                </button>
              );
            })}
          </div>
        )}
        <h3>Aceptar términos y condiciones</h3>
        <div className="terminos">
          <label>
            <input
              type="checkbox"
              checked={aceptarTerminos}
              onChange={(e) => setAceptarTerminos(e.target.checked)}
            />
            <span>
              Al confirmar, usted se compromete a respetar el horario seleccionado para el uso de la <br />
              cancha. Además, se solicita cuidar las instalaciones, mantenerlas en buen estado y seguir las <br />
              normas establecidas para el uso adecuado del espacio.
            </span>
          </label>
        </div>
        <div className="form1">
          <div className="item1">
            <button className="reserva" onClick={handleReserva}>
              Reservar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsReservaCancha;
