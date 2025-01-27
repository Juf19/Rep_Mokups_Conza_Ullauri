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
  const [loading, setLoading] = useState(true);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(() => {
    const hoy = new Date();
    return new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
  });
   // Inicializar como objeto Date

  const navigate = useNavigate();
  const location = useLocation();
  const { parque, cancha } = location.state || {}; // Datos del parque y la cancha

  // Función para manejar el cambio de fecha en el calendario
  const handleDateChange = (date) => {
    setFechaSeleccionada(date); // Cambiar la fecha seleccionada
    console.log("Fecha seleccionada1:", date); // Log de la fecha seleccionada
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

    if (cancha?._id) {
      fetchHorarios();
    }
  }, [cancha]); // Cambiar cuando cambia la cancha

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

  // Función para manejar la reserva
  const handleReserva = () => {
    if (aceptarTerminos && horariosSeleccionados.length > 0) {
      navigate('/confirmacion', {
        state: {
          parqueId: parque?._id,
          canchaId: cancha?._id,
          horariosSeleccionados,
          fecha: fechaSeleccionada.toISOString(), // Convertir la fecha a formato ISO (2025-01-26T00:00:00.000+00:00)
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
        Fecha seleccionada: {fechaSeleccionada.toISOString().split('T')[0]} {/* Mostrar en formato yyyy-mm-dd */}
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
                style={{
                  backgroundColor: '#4CAF50', // Color verde si no está reservado
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
