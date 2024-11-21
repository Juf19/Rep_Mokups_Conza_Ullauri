import './App6.css';
import React from "react";
import ItemConfirmado from './componentes/ItemConfirmado';
import ItemHeader from './componentes/ItemHeader';
import ItemBajoHeader from './componentes/ItemBajoHeader';

function App6 () {
    return (
        <div className="App">
            <ItemHeader></ItemHeader>
            <ItemBajoHeader></ItemBajoHeader>
            <ItemConfirmado></ItemConfirmado>
            
        </div>


    )
}
export default App6;