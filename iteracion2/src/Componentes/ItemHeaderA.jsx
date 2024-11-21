import React from 'react';

const ItemHeader = () => {
  return (
    <div className="app">
      <header className="header">
        <img src="LOGOA.svg" alt="Quito" className="logo" />
       
        <div className="menu">
          <div className="menu-item">
            <img src="file2.png" alt="Perfil" className="icono" />
            <button className="menu-text">Perfil</button>
          </div>
        </div>
      </header>
    </div>
  );
};

export default ItemHeader;
