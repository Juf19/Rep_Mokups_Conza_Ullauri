import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ItemHeader from './ItemHeader';
import ItemBajoHeader from './ItemBajoHeader';
import MapContainer from './MapContainer';
import axios from 'axios';

const UsSeleccionarCancha = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { parque } = location.state || {}; // Obtener el parque desde el estado
    const [canchas, setCanchas] = useState([]); // Estado para almacenar las canchas
    const [loading, setLoading] = useState(true); // Estado de carga

    useEffect(() => {
        const fetchCanchas = async () => {
            try {
                const response = await axios.get('http://localhost:8000/canchas'); // Obtener todas las canchas
                // Filtrar canchas por idParque, considerando conversiones a texto
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

        fetchCanchas();
    }, [parque]);

    // Definir estilos específicos para cada cancha
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
                            style={ubicaciones[cancha.nombre] || {}} // Ubicación según el nombre de la cancha
                            onClick={() => navigate('/reserva', { state: { cancha } })}
                        >
                            {cancha.nombre} {cancha.tipo === "Futbol" ? "⚽" : "🏀"}
                        </button>
                    ))
                )}
            </div>
        </div>
    );
};

export default UsSeleccionarCancha;
