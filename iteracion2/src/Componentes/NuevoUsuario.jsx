import React, { useState } from "react";
import ItemHeaderA from "./ItemHeaderA";
import ItemBajoHeader from "./ItemBajoHeader";
import BotonConFlecha from "./BotonConFlecha";



const NuevoUsuario = () => {
  const [selectedParque, setSelectedParque] = useState("");

  const handleParqueChange = (event) => {
    setSelectedParque(event.target.value);
  };

  return (
    <div>
    <ItemHeaderA></ItemHeaderA>
        <ItemBajoHeader></ItemBajoHeader>
    <div className="parques-container">
        
      <h1>USUARIOS</h1>
      <button className="nuevo-parque-btn">Nuevo Usuario</button>
      <div className="selector-container">
        <label htmlFor="parque-select">Selecciona un usuario</label>
        <select
          id="parque-select"
          className="parque-select"
          onChange={handleParqueChange}
        >
          <option value="">-- Selecciona un usuario --</option>
          <option value="Jhuliet Conza">Jhuliet Conza</option>
          <option value="Jose Perez">Jose Perez</option>
          <option value="Andres Romero">Andres Romero</option>
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

export default NuevoUsuario;
