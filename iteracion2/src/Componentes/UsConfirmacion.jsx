import React from 'react';
import ItemHeader from './ItemHeader';
import ItemBajoHeader from './ItemBajoHeader';

const UsConfirmacion = () => {

    return (
        <div>
            <ItemHeader></ItemHeader>
            <ItemBajoHeader></ItemBajoHeader>
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
        </div>
    );
};

export default UsConfirmacion;