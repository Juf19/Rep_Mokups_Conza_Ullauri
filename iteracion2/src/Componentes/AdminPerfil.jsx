import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import ItemHeaderA from './ItemHeaderA';
import ItemBajoHeader from './ItemBajoHeader';

const AdminPerfil = () => {
  const [userData, setUserData] = useState({
    nombre: '',
    email: '',
    cedula: '',
    fechaNacimiento: ''
  });

  const texto = [{ nombre: "ADMINISTRADOR" }];
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

  const handleLogout = () => {
    // Eliminar el token del almacenamiento local
    localStorage.removeItem('token');
    // Redirigir al usuario a la página de inicio de sesión
    navigate('/'); // Cambia '/login' a la ruta que desees
  };

  return (
    <div>
      <ItemHeaderA />
      <ItemBajoHeader nombre={texto[0].nombre} />
      <div className="perfil-card">
        <div className="perfil-imagen">
          <img src="logo_persona.png" alt="logoPersona" id="p" />
          <button className="cerrar-sesion" onClick={handleLogout}>Cerrar sesión</button>
        </div>
        <div className="perfil-informacion">
          <div className="perfil-item">
            <label>Nombre</label>
            <input type="text" className="perfil-dato" value={userData.nombre} readOnly />
          </div>
          <div className="perfil-item">
            <label>Correo electrónico</label>
            <input type="email" className="perfil-dato" value={userData.email} readOnly />
          </div>
          <div className="perfil-item">
            <label>Cédula</label>
            <input type="text" className="perfil-dato" value={userData.cedula} readOnly />
          </div>
          <div className="perfil-item">
            <label>Fecha de nacimiento</label>
            <input type="text" className="perfil-dato" value={userData.fechaNacimiento} readOnly />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPerfil;
