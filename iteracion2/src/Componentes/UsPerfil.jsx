import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import ItemHeader from './ItemHeader';
import ItemBajoHeader from './ItemBajoHeader';

const UsPerfil = () => {
  const [userData, setUserData] = useState({
    nombre: '',
    email: '',
    cedula: '',
    fechaNacimiento: ''
  });

  const navigate = useNavigate(); // Inicializa el hook para redirigir

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token'); // Asegúrate de que aquí esté tu token
        const response = await axios.get('http://localhost:8000/api/usuario', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(response.data); // Verifica la estructura aquí
        setUserData({
          nombre: response.data.nombre,
          email: response.data.email,
          cedula: response.data.cedula,
          fechaNacimiento: response.data.fechaNacimiento
        });
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleLogout = () => {
    // Eliminar el token del almacenamiento local
    localStorage.removeItem('token');
    // Redirigir al usuario a la página de inicio de sesión
    navigate('/'); // Cambia '/login' a la ruta que desees
  };

  return (
    <div>
      <ItemHeader />
      <ItemBajoHeader />
      <div className="perfil-card">
        <div className="perfil-imagen">
          <img src="logo_persona.png" alt="logoPersona" id="p" />
          <button className="cerrar-sesion" onClick={handleLogout}>Cerrar sesión</button>
        </div>
        <div className="perfil-informacion">
          <div className="perfil-item">
            <label>Nombre</label>
            <input
              type="text"
              className="perfil-dato"
              name="nombre"
              value={userData.nombre}
              onChange={handleChange}
            />
          </div>
          <div className="perfil-item">
            <label>Correo electrónico</label>
            <input
              type="email"
              className="perfil-dato"
              name="email"
              value={userData.email}
              onChange={handleChange}
            />
          </div>
          <div className="perfil-item">
            <label>Cédula</label>
            <input
              type="text"
              className="perfil-dato"
              name="cedula"
              value={userData.cedula}
              onChange={handleChange}
            />
          </div>
          <div className="perfil-item">
            <label>Fecha de nacimiento</label>
            <input
              type="text"
              className="perfil-dato"
              name="fechaNacimiento"
              value={userData.fechaNacimiento}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsPerfil;
