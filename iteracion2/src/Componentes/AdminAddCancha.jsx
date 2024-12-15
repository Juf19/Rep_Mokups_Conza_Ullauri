import React, { useState } from 'react';
import ItemHeaderA from './ItemHeaderA';
import ItemBajoHeader from './ItemBajoHeader';
import axios from 'axios';
import "../Estilos/ActualizarParque.css";
import { useParams, useNavigate } from 'react-router-dom';

const AdminAddCancha = () => {
  const { id } = useParams(); // Obtener el id del parque actual desde la URL
  const navigate = useNavigate();
  
  const [nuevaCancha, setNuevaCancha] = useState({
    nombre: '',
    descripcion: '',
    idParque: id // Asociar la cancha al parque actual
  });

  // Manejar cambios en los inputs
  const handleAddCancha = (e) => {
    const { name, value } = e.target;
    setNuevaCancha({ ...nuevaCancha, [name]: value });
  };

  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:3001/canchas`, nuevaCancha)
      .then(response => {
        console.log('Cancha Agregada:', response.data);
        navigate(`/Parque`); // Redirigir al listado de canchas del parque
      })
      .catch(error => {
        console.error('Error al agregar la Cancha:', error);
      });
  };

  return (
    <div>
      <ItemHeaderA />
      <ItemBajoHeader />
      <h3>Agregar Cancha</h3>
      <form onSubmit={handleSubmit}>
        <div className="parque-informacion">
          <div className="perfil-item">
            <label>Nombre</label>
            <input
              type="text"
              name="nombre"
              className="perfil-dato"
              value={nuevaCancha.nombre}
              onChange={handleAddCancha}
              required
            />
          </div>
          <div className="perfil-item">
            <label>Descripción</label>
            <input
              type="text"
              name="descripcion"
              className="perfil-dato"
              value={nuevaCancha.descripcion}
              onChange={handleAddCancha}
              required
            />
          </div>
          <div className="parte-btn">
            <button type="submit" className="btn-save">
              Guardar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminAddCancha;
