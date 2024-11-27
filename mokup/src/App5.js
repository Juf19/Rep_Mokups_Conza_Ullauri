import './App5.css';
import React from "react";
import ItemHeader from './componentes/ItemHeader';
import ItemBajoHeader from './componentes/ItemBajoHeader';
import HorariosMok from './componentes/HorariosMok';
import BotonConFlecha from './componentes/BotonConFlecha';
import CalendarioRectangulo from './componentes/CalendarioRectangulo';
const texto = [{ nombre: "HORARIO" }]
function App5 () {
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
export default App5;