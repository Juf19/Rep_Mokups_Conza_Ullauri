import React, { useState, useEffect } from "react";
import axios from 'axios';
import ItemHeaderA from "./ItemHeaderA";
import ItemBajoHeader from "./ItemBajoHeader";
import { useNavigate, useParams } from "react-router-dom";
import "../Estilos/ActualizarParque.css";

const ActualizarParque = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [parque, setParque] = useState({
    _id: "",
    nombre: "",
    descripcion: "",
    url: ""
  });

  const token = localStorage.getItem('token');

  const obtenerHeadersConToken = () => {
    if (!token) {
      throw new Error("No se encontró el token de autorización.");
    }
    return { Authorization: `Bearer ${token}` };
  };

  useEffect(() => {
    if (token) {
      axios.get(`http://localhost:8000/parques/${id}`, {
        headers: obtenerHeadersConToken()
      })
      .then((response) => {
        setParque(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los datos del parque:", error);
      });
    } else {
      console.error("No se encontró el token de autorización.");
    }
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setParque((prevParque) => ({
      ...prevParque,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (token) {
      axios.put(`http://localhost:8000/parques/${id}`, parque, {
        headers: obtenerHeadersConToken()
      })
      .then(() => {
        console.log('Parque actualizado exitosamente');
        navigate(`/Parque`);
      })
      .catch((error) => {
        console.error('Error al actualizar el parque:', error);
      });
    } else {
      console.error("No se encontró el token de autorización.");
    }
  };

  return (
    <div>
      <ItemHeaderA />
      <ItemBajoHeader />
      <div className="form-container">
      <img
            src={parque.url} 
            alt="Imagen del Parque"
            className="imagen-parque1"
          />
        </div>
      <div className="parque-image">
        <form onSubmit={handleSubmit} className="form">
          <div className="datos">
            <div className="form-group">
              <label>Nombre:</label>
              <input type="text" className="in1" name="nombre" value={parque.nombre} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Descripción:</label>
              <input type="text" className="in1" name="descripcion" value={parque.descripcion} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>URL de imagen:</label>
              <input type="text" className="in1" name="url" value={parque.url} onChange={handleChange} />
            </div>
            <button type="submit" className="btn-save">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ActualizarParque;
