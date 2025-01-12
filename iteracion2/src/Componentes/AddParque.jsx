import React from 'react';
import ItemHeaderA from './ItemHeaderA';
import ItemBajoHeader from './ItemBajoHeader';
import axios from 'axios';
import "../Estilos/ActualizarParque.css";
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const AddParque = () => {
  const navigate = useNavigate();
  const [nuevoParque, setNuevoParque] = useState({
    nombre: '',
    descripcion: '',
    url: ''
  });

  const handleAddParque = (e) => {
    const { name, value } = e.target;
    setNuevoParque({ ...nuevoParque, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:8000/parques`, nuevoParque)
      .then(response => {
        console.log('Parque Agregado:', response.data);
        navigate(`/Parque`);
      })
      .catch(error => {
        console.error('Error al agregar el Parque:', error);
      });
  };

  return (
    <div>
      <ItemHeaderA></ItemHeaderA>
      <ItemBajoHeader></ItemBajoHeader>
      <h3>Agregar Parque</h3>
      <form onSubmit={handleSubmit}>
    <div className="parque-informacion">
    
      <div className="perfil-item">
        <label>Nombre</label>
        <input type="text" name="nombre" className="perfil-dato" value={nuevoParque.nombre} onChange={handleAddParque} />
      </div>
      <div className="perfil-item">
        <label>Descripcion</label>
        <input type="text" name="descripcion" className="perfil-dato" value={nuevoParque.descripcion} onChange={handleAddParque}/>
      </div>
      <div className="perfil-item">
        <label>URL</label>
        <input type="text" name='url' className="perfil-dato" value={nuevoParque.url} onChange={handleAddParque}/>
      </div>
      <div className="parte-btn">
      <button type="submit" className="btn-save">Guardar</button>
      </div>
    
    </div>
    </form>
    </div>
  );
};

export default AddParque;