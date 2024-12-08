import React from 'react';
import ItemHorarios from './ItemHorarios';
import BotonConFlecha from './BotonConFlecha';

const UsDisponibilidadH = () => {
    return (
        <div>
            <div className='disponibilidad-container'>
                <div className='disponibilidad-row'>
                    <label className='disponibilidad-label'>Cancha C-F1</label>
                    <ItemHorarios />
                </div>
                <div className='disponibilidad-row'>
                    <label className='disponibilidad-label'>Cancha C-F2</label>
                    <ItemHorarios />
                </div>
                <div className='disponibilidad-row'>
                    <label className='disponibilidad-label'>Cancha C-B1</label>
                    <ItemHorarios />
                </div>
                <div className='disponibilidad-row'>
                    <label className='disponibilidad-label'>Cancha C-B2</label>
                    <ItemHorarios />
                </div>
                <div className='disponibilidad-row'>
                    <label className='disponibilidad-label'>Cancha C-B3</label>
                    <ItemHorarios />
                </div>
                
            </div>
        </div>
    );
};

export default UsDisponibilidadH;
