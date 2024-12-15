import React, { useState } from "react";
import axios from 'axios';
import ItemHeaderA from "./ItemHeaderA";
import ItemBajoHeader from "./ItemBajoHeader";
import { useNavigate } from "react-router-dom";

const UsuarioNuevo = (props) => {
  const [datosFormUsuario, setDatosFormUsuario] = useState({
    id: "",
    nombre: "",
    correoelectronico: "",
    cedula: "",
    fechaNacimiento: "",
    contrasena: "",
    rol: "" // Añadimos el campo rol al estado
  });

  const navigate = useNavigate();

  // Actualiza el estado con los cambios en los inputs
  const handleAgregarUsuario = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setDatosFormUsuario({ ...datosFormUsuario, [name]: value });
  };

  // Maneja el envío del formulario
  const handleSubmitUsuario = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:3001/usuarios', datosFormUsuario) // Asegúrate de que esta URL sea la correcta
      .then((res) => {
        console.log("Inserción Exitosa");
        navigate("/Usuario");
      })
      .catch((err) => {
        console.log("Inserción Fallida", err);
      });
  };

  return (
    <div>
      <ItemHeaderA />
      <ItemBajoHeader />
      <div className="form-container">
        <div className="user-image">
          <img
            src="Logo_persona.png"
            alt="Perfil"
            className="icono-usuario-registro"
          />
        </div>
        <form onSubmit={handleSubmitUsuario} className="form">
          <div className="datos">
            <div className="form-group">
              <label>Nombre:</label>
              <input
                type="text"
                placeholder="Ingrese el nombre"
                className="in"
                name="nombre"
                value={datosFormUsuario.nombre}
                onChange={handleAgregarUsuario}
              />
            </div>
            <div className="form-group">
             
                <label>Correo electrónico:</label>
              
                <input
                  type="email"
                  placeholder="Ingrese el correo"
                  className="in"
                  name="correoelectronico"
                  value={datosFormUsuario.correoelectronico}
                  onChange={handleAgregarUsuario}
                />
              
            </div>
            <div className="form-group">
              <label>Cédula:</label>
              <input
                type="text"
                placeholder="Ingrese la cédula"
                className="in"
                name="cedula"
                maxLength={10}
                minLength={10}
                value={datosFormUsuario.cedula}
                onChange={handleAgregarUsuario}
              />
            </div>
            <div className="form-group">
              <label>Fecha de nacimiento:</label>
              <input
                type="date"
                placeholder="Ingrese la fecha de nacimiento"
                className="in"
                name="fechanacimiento"
                value={datosFormUsuario.fechaNacimiento}
                onChange={handleAgregarUsuario}
              />
            </div>
            <div className="form-group">
              <label>Contraseña:</label>
              <input
                type="password"
                className="in"
                name="contrasena"
                value={datosFormUsuario.contrasena}
                onChange={handleAgregarUsuario}
              />
            </div>
            <div className="form-group">
              <label className="l">Rol</label>
              <select
                name="rol"
                value={datosFormUsuario.rol} // Aquí guardamos el rol seleccionado
                onChange={handleAgregarUsuario} // Actualizamos el estado con el valor seleccionado
              >
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

export default UsuarioNuevo;
