import React from 'react';
import ItemHeaderA from './ItemHeaderA';
import ItemBajoHeader from './ItemBajoHeader';
import axios from 'axios';
import "../Estilos/ActualizarParque.css";
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const AdminActualizarCancha = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [canchas, setCanchas] = useState({
    id: '',
    nombre: '',
    descripcion: ''
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCanchas(prevCanchas => ({
      ...prevCanchas,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3001/canchas/${id}`, canchas)
      .then(response => {
        console.log('Canchas actualizado:', response.data);
        navigate(`/Parque`);
      })
      .catch(error => {
        console.error('Error al actualizar el Canchas:', error);
      });
  };

  return (
    <div>
      <ItemHeaderA></ItemHeaderA>
      <ItemBajoHeader></ItemBajoHeader>
      <h3>Editar Cancha</h3>
      <form onSubmit={handleSubmit}>
    <div className="parque-informacion">
    
      <div className="perfil-item">
        <label>Nombre</label>
        <input type="text" name="nombre" className="perfil-dato1" value={canchas.nombre} onChange={handleChange} />
      </div>
      <div className="perfil-item">
        <label>Descripcion</label>
        <input type="text" name="descripcion" className="perfil-dato1" value={canchas.descripcion} onChange={handleChange}/>
      </div>
      <div className="parte-btn">
      <button type="submit" className="btn-save">Guardar</button>
      </div>
    
    </div>
    </form>
    </div>
  );
};

export default AdminActualizarCancha;