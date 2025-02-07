import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { IconButton, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const ItemHeader = ({ setSearchQuery }) => {
  const navigate = useNavigate();
  const location = useLocation(); // Asegúrate de importar useLocation
  const [searchInput, setSearchInput] = useState('');

  const isSearchablePage = location.pathname === '/ListaParques';
  // Manejar cambios en el input y actualizar el estado en ListaParques
  const handleChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);

    // Solo actualizar searchQuery si estamos en la página de ListaParques
    if (isSearchablePage) {
      setSearchQuery(value); // Filtrar en tiempo real
    }
  };

  return (
    <div className="app">
      <header className="header">
        <img src="/LOGOA.svg" alt="Quito" className="logo" />
        <div className="search-bar">
            <TextField  
                placeholder="Buscar"
                size="small"
                fullWidth
                className="search-input" // Clase para el campo de entrada
                value={searchInput}
                onChange={handleChange} // Actualiza la búsqueda en tiempo real
                InputProps={{
                    endAdornment: (
                        <IconButton type="submit" aria-label="search" className="search-button">
                            <SearchIcon />
                        </IconButton>
                    ),
                }}
            />
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
