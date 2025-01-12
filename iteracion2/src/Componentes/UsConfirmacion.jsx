import React from 'react';
import ItemHeader from './ItemHeader';
import ItemBajoHeader from './ItemBajoHeader';
import { useNavigate } from 'react-router-dom';

const UsConfirmacion = () => {
    const navigate = useNavigate();
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
                    <button className="disponibilidad-button" onClick={() => navigate('/HomeUser')}> Volver al inicio </button>
                </div>
            </div>
        </div>
    );
};

export default UsConfirmacion;