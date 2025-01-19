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
  const [reservas, setReservas] = useState([]); // Para almacenar las reservas de la fecha seleccionada
  const [loading, setLoading] = useState(true);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date()); // Inicializar como objeto Date

  const navigate = useNavigate();
  const location = useLocation();
  const { parque, cancha } = location.state || {}; // Datos del parque y la cancha

  // Función para manejar el cambio de fecha en el calendario
  const handleDateChange = (date) => {
    setFechaSeleccionada(date); // Cambiar la fecha seleccionada
    console.log("Fecha seleccionada:", date); // Log de la fecha seleccionada
  };

  // Función para formatear la fecha como yyyy-mm-dd
  const formatDateToDisplay = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Cargar horarios desde la base de datos
  useEffect(() => {
    const fetchHorarios = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/canchas/${cancha._id}`);
        setHorarios(response.data.horarios || []);
        setLoading(false);
      } catch (error) {
        console.error('Error al cargar horarios:', error);
        setLoading(false);
      }
    };

    const fetchReservas = async () => {
      try {
        const fechaFormateada = formatDateToDisplay(fechaSeleccionada); // Usar formatDateToDisplay para formatear
        const response = await axios.get(`http://localhost:8000/reservas?parqueId=${parque._id}&fecha=${fechaFormateada}`);
        setReservas(response.data); // Guardar las reservas de esa fecha
        console.log('Reservas de la fecha seleccionada:', response.data); // Log de las reservas
      } catch (error) {
        console.error('Error al cargar reservas:', error);
      }
    };

    if (cancha?._id) {
      fetchHorarios();
      fetchReservas(); // Llamar para obtener las reservas cuando la fecha cambia
    }
  }, [cancha, parque, fechaSeleccionada]); // Cambiar cuando cambia la fecha seleccionada

  // Función para manejar la selección de un horario
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

  // Función para comparar solo la parte de la fecha sin considerar la hora ni la zona horaria
  const isHorarioReservado = (horario) => {
    const fechaSeleccionadaString = formatDateToDisplay(fechaSeleccionada); // Fecha seleccionada en formato 'yyyy-mm-dd'
    console.log('Fecha seleccionada:', fechaSeleccionadaString); // Log de la fecha seleccionada

    return reservas.some((reserva) => {
      // Convertir la fecha de reserva en 'yyyy-mm-dd'
      const reservaFechaString = new Date(reserva.fecha).toISOString().split('T')[0];
      console.log('Fecha de reserva:', reservaFechaString); // Log de la fecha de la reserva

      // Verificar si las fechas coinciden y si el horario está reservado
      return reservaFechaString === fechaSeleccionadaString && reserva.horarios.includes(horario);
    });
  };

  // Función para manejar la reserva
  const handleReserva = () => {
    if (aceptarTerminos && horariosSeleccionados.length > 0) {
      navigate('/confirmacion', {
        state: {
          parqueId: parque?._id,
          canchaId: cancha?._id,
          horariosSeleccionados,
          fecha: formatDateToDisplay(fechaSeleccionada), // Enviar fecha formateada
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
      <div className='calendario'>
        <Calendar
          onChange={handleDateChange}
          value={fechaSeleccionada}
          className="custom-calendar"
        />
      </div>
      <p className="fecha-seleccionada">
        Fecha seleccionada: {formatDateToDisplay(fechaSeleccionada)} {/* Mostrar en yyyy-mm-dd */}
      </p>

      <div className="app">
        <h3>Seleccione el horario</h3>
        {loading ? (
          <p>Cargando horarios...</p>
        ) : (
          <div className="menuh">
            {horarios.map((time, index) => (
              <button
                key={index}
                className={horariosSeleccionados.includes(time) ? 'horario selected' : 'horario'}
                onClick={() => handleHorarioClick(time)}
                disabled={isHorarioReservado(time)} // Deshabilitar si el horario está reservado
                style={{
                  backgroundColor: isHorarioReservado(time) ? '#fd2b2b' : '#4CAF50', // Color rojo si está reservado
                }}
              >
                {time}
              </button>
            ))}
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
