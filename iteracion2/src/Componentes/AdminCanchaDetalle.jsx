import React, { useState, useEffect } from 'react';
import ItemHeaderA from './ItemHeaderA';
import ItemBajoHeader from './ItemBajoHeader';
import axios from 'axios';
import "../Estilos/AdminParqueDetalle.css";
import { useParams, useNavigate } from 'react-router-dom';

const AdminParqueDetalle = () => {
  const { id } = useParams(); // id de la cancha actual
  const navigate = useNavigate();
  const [canchas, setCanchas] = useState({
    nombre: '',
    descripcion: '',
    idParque: '' // Nuevo campo para mantener la relación con el parque
  });

  // Obtener los detalles de la cancha
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

  // Función para manejar la redirección
  const handleAceptar = () => {
    navigate(`/Parque/${canchas.idParque}/canchas`); // Redirigir al listado de canchas del parque actual
  };

  return (
    <div>
      <ItemHeaderA />
      <ItemBajoHeader />
      <h3>Detalle Cancha</h3>
      <form>
        <div className="parque-informacion">
          <div className="perfil-item">
            <label>Nombre</label>
            <input
              type="text"
              name="nombre"
              className="perfil-dato"
              value={canchas.nombre}
              disabled={true}
            />
          </div>
          <div className="perfil-item">
            <label>Descripción</label>
            <input
              type="text"
              name="descripcion"
              className="perfil-dato"
              value={canchas.descripcion}
              disabled={true}
            />
          </div>
          <div className="parte-btn">
            <button
              type="button"
              className="btn-save"
              onClick={handleAceptar} // Redirigir al listado
            >
              Aceptar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminParqueDetalle;
