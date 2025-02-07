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
  const token = localStorage.getItem('token');

  // Obtener encabezados con el token
  const obtenerHeadersConToken = () => {
      if (!token) {
          throw new Error("No se encontró el token de autorización.");
      }
      return {
          Authorization: `Bearer ${token}`  // Retornar el encabezado con el token
      };
  };

  // Obtener detalles de la cancha específica
  useEffect(() => {
      if (token) {  // Verificar si el token existe
          axios
              .get(`http://localhost:8000/canchas/${id}`, {
                  headers: obtenerHeadersConToken()  // Usar la función para los encabezados
              })
              .then((response) => {
                  setCancha(response.data);  // Actualiza el estado con la cancha
              })
              .catch((error) => {
                  console.error("Error al obtener la cancha:", error);
              });
      } else {
          console.error("No se encontró el token de autorización.");
      }
  }, [id, token]); // El useEffect se ejecutará cada vez que cambie `id` o `token`

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
      <div className="perfil-item mb-4">
            <label htmlFor="latitud" className="form-label">Latitud</label>
            <input
              type="text"
              id="latitud"
              name="latitud"
              className="form-control"
              placeholder="Selecione en el mapa"
              value={cancha.latitud}
              disabled={true}
              required
            />

            <label htmlFor="longitud" className="form-label">Longitud</label>
            <input
              type="text"
              id="longitud"
              name="longitud"
              className="form-control"
              placeholder="Selecione en el mapa"
              value={cancha.longitud}
              disabled={true}
              required
            />
          </div>
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
