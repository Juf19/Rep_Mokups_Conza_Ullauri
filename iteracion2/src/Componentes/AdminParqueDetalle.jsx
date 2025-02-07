import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ItemHeaderA from './ItemHeaderA';
import ItemBajoHeader from './ItemBajoHeader';
import "../Estilos/AdminParqueDetalle.css";

const AdminParqueDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [parques, setParques] = useState({
    nombre: '',
    descripcion: '',
    url: ''
  });

  const token = localStorage.getItem('token');  

  // Obtener encabezados con el token
  const obtenerHeadersConToken = () => {
    if (!token) {
      throw new Error("No se encontró el token de autorización.");
    }
    return {
      Authorization: `Bearer ${token}`  
    };
  };

  useEffect(() => {
    if (token) {  
      axios
        .get(`http://localhost:8000/parques/${id}`, {
          headers: obtenerHeadersConToken()  
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
      <ItemHeaderA />
      <ItemBajoHeader />
      <h1 id="titulos">Detalle del Parque</h1>
      <div className="form-container">
        {/* Imagen del parque */}
        <div className="parque-image">
          <img
            src={parques.url} 
            alt="Imagen del Parque"
            className="img-parque"
          />
        </div>
        <form className="form">
         
          <div className="datos">
            <div className="form-group">
              <label>Nombre:</label>
              <input type="text" name="nombre" className="in" value={parques.nombre} readOnly />
            </div>
            <div className="form-group">
              <label>Descripción:</label>
              <input type="text" name="descripcion" className="in" value={parques.descripcion} readOnly />
            </div>
            <div className="form-group">
              <label>URL de la Imagen:</label>
              <input type="text" name='url' className="in" value={parques.url} readOnly />
            </div>
            <button className="btn-save" onClick={() => navigate('/Parque')} type="button">
              Aceptar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminParqueDetalle;
