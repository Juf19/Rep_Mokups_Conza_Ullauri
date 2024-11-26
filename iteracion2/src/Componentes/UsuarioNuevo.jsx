import React from "react";
import BotonConFlecha from "./BotonConFlecha";
import ItemHeaderA from "./ItemHeaderA";
import ItemBajoHeader from "./ItemBajoHeader";



const UsuarioNuevo = () => {
  return (
    <div>
      <ItemHeaderA></ItemHeaderA>
      <ItemBajoHeader></ItemBajoHeader>
      <div className="form-container">
        <div className="user-image">
          <img
            src="Logo_persona.png"
            alt="Perfil"
            className="icono-usuario-registro"
          />
          <div className="botonFlecha">
            <BotonConFlecha></BotonConFlecha>
          </div>
        </div>
        <form className="form">
          <div className="datos">
            <div className="form-group">
              <label>Nombre</label>
              <input type="text" placeholder="Ingrese el nombre" className="in" />
            </div>
            <div className="form-group">
              <label>Correo electrónico</label>
              <input type="email" placeholder="Ingrese el correo" className="in" />
            </div>
            <div className="form-group">
              <label>Cédula</label>
              <input type="text" placeholder="Ingrese la cédula" className="in" />
            </div>
            <div className="form-group">
              <label>Correo electrónico</label>
              <input type="text" placeholder="Ingrese su correo electronico" className="in" />
            </div>
            <div className="rol">
              
            <button type="submit" className="btn-save">Guardar</button>
            
              <div className="form-group1">
                <label className="l">Rol</label>
                <select>
                  <option value="Administrador">Administrador</option>
                  <option value="Usuario">Usuario</option>
                </select>
                
              </div>
              
            </div>
          </div>


        </form>
      </div>
    </div>
  );
};

export default UsuarioNuevo;
