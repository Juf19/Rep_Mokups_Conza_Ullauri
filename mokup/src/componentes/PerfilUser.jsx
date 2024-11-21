import React from 'react';

const PerfilUser = () => {
  return (
    <div className="perfil-card">
    <div className="perfil-imagen">
      <img src="logo_persona.png" alt="logoPersona" id="p" />
      <button className="cerrar-sesion">Cerrar sesión</button>
    </div>
    <div className="perfil-informacion">
      <div className="perfil-item">
        <label>Nombre</label>
        <input type="text" className="perfil-dato" placeholder="Jhuliet Conza"/>
      </div>
      <div className="perfil-item">
        <label>Correo electrónico</label>
        <input type="email" className="perfil-dato" placeholder="jhulietconza@gmail.com"/>
      </div>
      <div className="perfil-item">
        <label>Cédula</label>
        <input type="text" className="perfil-dato" placeholder="1716939017"/>
      </div>
      <div className="perfil-item">
        <label>Fecha de nacimiento</label>
        <input type="text" className="perfil-dato" placeholder="11/05/1995"/>
      </div>
    </div>
  </div>
  );
};

export default PerfilUser;
