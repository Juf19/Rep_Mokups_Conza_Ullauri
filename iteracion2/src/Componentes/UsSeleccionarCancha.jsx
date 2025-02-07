import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { GoogleMap, LoadScript, OverlayView } from '@react-google-maps/api';
import ItemHeader from './ItemHeader';
import ItemBajoHeader from './ItemBajoHeader';
import axios from 'axios';

const UsSeleccionarCancha = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { parque, usuarioId } = location.state || {};
    const [canchas, setCanchas] = useState([]);
    const [loading, setLoading] = useState(true);
    const mapRef = useRef(null);
    const markersRef = useRef([]);
    const token = localStorage.getItem('token');

    const obtenerHeadersConToken = () => {
        if (!token) throw new Error("No se encontró el token de autorización.");
        return { Authorization: `Bearer ${token}` };
    };

    useEffect(() => {
        const fetchCanchas = async () => {
            try {
                const response = await axios.get('http://localhost:8000/canchas', {
                    headers: obtenerHeadersConToken()
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

        if (parque) fetchCanchas();
    }, [parque, token]);

    const handleMapLoad = (map) => {
        mapRef.current = map;
        agregarMarcadores();
    };

    const agregarMarcadores = () => {
        if (!mapRef.current || !window.google) return;

        markersRef.current.forEach(marker => marker.setMap(null));
        markersRef.current = [];

        canchas.forEach(cancha => {
            const lat = parseFloat(cancha.latitud);
            const lng = parseFloat(cancha.longitud);
            if (!isNaN(lat) && !isNaN(lng)) {
                const marker = new window.google.maps.Marker({
                    position: { lat, lng },
                    map: mapRef.current,
                    title: cancha.nombre,
                });
                marker.addListener('click', () => {
                    navigate('/reserva', { state: { parque, cancha, usuarioId } });
                });
                markersRef.current.push(marker);
            }
        });
    };

    return (
        <div className="App">
            <ItemHeader />
            <ItemBajoHeader nombre={parque?.nombre || 'Parque no especificado'} />
            <div className="app-container">
                <LoadScript googleMapsApiKey="AIzaSyDcw4n3APLA58T-j2C_l6g5qhKtK_hpNss">
                    <GoogleMap
                        mapContainerStyle={{ width: '100%', height: '730px' }}
                        center={{ lat: -0.178880, lng: -78.482560 }}
                        zoom={18}
                        onLoad={handleMapLoad}
                    >
                        {!loading &&
                            canchas.map((cancha) => {
                                const lat = parseFloat(cancha.latitud);
                                const lng = parseFloat(cancha.longitud);
                                if (isNaN(lat) || isNaN(lng)) return null;

                                return (
                                    <OverlayView
                                        key={cancha._id}
                                        position={{ lat, lng }}
                                        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                                    >
                                        <button
                                            className="cancha"
                                            style={{
                                                backgroundColor: 'rgba(0, 0, 0, 0.7)', // Negro con transparencia
                                                color: 'white',
                                                border: 'none',
                                                padding: '8px 12px',
                                                cursor: 'pointer',
                                                borderRadius: '5px',
                                                position: 'absolute',
                                                transform: 'translate(-50%, -50%)',
                                                fontWeight: 'bold'
                                            }}
                                            onClick={() => navigate('/reserva', { state: { parque, cancha, usuarioId } })}
                                        >
                                            {cancha.nombre} {cancha.tipo === "Futbol" ? "⚽" : "🏀"}
                                        </button>
                                    </OverlayView>
                                );
                            })}
                    </GoogleMap>
                </LoadScript>
            </div>
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <button
                    className="boton-disponibilidad"
                    onClick={() => navigate('/Disponibilidad', { state: { parque, usuarioId } })}
                >
                    Disponibilidad
                </button>
            </div>
        </div>
    );
};

export default UsSeleccionarCancha;
