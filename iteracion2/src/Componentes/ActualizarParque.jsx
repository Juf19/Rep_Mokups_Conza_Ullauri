import React from 'react';
import ItemHeaderA from './ItemHeaderA';
import ItemBajoHeader from './ItemBajoHeader';
import axios from 'axios';
import "../Estilos/ActualizarParque.css";
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ActualizarParque = () => {
  const { id } = useParams();
  console.log("ID recuperado de useParams:", id); // Agrega esto para depurar
  const navigate = useNavigate();
  const [parques, setParques] = useState({
    _id: '',
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setParques(prevParques => ({
      ...prevParques,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (token) {
      axios.put(`http://localhost:8000/parques/${id}`, parques, {
        headers: obtenerHeadersConToken()  // Usar los encabezados con token
      })
        .then(response => {
          console.log('Parque actualizado:', response.data);
          navigate(`/Parque`);
        })
        .catch(error => {
          console.error('Error al actualizar el Parque:', error);
        });
    } else {
      console.error("No se encontró el token de autorización.");
    }
  };

  return (
    <div>
      <ItemHeaderA></ItemHeaderA>
      <ItemBajoHeader></ItemBajoHeader>
      <h3>Editar Parque</h3>
      <form onSubmit={handleSubmit}>
    <div className="parque-informacion">
    
      <div className="perfil-item">
        <label>Nombre</label>
        <input type="text" name="nombre" className="perfil-dato1" value={parques.nombre} onChange={handleChange} />
      </div>
      <div className="perfil-item">
        <label>Descripcion</label>
        <input type="text" name="descripcion" className="perfil-dato1" value={parques.descripcion} onChange={handleChange}/>
      </div>
      <div className="perfil-item">
        <label>URL</label>
        <input type="text" name='url' className="perfil-dato1" value={parques.url} onChange={handleChange}/>
      </div>
      <div className="parte-btn">
      <button type="submit" className="btn-save">Guardar</button>
      </div>
    
    </div>
    </form>
    </div>
  );
};

export default ActualizarParque;