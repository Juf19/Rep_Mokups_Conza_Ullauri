import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton, TextField, } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const ItemHeader = () => {
  const navigate = useNavigate();
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
