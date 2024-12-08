import React, { useState, useEffect } from "react";
import axios from 'axios';
import ItemHeaderA from "./ItemHeaderA";
import ItemBajoHeader from "./ItemBajoHeader";
import { useNavigate, useParams } from "react-router-dom";

const AdminUserDetalle = () => {
  const [usuario, setUsuario] = useState({
    id: null,
    nombre: null,
    correoelectronico: null,
    cedula: null,
    contrasena: null,
    rol: null // Añadimos el campo rol al estado
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios.get('http://localhost:3001/usuarios/' + id)
      .then(respuesta => {
        setUsuario(respuesta.data);
        console.log(respuesta.data);
      }).catch(err => console.log(err));
  }, [id]);

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
          <div className="datos">
            <div className="form-group">
              <label>Nombre</label>
              <input
                type="text"
                className="in"
                name="nombre"
                value={usuario.nombre || ""}
                readOnly
              />
            </div>
            <div className="form-group">
              <label>Correo electrónico</label>
              <input
                type="email"
                className="in"
                name="correoelectronico"
                value={usuario.correoelectronico || ""}
                readOnly
              />
            </div>
            <div className="form-group">
              <label>Cédula</label>
              <input
                type="text"
                className="in"
                name="cedula"
                value={usuario.cedula || ""}
                readOnly
              />
            </div>
            <div className="form-group">
              <label>Contraseña</label>
              <input
                type="password"
                className="in"
                name="contrasena"
                value={usuario.contrasena || ""}
                readOnly
              />
            </div>
            <div className="form-group">
              <label className="l">Rol</label>
              <select
                name="rol"
                value={usuario.rol }
                disabled
              >
                <option value="Administrador">Administrador</option>
                <option value="Usuario">Usuario</option>
              </select>
            </div>
            <button onClick={()=>{navigate('/Usuario')}}  type="button" className="btn-save">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminUserDetalle;
