import React from 'react';
import ItemHeaderA from './ItemHeaderA';
import ItemBajoHeader from './ItemBajoHeader';
import axios from 'axios';
import "../Estilos/ActualizarParque.css";
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ActualizarParque = () => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setParques(prevParques => ({
      ...prevParques,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3001/parques/${id}`, parques)
      .then(response => {
        console.log('Parques actualizado:', response.data);
        // navigate(`/setParquess/${id}`);
        navigate(`/Parque`);
      })
      .catch(error => {
        console.error('Error al actualizar el Parques:', error);
      });
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