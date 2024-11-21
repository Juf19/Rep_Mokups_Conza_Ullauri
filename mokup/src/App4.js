import './App4.css';
import React from "react";
import ItemHeader from './componentes/ItemHeader';
import ItemBajoHeader from './componentes/ItemBajoHeader';
import PerfilUsuario from './componentes/PerfilUser';

function App4 () {
    return (
        <div className="App">
            <ItemHeader></ItemHeader>
            <ItemBajoHeader></ItemBajoHeader>
            <PerfilUsuario></PerfilUsuario>
        </div>


    )
}
export default App4;