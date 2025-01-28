import React, { useEffect, useState } from "react";
import axios from "axios";
import ItemHeader from './ItemHeader';
import ItemBajoHeader from './ItemBajoHeader';
import { useNavigate, useLocation } from 'react-router-dom'; // Importa useLocation

const texto = [{ nombre: "RESERVAS" }];

function UsReservas() {
    const navigate = useNavigate();
    const location = useLocation(); // Accede a los datos del estado de navegación
    const { usuarioId } = location.state || {}; // Extrae el usuarioId

    // Estado para las reservas
    const [reservas, setReservas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Recuperar las reservas desde la base de datos al cargar el componente
    useEffect(() => {
        const fetchReservas = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/reservas`, {
                    params: { usuarioId }, // Envía el usuarioId como parámetro
                });
                console.log("Reservas obtenidas:", response.data); // Para depurar
                setReservas(response.data); // Guardamos las reservas en el estado
                setLoading(false); // Terminamos el estado de carga
            } catch (error) {
                console.error("Error al obtener las reservas:", error);
                setError("No se pudieron cargar las reservas."); // Establecemos un error si ocurre
                setLoading(false); // Terminamos el estado de carga
            }
        };

        if (usuarioId) {
            fetchReservas(); // Llama a la función solo si hay un usuarioId disponible
        } else {
            console.error("No se proporcionó usuarioId");
            setError("No se pudo cargar el usuario. Por favor, inicie sesión nuevamente.");
            setLoading(false);
        }
    }, [usuarioId]); // Se ejecuta cuando cambia el usuarioId

    const formatDate = (date) => {
        const newDate = new Date(date);
        return newDate.toISOString().split('T')[0]; // Retorna la fecha en formato "YYYY-MM-DD"
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
                    <button className="reserva-button" onClick={() => navigate('/ListaParques', { state: { usuarioId } })}>Reservar</button>
                </div>
                <div className='derecha'>
                    <button className='rojo'>Cancelar</button>
                </div>
            </div>
        </div>
    );
}

export default UsReservas;
