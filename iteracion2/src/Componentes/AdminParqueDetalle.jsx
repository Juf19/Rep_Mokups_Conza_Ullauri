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
  const [parques, setParques] = useState({
    nombre: '',
    descripcion: '',
    url: ''
  });
  
  const token = localStorage.getItem('token');  // Obtener token desde el localStorage

  // Obtener encabezados con el token
  const obtenerHeadersConToken = () => {
    if (!token) {
      throw new Error("No se encontró el token de autorización.");
    }
    return {
      Authorization: `Bearer ${token}`  // Retornar el encabezado con el token
    };
  };

  useEffect(() => {
    if (token) {  // Verificar si el token existe
      axios
        .get(`http://localhost:8000/parques/${id}`, {
          headers: obtenerHeadersConToken()  // Usar los encabezados con token
        })
        .then((response) => {
          setParques(response.data);
        })
        .catch((error) => {
          console.error("Error al obtener los parques:", error);
        });
    } else {
      console.error("No se encontró el token de autorización.");
    }
  }, [id, token]);

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
        <button className="btn-save"onClick={() => navigate(`/Parque`)} >Aceptar</button>
      </div>
    
    </div>
    </form>
    </div>
  );
};

export default AdminParqueDetalle;

