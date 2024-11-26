import React, { useState } from "react";
import ItemHeaderA from "./ItemHeaderA";
import ItemBajoHeader from "./ItemBajoHeader";
import BotonConFlecha from "./BotonConFlecha";


const NuevoParque = () => {
  const [selectedParque, setSelectedParque] = useState("");

  const handleParqueChange = (event) => {
    setSelectedParque(event.target.value);
  };

  return (
    <div>
    <ItemHeaderA></ItemHeaderA>
        <ItemBajoHeader></ItemBajoHeader>
    <div className="parques-container">
        
      <h1>PARQUES</h1>
      <button className="nuevo-parque-btn">Nuevo Parque</button>
      <div className="selector-container">
        <label htmlFor="parque-select">Selecciona un parque</label>
        <select
          id="parque-select"
          className="parque-select"
          onChange={handleParqueChange}
        >
          <option value="">-- Selecciona un parque --</option>
          <option value="La Carolina">La Carolina</option>
          <option value="Parque Metropolitano">Parque Metropolitano</option>
          <option value="Parque El Ejido">Parque El Ejido</option>
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

export default NuevoParque;
