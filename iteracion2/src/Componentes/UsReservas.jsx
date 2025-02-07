import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from 'sweetalert2'; // Importa SweetAlert2
import ItemHeader from './ItemHeader';
import ItemBajoHeader from './ItemBajoHeader';

const texto = [{ nombre: "RESERVAS" }];

function UsReservas() {
    const navigate = useNavigate();
    const location = useLocation();

    // Obtener usuarioId del estado de navegación o localStorage
    const [usuarioId, setUsuarioId] = useState(() => {
        return location.state?.usuarioId || localStorage.getItem("usuarioId");
    });

    const [reservas, setReservas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [reservaSeleccionada, setReservaSeleccionada] = useState(null); // Para almacenar la reserva seleccionada
    const [puedeCancelar, setPuedeCancelar] = useState(false); // Estado para determinar si se puede cancelar

    // Guardar usuarioId en localStorage si no está almacenado
    useEffect(() => {
        console.log("Verificando usuarioId en useEffect:", usuarioId);
        
        if (usuarioId) {
            localStorage.setItem("usuarioId", usuarioId);
        }
    }, [usuarioId]);
    
    // Detectar si location.state solicita actualización
    useEffect(() => {
        if (location.state?.actualizarReservas) {
            setPuedeCancelar(true); // Se activa la actualización de reservas
        }
    }, [location.state?.actualizarReservas]);

    // Recuperar reservas del usuario
    useEffect(() => {
        console.log("Cargando reservas para usuarioId:", usuarioId);
    
        if (!usuarioId) {
            console.error("Error: usuarioId es undefined o null en UsReservas");
            setError("No se pudo cargar el usuario. Por favor, inicie sesión nuevamente.");
            setLoading(false);
            return;
        }
    
        const fetchReservas = async (intentos = 5) => {
            for (let i = 0; i < intentos; i++) {
                try {
                    console.log(`Intento ${i + 1}: Cargando reservas para usuarioId:`, usuarioId);
                    
                    // Obtener el token desde localStorage
                    const token = localStorage.getItem("token");

                    // Realizar la solicitud con el token de autorización
                    const response = await axios.get(`http://localhost:8000/reservas/usuario/${usuarioId}`, {
                        headers: {
                            Authorization: `Bearer ${token}`  // Enviar el token en los encabezados
                        }
                    });

                    if (response.data.length > 0) {
                        console.log("Reservas obtenidas:", response.data);
                        setReservas(response.data);
                        setLoading(false);
                        return;
                    }
                } catch (error) {
                    console.error(`Error al obtener reservas (intento ${i + 1}):`, error);
                }
                
                await new Promise((resolve) => setTimeout(resolve, 1000)); // Esperar 1 segundo antes de reintentar
            }
        
            setError("No se pudieron cargar las reservas.");
            setLoading(false);
        };
        
        fetchReservas();
    
        const handleReservaCreada = () => {
            console.log("Evento reservaCreada detectado. Actualizando reservas...");
            fetchReservas();
        };
    
        window.addEventListener("reservaCreada", handleReservaCreada);
    
        return () => {
            window.removeEventListener("reservaCreada", handleReservaCreada);
        };
    }, [usuarioId]);
    
    const formatDate = (date) => {
        const newDate = new Date(date);
        return newDate.toISOString().split('T')[0];
    };

    const handleRowClick = (reserva) => {
        setReservaSeleccionada(reserva);
        
        // Verificar si se puede cancelar la reserva
        const ahora = new Date();
        const fechaReserva = new Date(reserva.fecha);
        const diferenciaEnHoras = (fechaReserva.getTime() - ahora.getTime()) / (1000 * 60 * 60);
        
        setPuedeCancelar(diferenciaEnHoras > 24);
    };

    const handleCancelarReserva = async () => {
    
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¡Una vez cancelado no podra revertir la cancelación!",
            icon: 'warning',
            showCancelButton: true,
           
            confirmButtonText: 'Sí, cancelar reserva!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                const token = localStorage.getItem("token");
                axios.delete(`http://localhost:8000/reservas/${reservaSeleccionada._id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then(() => {
                    Swal.fire(
                        '¡Cancelada!',
                        'La reserva ha sido cancelada con éxito.',
                        'success'
                    );
                    setReservas(reservas.filter(reserva => reserva._id !== reservaSeleccionada._id));
                    setReservaSeleccionada(null); // Limpiar la selección después de cancelar
                    setPuedeCancelar(false); // Ocultar el botón después de cancelar
                })
                .catch((error) => {
                    console.error("Error al cancelar la reserva:", error);
                    Swal.fire({
                        icon: 'error',
                        title: '¡Error!',
                        text: 'Hubo un error al cancelar la reserva.',
                    });
                });
            }
        });
    };

    return (
        <div className="App">
            <ItemHeader />
            <ItemBajoHeader nombre={texto[0].nombre} />
            <div style={{ padding: "20px" }}>
                {loading ? (
                    <p>Cargando reservas...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : reservas.length > 0 ? (
                    <table className="tabla-reservas">
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Parque</th>
                                <th>Cancha</th>
                                <th>Horas</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reservas.map((reserva, index) => (
                                <tr
                                    key={index}
                                    onClick={() => handleRowClick(reserva)}
                                    style={{ 
                                        cursor: 'pointer',
                                        backgroundColor: reservaSeleccionada?._id === reserva._id ? 'lightblue' : 'white' 
                                    }}
                                >
                                    <td>{formatDate(reserva.fecha)}</td>
                                    <td>{reserva.parqueId ? reserva.parqueId.nombre : "Desconocido"}</td>
                                    <td>{reserva.canchaId ? reserva.canchaId.nombre : "Desconocido"}</td>
                                    <td>{reserva.horarios.join(", ")}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No hay reservas disponibles.</p>
                )}
            </div>
            <div className="espacio">
                <div>
                    <button className="reserva-button" 
                        onClick={() => navigate('/ListaParques', { state: { usuarioId } })}>
                        Reservar
                    </button>
                </div>
                {puedeCancelar && (
                    <div className='derecha'>
                        <button className='rojo' onClick={handleCancelarReserva}>Cancelar Reserva</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default UsReservas
