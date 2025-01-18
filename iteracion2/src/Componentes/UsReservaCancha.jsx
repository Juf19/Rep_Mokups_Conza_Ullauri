import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ItemHeader from './ItemHeader';
import ItemBajoHeader from './ItemBajoHeader';
import CalendarioRectangulo from './CalendarioRectangulo';
import Swal from 'sweetalert2';
import axios from 'axios';

const UsReservaCancha = () => {
  const [horariosSeleccionados, setHorariosSeleccionados] = useState([]);
  const [aceptarTerminos, setAceptarTerminos] = useState(false);
  const [horarios, setHorarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date().toISOString().split('T')[0]); // Fecha actual por defecto

  const navigate = useNavigate();
  const location = useLocation();
  const { parque, cancha } = location.state || {}; // Datos del parque y la cancha

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
  }, [cancha]);

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
          parqueId: parque?._id,
          canchaId: cancha?._id,
          horariosSeleccionados,
          fecha: fechaSeleccionada, // Fecha seleccionada o predeterminada
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
      <div className="derecha">
        {/* Pasar la función setFechaSeleccionada como prop onDateSelect */}
        <CalendarioRectangulo onDateSelect={setFechaSeleccionada} />
      </div>

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
