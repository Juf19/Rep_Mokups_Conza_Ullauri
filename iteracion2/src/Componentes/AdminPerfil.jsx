import React from 'react';
import ItemHeaderA from './ItemHeaderA';
import ItemBajoHeader from './ItemBajoHeader';

const AdminPerfil = () => {
  const texto = [{ nombre: "ADMINISTRADOR" }]

  return (
    <div>
      <ItemHeaderA></ItemHeaderA>
      <ItemBajoHeader nombre={texto[0].nombre}></ItemBajoHeader>
      <div className="perfil-card">
        <div className="perfil-imagen">
          <img src="logo_persona.png" alt="logoPersona" id="p" />
          <button className="cerrar-sesion">Cerrar sesión</button>
        </div>
        <div className="perfil-informacion">
          <div className="perfil-item">
            <label>Nombre</label>
            <input type="text" className="perfil-dato" placeholder="Jorge Ullauri" />
          </div>
          <div className="perfil-item">
            <label>Correo electrónico</label>
            <input type="email" className="perfil-dato" placeholder="jorgeullauri@gmail.com" />
          </div>
          <div className="perfil-item">
            <label>Cédula</label>
            <input type="text" className="perfil-dato" placeholder="1716939017" />
          </div>
          <div className="perfil-item">
            <label>Fecha de nacimiento</label>
            <input type="text" className="perfil-dato" placeholder="19/08/1999" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPerfil;
