import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Importa los estilos del calendario

const CalendarioRectangulo = ({ onDateSelect }) => {
  const [mostrarCalendario, setMostrarCalendario] = useState(false);

  // Función para manejar el clic y alternar la visibilidad del calendario
  const toggleCalendario = () => {
    setMostrarCalendario(!mostrarCalendario);
  };

  // Función para manejar la selección de una fecha en el calendario
  const handleDateChange = (date) => {
    // Llamar a la función onDateSelect con la fecha seleccionada
    onDateSelect(date.toISOString().split('T')[0]); // Asegúrate de pasar solo la fecha en formato YYYY-MM-DD
    setMostrarCalendario(false); // Opcional: Cerrar el calendario al seleccionar una fecha
  };

  return (
    <div>
      {/* El rectángulo que cuando se hace clic despliega el calendario */}
      <div
        style={{
          width: '500px',
          height: '30px',
          backgroundColor: '#f0f0f0',
          color: 'black',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          borderRadius: '8px',
          marginLeft: "850px",
        }}
        onClick={toggleCalendario}
      >
        <span>Calendario</span>
      </div>

      {/* Condición para mostrar el calendario solo si `mostrarCalendario` es true */}
      {mostrarCalendario && (
        <div style={{ padding: '20px' }}>
          <Calendar onChange={handleDateChange} />
        </div>
      )}
    </div>
  );
};

export default CalendarioRectangulo;
