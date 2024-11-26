import './App4.css';
import React from "react";
import ItemHeader from './componentes/ItemHeader';
import ItemBajoHeader from './componentes/ItemBajoHeader';
import PerfilUsuario from './componentes/PerfilUser';
const texto = [{ nombre: "ADMINISTRADOR" }]
function App8 () {
    return (
        <div className="App">
        <ItemHeader></ItemHeader>
        <ItemBajoHeader nombre={texto[0].nombre}></ItemBajoHeader>
        <PerfilUsuario></PerfilUsuario>
    </div>

    )
}

export default App8;