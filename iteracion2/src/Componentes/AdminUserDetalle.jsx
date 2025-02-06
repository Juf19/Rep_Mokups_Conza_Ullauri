import React, { useState, useEffect } from "react";
import axios from 'axios';
import ItemHeaderA from "./ItemHeaderA";
import ItemBajoHeader from "./ItemBajoHeader";
import { useNavigate, useParams } from "react-router-dom";

const AdminUserDetalle = () => {
  const [usuario, setUsuario] = useState({
    id: null,
    nombre: null,
    email: null,
    cedula: null,
    fechaNacimiento: null,
    rol: null // Añadimos el campo rol al estado
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
      axios.get("http://localhost:8000/usuarios/" + id, {
        headers: obtenerHeadersConToken()  // Usar los encabezados con token
      })
        .then(respuesta => {
          setUsuario(respuesta.data);
          console.log(respuesta.data);
        }).catch(err => console.log(err));
    } else {
      console.error("No se encontró el token de autorización.");
    }
  }, [id, token]);

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
        <form className="form">
          <h1 id="titulos">Detalles</h1>
          <div className="datos">
            <div className="form-group">
              <label>Nombre:</label>
              <input
                type="text"
                className="in"
                name="nombre"
                value={usuario.nombre || ""}
                readOnly
              />
            </div>
            <div className="form-group">
              <label>Correo electrónico:</label>
              <input
                type="email"
                className="in"
                name="correoelectronico"
                value={usuario.email || ""}
                readOnly
              />
            </div>
            <div className="form-group">
              <label>Cédula:</label>
              <input
                type="text"
                className="in"
                name="cedula"
                value={usuario.cedula || ""}
                readOnly
              />
            </div>
            <div className="form-group">
              <label>Fecha de nacimiento:</label>
              <input
                type="text"
                placeholder="Ingrese la fecha de nacimiento"
                className="in"
                name="fechaNacimiento"
                value={usuario.fechaNacimiento}
                readOnly
              />
            </div>
            <div className="form-group">
              <label className="l">Rol</label>
              <select
                name="rol"
                value={usuario.rol}
                disabled
              >
                <option value="Administrador">Administrador</option>
                <option value="Usuario">Usuario</option>
              </select>
            </div>
            <button onClick={() => { navigate('/Usuario') }} type="button" className="btn-save">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminUserDetalle;
