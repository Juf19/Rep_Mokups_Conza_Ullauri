import React from 'react';
import ItemHeader from './ItemHeader';
import ItemBajoHeader from './ItemBajoHeader';
import axios from 'axios';
import "../Estilos/ActualizarParque.css";
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ActualizarParque = () => {
  const navigate = useNavigate();
  const [parques, setParques] = useState({
    id: '',
    nombre: '',
    descripcion: '',
  });
  const { id } = useParams();
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setParques(prevsetParques => ({
      ...prevsetParques,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3001/parques/${id}`, parques)
      .then(response => {
        console.log('setParques actualizado:', response.data);
        // navigate(`/setParquess/${id}`);
        navigate(`/`);
      })
      .catch(error => {
        console.error('Error al actualizar el setParques:', error);
      });
  };

  return (
    <div>
    <div className="parque-informacion">
      <div className="perfil-item">
        <label>Nombre</label>
        <input type="text" className="perfil-dato" placeholder="Nombre del parque" />
      </div>
      <div className="perfil-item">
        <label>Descripcion</label>
        <input type="email" className="perfil-dato" placeholder="Descripción del parque" />
      </div>
      <div className="perfil-item">
        <label>URL</label>
        <input type="text" className="perfil-dato" placeholder="URL del parque" />
      </div>
      <div className="parte-btn">
        <button className="btn-actualizar" onClick={handleSubmit}>Actualizar</button>
      </div>
    </div>
    </div>
  );
};

export default ActualizarParque;