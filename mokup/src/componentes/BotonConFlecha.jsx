import React from 'react';

const BotonConFlecha = () => {
  const estiloBoton = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1575ba', 
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    color: 'white',
    fontSize: '16px',
    cursor: 'pointer',
    width: '150px',
  };

  const estiloTriangulo = {
    width: 0,
    height: 0,
    borderTop: '10px solid transparent', 
    borderBottom: '10px solid transparent',
    borderRight: '10px solid #e4282f',
    marginRight: '10px', // Espacio entre el triángulo y el texto
  };

  return (
    <div className='btn'>
    <button style={estiloBoton}>
      <div style={estiloTriangulo}></div>
      Atrás
    </button>
    </div>
  );
};

export default BotonConFlecha;
