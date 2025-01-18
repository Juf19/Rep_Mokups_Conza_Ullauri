import React, { useEffect, useState } from "react";
import axios from "axios";
import ItemHeader from './ItemHeader';
import ItemBajoHeader from './ItemBajoHeader';
import { useNavigate, useLocation } from 'react-router-dom';

const texto = [{ nombre: "RESERVAS" }];

function UsReservas() {
    const navigate = useNavigate();
    const location = useLocation();
    
    // Estado para las reservas
    const [reservas, setReservas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Recibir los datos enviados desde UsConfirmacion
    const { parqueId, canchaId, horariosSeleccionados, fecha } = location.state || {};

    // Recuperar las reservas desde la base de datos al cargar el componente
    useEffect(() => {
        if (!parqueId || !canchaId || !horariosSeleccionados || !fecha) {
            return; // Si no se tienen los datos necesarios no hace la solicitud
        }

        axios
            .get('http://localhost:8000/reservas') // Suponiendo que tu API está en este puerto
            .then((response) => {
                setReservas(response.data); // Guardamos las reservas en el estado
                setLoading(false); // Terminamos el estado de carga
            })
            .catch((error) => {
                console.error("Error al obtener las reservas", error);
                setError("No se pudieron cargar las reservas."); // Establecemos un error si ocurre
                setLoading(false); // Terminamos el estado de carga
            });
    }, [parqueId, canchaId, horariosSeleccionados, fecha]);

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
                ) : (
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
                            {reservas.length > 0 ? (
                                reservas.map((reserva, index) => (
                                    <tr key={index}>
                                        <td>{formatDate(reserva.fecha)}</td>
                                        <td>{reserva.parqueId ? reserva.parqueId.nombre : "Desconocido"}</td>
                                        <td>{reserva.canchaId ? reserva.canchaId.nombre : "Desconocido"}</td>
                                        <td>{reserva.horarios.join(", ")}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4">No hay reservas disponibles</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
            <div className="espacio">
                <div>
                    <button className="reserva-button" onClick={() => navigate('/ListaParques')}>Reservar</button>
                </div>
                <div className='derecha'>
                    <button className='rojo'>Cancelar</button>
                </div>
            </div>
        </div>
    );
}

export default UsReservas;
