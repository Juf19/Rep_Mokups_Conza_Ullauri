import React, { useState } from "react";
import axios from 'axios';
import ItemHeaderA from "./ItemHeaderA";
import ItemBajoHeader from "./ItemBajoHeader";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'; // Importa SweetAlert2

const UsuarioNuevo = (props) => {
  const [datosFormUsuario, setDatosFormUsuario] = useState({
    email: "",
    nombre: "",
    cedula: "",
    fechaNacimiento: "",
    password: "",
    rol: "Usuario"
  });

  const navigate = useNavigate();

  const handleAgregarUsuario = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setDatosFormUsuario({ ...datosFormUsuario, [name]: value });
  };

  const handleSubmitUsuario = (e) => {
    e.preventDefault();

    // Validar que todos los campos estén llenos
    const { email, nombre, cedula, fechaNacimiento, password } = datosFormUsuario;
    
    if (!email || !nombre || !cedula || !fechaNacimiento || !password) {
      Swal.fire({
        title: 'Campos incompletos',
        text: 'Por favor completa todos los campos.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Regresar',
        cancelButtonText: 'Continuar'
      }).then((result) => {
        if (result.isConfirmed) {
          // Si el usuario quiere regresar, no hace nada porque permanece en el formulario
          navigate("/Usuario");
        } else if (result.isDismissed) {
          // Si el usuario quiere continuar, puedes manejarlo aquí si es necesario
          return;
        }
      });
      return; // Detiene la ejecución si hay campos vacíos
    }

    // Si todos los campos están llenos, procede a enviar el formulario
    axios
      .post('http://localhost:8000/register', datosFormUsuario)
      .then((res) => {
        console.log("Inserción Exitosa", res.data);
        navigate("http://localhost:3000/Usuario");
      })
      .catch((err) => {
        console.log("Inserción Fallida", err.response.data);
      });
  };

  return (
    <div>
      <ItemHeaderA />
      <ItemBajoHeader />
      <div className="form-container">
        <div className="user-image">
          <img src="Logo_persona.png" alt="Perfil" className="icono-usuario-registro" />
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
                name="email"
                value={datosFormUsuario.email}
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
                name="fechaNacimiento"
                value={datosFormUsuario.fechaNacimiento}
                onChange={handleAgregarUsuario}
              />
            </div>
            <div className="form-group">
              <label>Contraseña:</label>
              <input
                type="password"
                className="in"
                name="password"
                value={datosFormUsuario.password}
                onChange={handleAgregarUsuario}
              />
            </div>
            <div className="form-group">
              <label>Rol</label>
              <select
                name="rol"
                value={datosFormUsuario.rol} 
                onChange={handleAgregarUsuario} 
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
