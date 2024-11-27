import './App7.css';
import React from "react";
import ItemHeader from './componentes/ItemHeader';
import ItemBajoHeader from './componentes/ItemBajoHeader';
import TablaReservas from './componentes/TablaReservas';
import BotonConFlecha from './componentes/BotonConFlecha';
import CalendarioRectangulo from './componentes/CalendarioRectangulo';
const texto = [{ nombre: "RESERVAS" }]
function App7 () {
    return (
        <div className="App">
            <ItemHeader></ItemHeader>
            <ItemBajoHeader nombre={texto[0].nombre}></ItemBajoHeader>
            <div className='derecha'>
            <CalendarioRectangulo></CalendarioRectangulo>
            </div>
            <TablaReservas></TablaReservas>
            <div className="espacio">
            <BotonConFlecha></BotonConFlecha>
            <div className='derecha'>
            <button className='rojo'>Cancelar</button>
            </div>
            </div>
        </div>


    )
}

export default App7;