import React from "react";
import ItemHeader from './ItemHeader';
import ItemBajoHeader from './ItemBajoHeader';
import CalendarioRectangulo from './CalendarioRectangulo';
import HorariosMok from './HorariosMok';
import BotonConFlecha from './BotonConFlecha';

const texto = [{ nombre: "HORARIO" }]
function UsDisponibilidadH () {
    return (
        <div className="App">
           <ItemHeader></ItemHeader>
            <ItemBajoHeader nombre={texto[0].nombre}></ItemBajoHeader>
            <div className='derecha'>
            <CalendarioRectangulo></CalendarioRectangulo>
            </div>
            <HorariosMok></HorariosMok>
            <BotonConFlecha></BotonConFlecha>
        </div>


    )
}
export default UsDisponibilidadH;