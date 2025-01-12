import React, { useState, useEffect } from 'react';
import ItemHeaderA from './ItemHeaderA';
import ItemBajoHeader from './ItemBajoHeader';
import axios from 'axios';
import "../Estilos/AdminParqueDetalle.css";
import { useParams, useNavigate } from 'react-router-dom';

const AdminParqueDetalle = () => {
  const { id } = useParams(); // id de la cancha actual
  const navigate = useNavigate();
  const [cancha, setCancha] = useState({
    nombre: '',
    descripcion: '',
    tipo: '',
    horarios: [],
    dias: [],
    idParque: '' // Nuevo campo para mantener la relación con el parque
  });

  // Obtener los detalles de la cancha
  useEffect(() => {
    axios
      .get(`http://localhost:8000/canchas/${id}`) // URL
      .then((response) => {
        setCancha(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener la cancha:", error);
      });
  }, [id]);

  // Función para manejar la redirección
  const handleAceptar = () => {
    navigate(`/Parque/${cancha.idParque}/canchas`); // Redirigir al listado de canchas del parque actual
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
              className="perfil-dato1"
              value={cancha.nombre}
              disabled={true}
            />
          </div>
          <div className="perfil-item">
            <label>Descripción</label>
            <input
              type="text"
              name="descripcion"
              className="perfil-dato1"
              value={cancha.descripcion}
              disabled={true}
            />
          </div>
          <div className="perfil-item">
            <label>Tipo de Cancha</label>
            <input
              type="text"
              name="tipo"
              className="perfil-dato1"
              value={cancha.tipo}
              disabled={true}
            />
          </div>
          <div className="perfil-item">
            <label>Horarios</label>
            <div className="horarios-list">
              {cancha.horarios.length > 0 ? (
                <ul>
                  {cancha.horarios.map((hora, index) => (
                    <li key={index}>{hora}</li>
                  ))}
                </ul>
              ) : (
                <p>No hay horarios disponibles</p>
              )}
            </div>
          </div>
          <div className="perfil-item">
            <label>Días Disponibles</label>
            <div className="dias-list">
              {cancha.dias.length > 0 ? (
                <ul>
                  {cancha.dias.map((dia, index) => (
                    <li key={index}>{dia}</li>
                  ))}
                </ul>
              ) : (
                <p>No hay días disponibles</p>
              )}
            </div>
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
