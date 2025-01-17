import React from "react";
import ItemHeader from './ItemHeader';
import ItemBajoHeader from './ItemBajoHeader';
import { useNavigate, useLocation } from 'react-router-dom';

const texto = [{ nombre: "RESERVAS" }];

function UsReservas() {
    const navigate = useNavigate();
    const location = useLocation();

    // Recibir los datos enviados desde UsConfirmacion
    const { parque, cancha, horariosSeleccionados, fecha } = location.state || {};

    // Asegúrate de tener los valores correctos o usa un valor por defecto
    const parqueNombre = parque?.nombre || "No disponible";
    const canchaNombre = cancha?.nombre || "No disponible";
    const horas = horariosSeleccionados?.join(", ") || "No disponible";

    // Crear la lista de reservas si existen los datos
    const reservas = parqueNombre && canchaNombre && horariosSeleccionados && fecha ? [
        { fecha, parque: parqueNombre, cancha: canchaNombre, horas }
    ] : [];

    return (
        <div className="App">
            <ItemHeader />
            <ItemBajoHeader nombre={texto[0].nombre} />
            <div style={{ padding: "20px" }}>
                <table className="tabla-reservas">
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Parque</th>
                            <th>Número de cancha</th>
                            <th>Horas</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservas.length > 0 ? (
                            reservas.map((reserva, index) => (
                                <tr key={index}>
                                    <td>{reserva.fecha}</td>
                                    <td>{reserva.parque}</td>
                                    <td>{reserva.cancha}</td>
                                    <td>{reserva.horas}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">No hay reservas disponibles</td>
                            </tr>
                        )}
                    </tbody>
                </table>
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
