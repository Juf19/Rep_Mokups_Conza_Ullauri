import React, { useState } from "react";
import ItemHeaderA from "./ItemHeaderA";
import ItemBajoHeader from "./ItemBajoHeader";
import BotonConFlecha from "./BotonConFlecha";


const NuevaCancha = () => {
  const [selectedParque, setSelectedParque] = useState("");

  const handleParqueChange = (event) => {
    setSelectedParque(event.target.value);
  };

  return (
    <div>
    <ItemHeaderA></ItemHeaderA>
        <ItemBajoHeader></ItemBajoHeader>
    <div className="parques-container">
        
      <h1>Canchas</h1>
      <button className="nuevo-parque-btn">Nueva Cancha</button>
      <div className="selector-container">
        <label htmlFor="parque-select">Selecciona una cancha</label>
        <select
          id="parque-select"
          className="parque-select"
          onChange={handleParqueChange}
        >
          <option value="">-- Selecciona una cancha --</option>
          <option value="C-F1">C-F1</option>
          <option value="C-B1">C-B1</option>
          <option value="I-B1">I-B1</option>
        </select>
      </div>
      {selectedParque && (
        <div className="parque-seleccionado">
          <span className="parque-nombre">{selectedParque}</span>
          <button className="editar-btn">Editar</button>
          <button className="eliminar-btn">Eliminar</button>
        </div>
      )}
      
      <BotonConFlecha></BotonConFlecha>
      
    </div>
    </div>
  );
};

export default NuevaCancha;
