import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import ItemHeaderA from './ItemHeaderA';
import ItemBajoHeader from './ItemBajoHeader';
import "../Estilos/ActualizarParque.css";

const AddParque = () => {
  const navigate = useNavigate();
  const [nuevoParque, setNuevoParque] = useState({
    nombre: '',
    descripcion: '',
    url: ''
  });

  const token = localStorage.getItem('token');

  const obtenerHeadersConToken = () => {
    if (!token) {
      Swal.fire({
        title: 'Error de autenticación',
        text: 'No se encontró el token de autorización. Inicia sesión nuevamente.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      navigate('/login'); // Redirige al login si no hay token
      throw new Error("No se encontró el token de autorización.");
    }
    return { Authorization: `Bearer ${token}` };
  };

  const handleAddParque = (e) => {
    const { name, value } = e.target;
    setNuevoParque({ ...nuevoParque, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { nombre, descripcion, url } = nuevoParque;

    if (!nombre || !descripcion || !url) {
      Swal.fire({
        title: 'Campos incompletos',
        text: 'Por favor completa todos los campos.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Regresar',
        cancelButtonText: 'Continuar'
      }).then((result) => {
        if (result.isConfirmed) navigate('/Parque');
      });
      return; // Detiene la ejecución si los campos están vacíos
    }

    try {
      await axios.post(`http://localhost:8000/parques`, nuevoParque, { headers: obtenerHeadersConToken() });
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Parque agregado correctamente.',
      });
      navigate('/Parque');
    } catch (error) {
      console.error('Error al agregar el parque:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo agregar el parque. Verifica tu conexión y permisos.',
      });
    }
  };

  return (
    <div>
      <ItemHeaderA />
      <ItemBajoHeader />
      <h3>Agregar Parque</h3>
      <form onSubmit={handleSubmit}>
        <div className="parque-informacion">
          <div className="perfil-item">
            <label>Nombre</label>
            <input type="text" name="nombre" className="perfil-dato" value={nuevoParque.nombre} onChange={handleAddParque} />
          </div>
          <div className="perfil-item">
            <label>Descripción</label>
            <input type="text" name="descripcion" className="perfil-dato" value={nuevoParque.descripcion} onChange={handleAddParque} />
          </div>
          <div className="perfil-item">
            <label>URL</label>
            <input type="text" name="url" className="perfil-dato" value={nuevoParque.url} onChange={handleAddParque} />
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
