import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import ItemHeader from "./ItemHeader";
import ItemBajoHeader from "./ItemBajoHeader";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import Swal from "sweetalert2";

const texto = [{ nombre: "HORARIO" }];

function UsDisponibilidadH() {
  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());
  const [canchas, setCanchas] = useState([]);
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [horariosSeleccionados, setHorariosSeleccionados] = useState([]);
  const [setReservaCreada, setSetReservaCreada] = useState(false); // Definir setReservaCreada

  const location = useLocation();
  const navigate = useNavigate();
  const { parque, usuarioId } = location.state || {}; 

  const parqueId = parque?._id; // Obtener parqueId desde parque si existe
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


  const handleDateChange = (date) => {
    setFechaSeleccionada(date);
  };
  

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const formatDateToDisplay = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleHorarioClick = (canchaId, horario) => {
    setHorariosSeleccionados((prev) => {
      const canchaExistente = prev.find((item) => item.canchaId === canchaId);
      
      if (canchaExistente) {
        const horariosActualizados = [...canchaExistente.horarios];
        const index = horariosActualizados.indexOf(horario);
        
        if (index !== -1) {
          horariosActualizados.splice(index, 1);
        } else {
          if (horariosActualizados.length >= 2) {
            Swal.fire({
              title: "Error",
              text: "No puede seleccionar más de dos horarios en una sola cancha",
              icon: "warning",
              confirmButtonText: "Aceptar",
            });
            return prev;
          }
          horariosActualizados.push(horario);
        }
        
        return prev.map((item) => 
          item.canchaId === canchaId ? { ...item, horarios: horariosActualizados } : item
        );
      } else {
        return [...prev, { canchaId, horarios: [horario] }];
      }
    });
  };

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        if (!parqueId) {
          setError("Faltan datos de parque.");
          setLoading(false);
          return;
        }

        const responseCanchas = await axios.get(`http://localhost:8000/canchas?parqueId=${parqueId}`);
        setCanchas(responseCanchas.data);

        const fechaFormateada = formatDate(fechaSeleccionada);
        const responseReservas = await axios.get(
          `http://localhost:8000/reservas?parqueId=${parqueId}&fecha=${fechaFormateada}`
        );
        setReservas(responseReservas.data);
        setLoading(false);
      } catch (error) {
        setError("No se pudieron cargar las canchas o las reservas.");
        setLoading(false);
      }
    };

    fetchDatos();
  }, [parqueId, fechaSeleccionada]);

  const normalizeDate = (date) => {
    const dateObj = new Date(date);
    return dateObj.toISOString().split('T')[0];
  };

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

  const crearReserva = async () => {
    if (!usuarioId) {
        console.error("Error: usuarioId es undefined o null.");
        return;
    }

    // Log para verificar los datos antes de enviarlos
    console.log("Datos para la reserva:");
    console.log("parqueId:", parqueId);
    console.log("fecha:", formatDate(fechaSeleccionada)); // Verificar formato correcto de la fecha
    console.log("usuarioId:", usuarioId);
    console.log("horariosSeleccionados:", horariosSeleccionados);

    // Verificar que tenemos los datos necesarios
    if (!fechaSeleccionada || !parqueId || !horariosSeleccionados.length) {
        console.error("Faltan datos para crear la reserva.");
        return;
    }

    // Agregar T05:00:00.000+00:00 a la fecha seleccionada
    const fechaFormateada = new Date(fechaSeleccionada);
    const fechaFinal = formatDate(fechaSeleccionada); // Solo el formato YYYY-MM-DD


    // Crear la estructura de los datos para enviar al servidor
    const horarios = horariosSeleccionados.flatMap(item => item.horarios);  // Obtener todos los horarios seleccionados

    // Log para verificar los datos que serán enviados
    console.log("Enviando datos al servidor para crear la reserva:", {
        parqueId,
        fecha: fechaFinal, // Usar fecha formateada
        usuarioId,
        canchaId: horariosSeleccionados[0]?.canchaId, // Usar el canchaId de la primera selección
        horarios, // Array de horarios
    });

    try {
        // Enviar la solicitud POST al servidor
        const response = await axios.post('http://localhost:8000/reservas', {
          parqueId,
          fecha: fechaFinal, // Usar fecha formateada
          usuarioId,
          canchaId: horariosSeleccionados[0]?.canchaId, // Usar el canchaId de la primera selección
          horarios, // Array de horarios
      }, {
          headers: obtenerHeadersConToken() // Usar los encabezados con el token
      });
      

        console.log('Reserva creada exitosamente:', response.data);
        setSetReservaCreada(true);

        window.dispatchEvent(new Event("reservaCreada"));
        navigate('/HomeUser');
    } catch (error) {
        // Mostrar error detallado
        console.error('Error al crear la reserva:', error.response?.data || error.message);
    }
};



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
                    <div key={cancha._id}>
                      <h4 className="cancha-nombre">{cancha.nombre}</h4>
                      <div className="horarios-container">
                        {cancha.horarios && cancha.horarios.length > 0 ? (
                          cancha.horarios.map((horario, index) => {
                            const estaReservado =
                              horariosReservadosPorCancha[cancha._id]?.includes(horario);
                            const estaSeleccionado = horariosSeleccionados.some(item => item.canchaId === cancha._id && item.horarios.includes(horario));

                            return (
                              <button
                                key={index}
                                className={`horario-button ${estaReservado ? "reservado" : ""} ${estaSeleccionado ? "seleccionado" : ""}`}
                                style={{
                                  backgroundColor: estaReservado ? "#fd2b2b" : (estaSeleccionado ? "#ffcc00" : "#4CAF50"),
                                }}
                                disabled={estaReservado}
                                onClick={() => handleHorarioClick(cancha._id, horario)}
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
        
        {/* Botón para realizar la reserva */}
        <button onClick={crearReserva} className="btn-reservar">
          Reservar
        </button>
        
      </div>
    </div>
  );
}

export default UsDisponibilidadH;
