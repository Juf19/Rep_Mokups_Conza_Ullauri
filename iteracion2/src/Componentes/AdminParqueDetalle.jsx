import React from 'react';
import ItemHeaderA from './ItemHeaderA';
import ItemBajoHeader from './ItemBajoHeader';
import axios from 'axios';
import "../Estilos/ActualizarParque.css";
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const AdminParqueDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [parques, setParques] = useState({
    id: '',
    nombre: '',
    descripcion: '',
    url: ''
  });
  
  useEffect(() => {
    axios
      .get(`http://localhost:3001/parques/${id}`) // URL 
      .then((response) => {
        setParques(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los parques:", error);
      });
  }, [id]);

  return (
    <div>
      <ItemHeaderA></ItemHeaderA>
      <ItemBajoHeader></ItemBajoHeader>
      <h3>Detalle Parque</h3>
      <form>
    <div className="parque-informacion">
    
      <div className="perfil-item">
        <label>Nombre</label>
        <input type="text" name="nombre" className="perfil-dato" value={parques.nombre} disabled={true} />
      </div>
      <div className="perfil-item">
        <label>Descripcion</label>
        <input type="text" name="descripcion" className="perfil-dato" value={parques.descripcion} disabled={true}/>
      </div>
      <div className="perfil-item">
        <label>URL</label>
        <input type="text" name='url' className="perfil-dato" value={parques.url} disabled={true}/>
      </div>
      <div className="parte-btn">
        <button onClick={() => navigate(`/Parque`)} className="btn-actualizar">Aceptar</button>
      </div>
    
    </div>
    </form>
    </div>
  );
};

export default AdminParqueDetalle;

