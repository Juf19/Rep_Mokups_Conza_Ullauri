import React from "react";
import ItemHorarios from "./ItemHorarios";


const UsDisponibilidadH = () => {
  return (
    <div className="us-disponibilidad">
      <div className="disponibilidad-container">
        {["C-F1", "C-F2", "C-B1", "C-B2", "C-B3"].map((cancha, index) => (
          <div key={index} className="disponibilidad-row">
            <label className="disponibilidad-label">{`Cancha ${cancha}`}</label>
            <ItemHorarios />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsDisponibilidadH;
