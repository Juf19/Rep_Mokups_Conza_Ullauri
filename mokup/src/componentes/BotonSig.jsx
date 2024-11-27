import React from 'react';

const BotonSig = () => {
  const estiloBoton = {
    margin: '40px 0 0 0',
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
    width: '100%',
  };

  const estiloTriangulo = {
    width: 0,
    height: 0,
    borderTop: '10px solid transparent', 
    borderBottom: '10px solid transparent',
    borderLeft: '10px solid #e4282f', // Cambié borderRight a borderLeft
    marginLeft: '10px', // Espacio entre el triángulo y el texto (a la izquierda)
  };
  


  return (
    <div className='btn'>
    <button style={estiloBoton}>
    Siguiente
      <div style={estiloTriangulo}></div>
      
    </button>
    </div>
  );
};

export default BotonSig;
