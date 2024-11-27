import React from "react";
import ItemBajoHeader from "./ItemBajoHeader";
import ItemHeaderA from "./ItemHeaderA";


const HomeAdmin = () => {
  return (
    <div className="App">
      <ItemHeaderA></ItemHeaderA>
      <ItemBajoHeader></ItemBajoHeader>
    <div className="container1">
      <div className="sidebar">
        <div className="icon">
          <img
            src="Parque.jpeg" 
            alt="Parque"
          />
        </div>
        <div className="icon">
          <img
            src="Cancha.jpeg" 
            alt="Cancha"
          />
        </div>
        <div className="icon">
          <img
            src="Usuario.jpeg" 
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
