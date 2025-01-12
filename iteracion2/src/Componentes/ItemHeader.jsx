import React from 'react';
import { useNavigate } from 'react-router-dom';

const ItemHeader = () => {
  const navigate = useNavigate();
  return (
    <div className="app">
      <header className="header">
        <img src="/LOGOA.svg" alt="Quito" className="logo" />
        <div className="search-bar">
          <input type="text" placeholder="Buscar" />
          <button className="search-button">🔍</button>
        </div>
        <div className="menu">
          <div className="menu-item">
            <img src="/file.png" alt="Reserva" className="icono" onClick={() => navigate('/HomeUser')} />
            <button className="menu-text" onClick={() => navigate('/HomeUser')}>Reservas</button>
          </div>
          <div className="menu-item">
            <img src="/file2.png" alt="Perfil" className="icono" onClick={() => navigate('/Perfil')} />
            <button className="menu-text" onClick={() => navigate('/Perfil')}>Perfil</button>
          </div>
        </div>
      </header>
    </div>
  );
};

export default ItemHeader;
