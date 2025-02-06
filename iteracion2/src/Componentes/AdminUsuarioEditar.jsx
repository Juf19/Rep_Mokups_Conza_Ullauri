import React, { useState, useEffect } from "react";
import axios from 'axios';
import ItemHeaderA from "./ItemHeaderA";
import ItemBajoHeader from "./ItemBajoHeader";
import { useNavigate, useParams } from "react-router-dom";

const AdminUsuarioEditar = () => {
  const [usuario, setUsuario] = useState({
    id: "",
    nombre: "",
    email: "",
    cedula: "",
    contrasena: "",
    fechaNacimiento: "",
    rol: "" // Añadimos el campo rol al estado
  });

  const navigate = useNavigate();
  const { id } = useParams(); 
  const token = localStorage.getItem('token');  // Obtener token desde el localStorage

  // Obtener encabezados con el token
  const obtenerHeadersConToken = () => {
    if (!token) {
      throw new Error("No se encontró el token de autorización.");
    }
    return {
      Authorization: `Bearer ${token}`  // Retornar el encabezado con el token
    };
  };

  useEffect(() => {
    if (token) {  // Verificar si el token existe
      axios.get('http://localhost:8000/usuarios/' + id, {
        headers: obtenerHeadersConToken()  // Usar los encabezados con token
      })
      .then(res => {
        console.log("R. Exitosa:", res);
        setUsuario(res.data);
      })
      .catch(err => {
        console.log("R. Fallida: ", err);
      });
    } else {
      console.error("No se encontró el token de autorización.");
    }
  }, [id, token]);

  const handleActualizarUsuario = (e) => { 
    e.preventDefault();
    if (token) {  // Verificar si el token existe
      axios.put('http://localhost:8000/usuarios/' + id, usuario, {
        headers: obtenerHeadersConToken()  // Usar los encabezados con token
      })
      .then(res => {
        console.log("Insercion Exitosa");
        navigate('/Usuario');
      })
      .catch(err => {
        console.log("Insercion Fallida");
      });
    } else {
      console.error("No se encontró el token de autorización.");
    }
  };

  const handleUsuario = (e) => {
    setUsuario({...usuario, [e.target.name]: e.target.value});
  };

  return (
    <div>
      <ItemHeaderA />
      <ItemBajoHeader />
      <div className="form-container">
        <div className="user-image">
          <img
            src="/logo_persona.png"
            alt="Perfil"
            className="icono-usuario-registro"
          />
        </div>
        <form onSubmit={handleActualizarUsuario} className="form">
          <div className="datos">
            <div className="form-group">
              <label>Nombre:</label>
              <input type="text" className="in" name="nombre" value={usuario.nombre} onChange={handleUsuario} />
            </div>
            <div className="form-group">
              <label>Correo electrónico:</label>
              <input type="email" className="in" name="email" value={usuario.email} onChange={handleUsuario} />
            </div>
            <div className="form-group">
              <label>Cédula:</label>
              <input maxLength={10}
                minLength={10} type="number" className="in" name="cedula" value={usuario.cedula} onChange={handleUsuario} />
            </div>
            <div className="form-group">
              <label>Fecha de nacimiento:</label>
              <input type="date" className="in" name="fechaNacimiento" value={usuario.fechaNacimiento} onChange={handleUsuario} />
            </div>
            <div className="form-group">
              <label>Contraseña:</label>
              <input type="password" className="in" name="contrasena" value={usuario.contrasena} onChange={handleUsuario} />
            </div>
            <div className="form-group">
              <label className="l">Rol</label>
              <select name="rol" value={usuario.rol} onChange={handleUsuario}>
                <option value="Administrador">Administrador</option>
                <option value="Usuario">Usuario</option>
              </select>
            </div>
            <button type="submit" className="btn-save">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminUsuarioEditar;
