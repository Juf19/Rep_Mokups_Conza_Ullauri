import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ItemHeader from './ItemHeader';
import ItemBajoHeader from './ItemBajoHeader';
import MapContainer from './MapContainer';
import axios from 'axios';

const UsSeleccionarCancha = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { parque, usuarioId } = location.state || {}; // Recibir usuarioId
    console.log("UsuarioId:", usuarioId);

    const [canchas, setCanchas] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token'); // Obtener el token desde el localStorage

    // Obtener encabezados con el token
    const obtenerHeadersConToken = () => {
        if (!token) {
            throw new Error("No se encontró el token de autorización.");
        }
        return {
            Authorization: `Bearer ${token}`  // Retornar el encabezado con el token
        };
    };

    useEffect(() => {
        const fetchCanchas = async () => {
            try {
                const response = await axios.get('http://localhost:8000/canchas', {
                    headers: obtenerHeadersConToken() // Usar los encabezados con el token
                });
                const canchasFiltradas = response.data.filter(
                    cancha => String(cancha.idParque).trim() === String(parque._id).trim()
                );
                setCanchas(canchasFiltradas);
                setLoading(false);
            } catch (error) {
                console.error('Error al cargar las canchas:', error);
                setLoading(false);
            }
        };

        if (parque) {
            fetchCanchas();
        }
    }, [parque, token]);

    const ubicaciones = {
        "C-F1": { top: "30%", left: "53%" },
        "C-F2": { top: "25%", left: "47%" },
        "C-F3": { top: "55%", left: "50%" },
        "C-B1": { top: "60%", left: "35%" },
    };

    return (
        <div className="App">
            <ItemHeader />
            <ItemBajoHeader nombre={parque?.nombre || 'Parque no especificado'} />
            <div className="app-container">
                <MapContainer />
                {loading ? (
                    <p>Cargando canchas...</p>
                ) : (
                    canchas.map((cancha) => (
                        <button
                            key={cancha._id}
                            className="cancha"
                            style={ubicaciones[cancha.nombre] || {}}
                            onClick={() =>
                                navigate('/reserva', { state: { parque, cancha, usuarioId } }) // Pasamos usuarioId
                            }
                        >
                            {cancha.nombre} {cancha.tipo === "Futbol" ? "⚽" : "🏀"}
                        </button>
                    ))
                )}
            </div>
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <button
                    className="boton-disponibilidad"
                    onClick={() => navigate('/Disponibilidad', { state: { parque, usuarioId } })} // Pasamos usuarioId
                >
                    Disponibilidad
                </button>
            </div>
        </div>
    );
};

export default UsSeleccionarCancha;
