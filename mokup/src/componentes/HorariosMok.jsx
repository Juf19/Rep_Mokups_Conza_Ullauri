import React from 'react';
import ItemHorarios from './ItemHorarios';

const HorariosMok = () => {

    return (
        <div className='contenedorp'>
            <select value='todos' className='item'>
                <option value="">Todos</option>
                <option value="C-F1">C-F1</option>
                <option value="C-F2">C-F2</option>
                <option value="C-F3">C-F3</option>
            </select>
            <div className='fila'>
                <label className='label'>Cancha C-F1</label>
                <ItemHorarios />
            </div>
            <div className='fila'>
                <label className='label'>Cancha C-F2</label>
                <ItemHorarios />
            </div>
            <div className='fila'>
                <label className='label'>Cancha C-B1</label>
                <ItemHorarios />
            </div>
            <div className='fila'>
                <label className='label'>Cancha C-B2</label>
                <ItemHorarios />
            </div>
            <div className='fila'>
                <label className='label'>Cancha C-B3</label>
                <ItemHorarios />
            </div>
        </div>
    );
};

export default HorariosMok;
