import React from "react";
import ItemBajoHeader from "./ItemBajoHeader";
import ItemHeaderA from "./ItemHeaderA";


const HomeAdmin = () => {
  return (
    <div>
      <ItemHeaderA></ItemHeaderA>
      <ItemBajoHeader></ItemBajoHeader>
    <div className="container">
      <div className="sidebar">
        <div className="icon">
          <img
            src="Parque.jpeg" // Reemplaza con tu imagen de árbol y banca
            alt="Parque"
          />
        </div>
        <div className="icon">
          <img
            src="Cancha.jpeg" // Reemplaza con tu imagen de cancha
            alt="Cancha"
          />
        </div>
        <div className="icon">
          <img
            src="Usuario.jpeg" // Reemplaza con tu imagen de usuarios
            alt="Usuarios"
          />
        </div>
      </div>
      <div className="buttons">
        <button className="button">PARQUES</button>
        <button className="button">CANCHAS</button>
        <button className="button">USUARIOS</button>
      </div>
    </div>
    </div>
  );
};

export default HomeAdmin;
