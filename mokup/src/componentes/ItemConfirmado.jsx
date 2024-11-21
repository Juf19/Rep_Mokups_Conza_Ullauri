import React from 'react';

const ItemConfirmado = () => {

    return (
        <div className='app'>
        <div className='contenedorp'>
            Reserva confirmada. Revisa tu correo para 
            verificar la validez de tu reserva. Recuerda 
            que puedes cancelarla hasta un día antes 
            de la fecha programada.
        </div>
        <div className='item1'>
        <button className="disponibilidad-button"> Volver al inicio </button>
        </div>
        </div>
    );
};

export default ItemConfirmado;