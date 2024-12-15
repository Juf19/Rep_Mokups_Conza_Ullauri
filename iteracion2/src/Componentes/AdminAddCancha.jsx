import React from 'react';
import ItemHeaderA from './ItemHeaderA';
import ItemBajoHeader from './ItemBajoHeader';
import axios from 'axios';
import "../Estilos/ActualizarParque.css";
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const AdminAddCancha = () => {
  const navigate = useNavigate();
  const [nuevaCancha, setNuevaCancha] = useState({
    nombre: '',
    descripcion: ''
  });

  const handleAddCancha = (e) => {
    const { name, value } = e.target;
    setNuevaCancha({ ...nuevaCancha, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:3001/canchas`, nuevaCancha)
      .then(response => {
        console.log('Cancha Agregado:', response.data);
        navigate(`/Parque`);
      })
      .catch(error => {
        console.error('Error al agregar la Cancha:', error);
      });
  };

  return (
    <div>
      <ItemHeaderA></ItemHeaderA>
      <ItemBajoHeader></ItemBajoHeader>
      <h3>Agregar Cancha</h3>
      <form onSubmit={handleSubmit}>
    <div className="parque-informacion">
    
      <div className="perfil-item">
        <label>Nombre</label>
        <input type="text" name="nombre" className="perfil-dato" value={nuevaCancha.nombre} onChange={handleAddCancha} />
      </div>
      <div className="perfil-item">
        <label>Descripcion</label>
        <input type="text" name="descripcion" className="perfil-dato" value={nuevaCancha.descripcion} onChange={handleAddCancha}/>
      </div>
      <div className="parte-btn">
      <button type="submit" className="btn-save">Guardar</button>
      </div>
    
    </div>
    </form>
    </div>
  );
};

export default AdminAddCancha;