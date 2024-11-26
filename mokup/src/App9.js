import './App9.css';
import React from "react";
import ItemHeaderA from './componentes/ItemHeaderA';
import ItemBajoHeader from './componentes/ItemBajoHeader';
import BotonNuevoParque from './componentes/BotonNuevoParque';
const texto = [{ nombre: "ADMINISTRADOR" }]
const texto1 = [{ nombre: "Nuevo Parque" }]
function App9 () {
    return (
        <div className="App">
        <ItemHeaderA></ItemHeaderA>
        <ItemBajoHeader nombre={texto[0].nombre}></ItemBajoHeader>
        <BotonNuevoParque nombre={texto1[0].nombre}></BotonNuevoParque>
    </div>

    )
}

export default App9;