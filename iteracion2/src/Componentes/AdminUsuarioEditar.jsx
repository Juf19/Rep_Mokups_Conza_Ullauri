import React, { useState, useEffect } from "react";
import axios from 'axios';
import ItemHeaderA from "./ItemHeaderA";
import ItemBajoHeader from "./ItemBajoHeader";
import { useNavigate, useParams } from "react-router-dom";

const AdminUsuarioEditar = () => {
    const [usuario, setUsuario] = useState({
        id: "",
        nombre: "",
        correoelectronico: "",
        cedula: "",
        contrasena: "",
        rol: "" // Añadimos el campo rol al estado
      });

  const navigate = useNavigate();
  const { id } = useParams(); 

  useEffect(() => {
    axios.get('http://localhost:3001/usuarios/'+id)
      .then(res => {
        console.log("R. Exitosa:", res);
        setUsuario(res.data);
      })
      .catch(err => {
        console.log("R. Fallida: ", err);
      });
  }, [id]);

  const handleActualizarUsuario = (e) => { 
    e.preventDefault();
    axios.put('http://localhost:3001/usuarios/' + id, usuario)
      .then(res => {
        console.log("Insercion Exitosa");
        navigate('/Usuario');
      })
      .catch(err => {
        console.log("Insercion Fallida");
      });
  }

  const handleUsuario = (e) => {
    setUsuario({...usuario, [e.target.name]: e.target.value});
  }

  return (
    <div>
      <ItemHeaderA></ItemHeaderA>
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
              <label>Nombre</label>
              <input type="text"  className="in" name="nombre" value={usuario.nombre} onChange={handleUsuario} />
            </div>
            <div className="form-group">
              <label>Correo electrónico</label>
              <input type="email"  className="in" name="correoelectronico" value={usuario.correoelectronico} onChange={handleUsuario} />
            </div>
            <div className="form-group">
              <label>Cédula</label>
              <input maxLength={10}
                minLength={10} type="number"  className="in" name="cedula" value={usuario.cedula} onChange={handleUsuario} />
            </div>
            <div className="form-group">
              <label>Contraseña</label>
              <input type="password"  className="in" name="contrasena" value={usuario.contrasena} onChange={handleUsuario} />
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