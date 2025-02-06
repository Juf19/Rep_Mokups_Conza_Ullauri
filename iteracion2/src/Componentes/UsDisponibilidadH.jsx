import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import ItemHeader from "./ItemHeader";
import ItemBajoHeader from "./ItemBajoHeader";
import "react-calendar/dist/Calendar.css";
import axios from "axios";

const texto = [{ nombre: "HORARIO" }];

function UsDisponibilidadH() {
  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());
  const [canchas, setCanchas] = useState([]); // Estado para almacenar todas las canchas
  const [reservas, setReservas] = useState([]); // Estado para almacenar reservas
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de error
  const navigate = useNavigate();
  

  const location = useLocation();
  const { parque } = location.state || {}; // Recibir el objeto parque desde el estado

  const [usuarioId, setUsuarioId] = useState(() => {
    return location.state?.usuarioId || localStorage.getItem("usuarioId");
});

  // Función para cambiar la fecha seleccionada
  const handleDateChange = (date) => {
    setFechaSeleccionada(date); // Cambiar la fecha seleccionada
    console.log("Fecha seleccionada:", date); // Log de la fecha seleccionada
  };

  // Función para formatear la fecha al formato 'YYYY-MM-DD' para la consulta
  const formatDate = (date) => {
    const formattedDate = date.toISOString().split('T')[0]; // Obtener solo la parte de la fecha (YYYY-MM-DD)
    console.log("Fecha formateada para consulta:", formattedDate); // Log de la fecha formateada
    return formattedDate;
  };

  // Función para mostrar la fecha en formato 'DD/MM/YYYY' para la UI
  const formatDateToDisplay = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const displayDate = `${day}/${month}/${year}`;
    console.log("Fecha para mostrar:", displayDate); // Log de la fecha para mostrar
    return displayDate;
  };

  useEffect(() => {
    const fetchDatos = async () => {
      if (!parque?._id) {
        setError("Faltan datos de parque.");
        setLoading(false);
        return;
      }
  
      console.log("ID del parque recibido:", parque._id); // Log para verificar el ID del parque
  
      try {
        // Obtener todas las canchas asociadas a este parque
        const responseCanchas = await axios.get(`http://localhost:8000/canchas?parqueId=${parque._id}`);
        console.log("Canchas cargadas desde el backend:", responseCanchas.data); // Log de todas las canchas obtenidas
  
        // Filtrar canchas para asegurarse de que solo sean del parque actual
        const canchasFiltradas = responseCanchas.data.filter(cancha => {
          console.log(`Verificando cancha: ${cancha.nombre}, parqueId: ${cancha.idParque}`);
          return cancha.idParque === parque._id;
        });
  
        console.log("Canchas filtradas:", canchasFiltradas); // Log para ver qué canchas se están guardando
        setCanchas(canchasFiltradas);
  
        // Obtener todas las reservas de este parque para la fecha seleccionada
        const fechaFormateada = formatDate(fechaSeleccionada);
        console.log("Fecha formateada para consulta de reservas:", fechaFormateada);
  
        const responseReservas = await axios.get(
          `http://localhost:8000/reservas?parqueId=${parque._id}&fecha=${fechaFormateada}`
        );
        console.log("Reservas cargadas para la fecha:", responseReservas.data); // Log de las reservas obtenidas
        setReservas(responseReservas.data);
  
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
        setError("No se pudieron cargar las canchas o las reservas.");
        setLoading(false);
      }
    };
  
    fetchDatos();
  }, [parque, fechaSeleccionada]);
  

  // Normalizar fecha de reserva (solo fecha, sin hora)
  const normalizeDate = (date) => {
    const dateObj = new Date(date);
    return dateObj.toISOString().split('T')[0];
  };

  // Extraer los horarios reservados para cada cancha en la fecha seleccionada
  const horariosReservadosPorCancha = reservas.reduce((acc, reserva) => {
    const canchaId = reserva.canchaId._id;
    const fechaNormalizada = normalizeDate(reserva.fecha);

    if (fechaNormalizada === formatDate(fechaSeleccionada)) {
      const horarios = reserva.horarios;
      if (!acc[canchaId]) acc[canchaId] = [];
      acc[canchaId] = [...acc[canchaId], ...horarios];
    }
    return acc;
  }, {});

  console.log("Horarios reservados por cancha:", horariosReservadosPorCancha);

  return (
    <div>
      <ItemHeader />
      <ItemBajoHeader nombre={texto[0].nombre} />
      <div className="us-disponibilidad-container">
        <div className="us-disponibilidad-content">
          <div className="us-disponibilidad-left">
            <Calendar
              onChange={handleDateChange}
              value={fechaSeleccionada}
              className="custom-calendar"
            />
            <p className="fecha-seleccionada">
              Fecha seleccionada: {formatDateToDisplay(fechaSeleccionada)}
            </p>
          </div>

          <div className="us-disponibilidad-right">
            {loading ? (
              <p>Cargando canchas y reservas...</p>
            ) : error ? (
              <p className="error-message">{error}</p>
            ) : (
              <div>
                <h3 className="parque-nombre">{parque.nombre}</h3>
                {canchas.length > 0 ? (
                  canchas.map((cancha) => (
                    <div  className="e" key={cancha._id}>
                      <div className="nombre-arriba">
                      <h4 className="cancha-nombre">{cancha.nombre}</h4> 
                      <button className="res" onClick={() => navigate('/reserva', { state: { parque, usuarioId, cancha } })}>Reservar</button>
                      </div>
                      <div className="horarios-container">
                        {cancha.horarios && cancha.horarios.length > 0 ? (
                          cancha.horarios.map((horario, index) => {
                            const estaReservado =
                              horariosReservadosPorCancha[cancha._id]?.includes(horario);

                            return (
                              <button
                                key={index}
                                className={`horario-button ${estaReservado ? "reservado" : ""}`}
                                style={{
                                  backgroundColor: estaReservado ? "#fd2b2b" : "#4CAF50",
                                }}
                                disabled={estaReservado}
                              >
                                {horario}
                              </button>
                              
                            );
                            
                          })
                        ) : (
                          <p>No hay horarios disponibles para esta cancha.</p>
                        )} 
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No hay canchas disponibles en este parque.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UsDisponibilidadH;
