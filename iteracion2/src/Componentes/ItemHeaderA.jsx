import React from 'react';
import { useNavigate } from 'react-router-dom';

const ItemHeader = () => {
  const navigate = useNavigate();
  return (
    <div className="app">
      <header className="header">
        <img src="/LOGOA.svg" alt="Quito" className="logo" onClick={() => navigate('/HomeAdmin')}/>
       
        <div className="menu">
          <div className="menu-item">
            <img src="/file2.png" alt="Perfil" className="icono" onClick={() => navigate('/AdminPerfil')}/>
            <button className="menu-text" onClick={() => navigate('/AdminPerfil')}>Perfil</button>
          </div>
        </div>
      </header>
    </div>
  );
};

export default ItemHeader;
