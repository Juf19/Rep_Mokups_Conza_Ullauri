import React from "react";
import ItemBajoHeader from "./ItemBajoHeader";
import ItemHeader from "./ItemHeader";
import BotonConFlecha from "./BotonConFlecha";

const UsReservas = () => {
    // Datos ficticios de la tabla
    const reservas = [
        { fecha: "30/10/2024", parque: "La Carolina", cancha: "C-F1", horas: ["11-12", "12-13"] },
        { fecha: "26/10/2024", parque: "La Carolina", cancha: "C-B1", horas: ["11-12", "12-13"] },
        { fecha: "10/11/2024", parque: "Inglés", cancha: "I-F1", horas: ["11-12", "12-13"] },
        { fecha: "28/10/2024", parque: "Alameda", cancha: "A-B5", horas: ["11-12", "12-13"] },
    ];

    return (
        <div>
            <ItemHeader></ItemHeader>
            <ItemBajoHeader></ItemBajoHeader>
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
                        {reservas.map((reserva, index) => (
                            <tr key={index}>
                                <td>{reserva.fecha}</td>
                                <td>{reserva.parque}</td>
                                <td>{reserva.cancha}</td>
                                <td>
                                    {reserva.horas.map((hora, idx) => (
                                        <div key={idx}>{hora}</div>
                                    ))}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <BotonConFlecha></BotonConFlecha>
            </div>
        </div>
    );
};

export default UsReservas;
