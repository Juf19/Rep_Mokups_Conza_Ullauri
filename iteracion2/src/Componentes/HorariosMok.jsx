import React from 'react';
import ItemHorarios from './ItemHorarios';
import BotonConFlecha from './BotonConFlecha';

const UsDisponibilidadH = () => {
    return (
        <div>
            <div className='disponibilidad-container'>
                <select value='todos' className='disponibilidad-select'>
                    <option value="">Todos</option>
                    <option value="C-F1">C-F1</option>
                    <option value="C-F2">C-F2</option>
                    <option value="C-F3">C-F3</option>
                </select>
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
            <BotonConFlecha></BotonConFlecha>
        </div>
    );
};

export default UsDisponibilidadH;
