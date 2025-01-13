import React, { useState } from "react";
import Calendar from "react-calendar";
import ItemHeader from "./ItemHeader";
import ItemBajoHeader from "./ItemBajoHeader";
import HorariosMok from "./HorariosMok";
import "react-calendar/dist/Calendar.css";

const texto = [{ nombre: "HORARIO" }];

function UsDisponibilidadH() {
  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());

  const handleDateChange = (date) => {
    setFechaSeleccionada(date);
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
            Fecha seleccionada: {fechaSeleccionada.toLocaleDateString()}
          </p>
        </div>
        <div className="us-disponibilidad-right">
          <HorariosMok />
        </div>
      </div>
      </div>
    </div>
  );
}

export default UsDisponibilidadH;
