import './App.css';
import React from "react";
import ItemHeader from './componentes/ItemHeader';
import ItemBajoHeader from './componentes/ItemBajoHeader';
import ReservaCancha from './componentes/ReservaCancha';
const texto = [{ nombre: "CANCHA 1" }]
class App1 extends React.Component {
    render() {
        return (
            <div className="App">
                <ItemHeader></ItemHeader>
                <ItemBajoHeader nombre={texto[0].nombre}></ItemBajoHeader>
                <ReservaCancha></ReservaCancha>
            </div>
        );
    }
}
export default App1;