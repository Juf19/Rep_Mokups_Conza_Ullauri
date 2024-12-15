import React from 'react';
import ItemHeaderA from './ItemHeaderA';
import ItemBajoHeader from './ItemBajoHeader';
import axios from 'axios';
import "../Estilos/AdminParqueDetalle.css";
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const AdminParqueDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [canchas, setCanchas] = useState({
    nombre: '',
    descripcion: '',
    url: ''
  });
  
  useEffect(() => {
    axios
      .get(`http://localhost:3001/canchas/${id}`) // URL 
      .then((response) => {
        setCanchas(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener las canchas:", error);
      });
  }, [id]);

  return (
    <div>
      <ItemHeaderA></ItemHeaderA>
      <ItemBajoHeader></ItemBajoHeader>
      <h3>Detalle Cancha</h3>
      <form>
    <div className="parque-informacion">
    
      <div className="perfil-item">
        <label>Nombre</label>
        <input type="text" name="nombre" className="perfil-dato" value={canchas.nombre} disabled={true} />
      </div>
      <div className="perfil-item">
        <label>Descripcion</label>
        <input type="text" name="descripcion" className="perfil-dato" value={canchas.descripcion} disabled={true}/>
      </div>
      <div className="parte-btn">
        <button className="btn-save"onClick={() => navigate(`/Parque`)} >Aceptar</button>
      </div>
    
    </div>
    </form>
    </div>
  );
};

export default AdminParqueDetalle;