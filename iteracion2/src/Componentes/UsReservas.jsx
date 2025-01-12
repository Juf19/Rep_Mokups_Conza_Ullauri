
import React from "react";
import ItemHeader from './ItemHeader';
import ItemBajoHeader from './ItemBajoHeader';
import CalendarioRectangulo from './CalendarioRectangulo';
import TablaReservas from './TablasReservas';
import BotonConFlecha from './BotonConFlecha';
import { useNavigate } from 'react-router-dom';

const texto = [{ nombre: "RESERVAS" }]
function UsReservas() {
    const navigate = useNavigate();
    return (
        <div className="App">
            <ItemHeader></ItemHeader>
            <ItemBajoHeader nombre={texto[0].nombre}></ItemBajoHeader>
            <div className='derecha'>
                <CalendarioRectangulo></CalendarioRectangulo>
            </div>
            <TablaReservas></TablaReservas>
            <div className="espacio">
                <div>
                    <button className="reserva-button" onClick={() => navigate('/ListaParques')}>Reservar</button>
                </div>
                <div className='derecha'>
                    <button className='rojo'>Cancelar</button>
                </div>
            </div>
        </div>


    )
}

export default UsReservas;