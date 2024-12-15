import React from "react";
import ItemHeader from './ItemHeader';
import ItemBajoHeader from './ItemBajoHeader';
import SelectorCancha from './SelectorCancha';
import MapContainer from './MapContainer';




const texto = [{ nombre: "LA CAROLINA" }]
class UsSeleccionarCancha extends React.Component {
  render() {
    return (
      <div className="App">
        <ItemHeader></ItemHeader>
        <ItemBajoHeader nombre={texto[0].nombre}></ItemBajoHeader>
        <div className="app-container">
          
           <MapContainer></MapContainer>
            <div className="cancha" style={{ top: '30%', left: '53%' }}>C-F1 ⚽</div>
            <div className="cancha" style={{ top: '25%', left: '47%' }}>C-F2 ⚽</div>
            <div className="cancha" style={{ top: '55%', left: '50%' }}>C-F3 ⚽</div>
            <div className="cancha" style={{ top: '60%', left: '35%' }}>C-B1 🏀</div>
          
        </div>

      </div>

    );
  }

}

export default UsSeleccionarCancha;
