import React, { useEffect, useState } from "react";
import axios from "axios";
import ItemHeader from './ItemHeader';
import ItemBajoHeader from './ItemBajoHeader';
import { useNavigate, useLocation } from 'react-router-dom';

const texto = [{ nombre: "RESERVAS" }];

function UsReservas() {
    const navigate = useNavigate();
    const location = useLocation();
    
    // Obtener usuarioId del estado de navegación o localStorage
    const [usuarioId] = useState(() => {
        return location.state?.usuarioId || localStorage.getItem("usuarioId");
    });

    // Estado para las reservas
    const [reservas, setReservas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Guardar usuarioId en localStorage si no está almacenado
    useEffect(() => {
        if (usuarioId) {
            localStorage.setItem("usuarioId", usuarioId);
        }
    }, [usuarioId]);

    // Recuperar reservas del usuario
    useEffect(() => {
        const fetchReservas = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/reservas/usuario/${usuarioId}`);
                console.log("Reservas obtenidas:", response.data);
                setReservas(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error al obtener las reservas:", error);
                setError("No se pudieron cargar las reservas.");
                setLoading(false);
            }
        };
    
        if (usuarioId) {
            fetchReservas();
        }
    
    }, [usuarioId, location.state?.nuevaReserva]);  // Dependencia adicional para actualizar cuando haya una nueva reserva
    

    const formatDate = (date) => {
        const newDate = new Date(date);
        return newDate.toISOString().split('T')[0];
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
                                <tr key={index}>
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
                <div className='derecha'>
                    <button className='rojo'>Cerrar Sesion</button>
                </div>
            </div>
        </div>
    );
}

export default UsReservas;
