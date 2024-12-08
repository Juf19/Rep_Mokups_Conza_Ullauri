import React from "react";
import ItemBajoHeader from "./ItemBajoHeader";
import ItemHeaderA from "./ItemHeaderA";
import { useParams, useNavigate } from 'react-router-dom';





const HomeAdmin = () => {
  const navigate=useNavigate();

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
            src="Usuario.jpeg" 
            alt="Usuarios"
          />
        </div>
      </div>
      <div className="buttons">
        <button onClick={()=>{navigate('/Parque')}} className="button">PARQUES</button>
        <button onClick={()=>{navigate('/Usuario')}} className="button">USUARIOS</button>
      </div>
    </div>
    </div>
  );
};

export default HomeAdmin;
