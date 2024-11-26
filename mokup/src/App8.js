import './App4.css';
import React from "react";
import ItemHeaderA from './componentes/ItemHeaderA';
import ItemBajoHeader from './componentes/ItemBajoHeader';
import PerfilUsuario from './componentes/PerfilUser';
const texto = [{ nombre: "ADMINISTRADOR" }]
function App8 () {
    return (
        <div className="App">
        <ItemHeaderA></ItemHeaderA>
        <ItemBajoHeader nombre={texto[0].nombre}></ItemBajoHeader>
        <PerfilUsuario></PerfilUsuario>
    </div>

    )
}

export default App8;