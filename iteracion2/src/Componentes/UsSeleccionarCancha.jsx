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
          <div className="left-content">
          <SelectorCancha></SelectorCancha>
          </div>
          <div className="right-map">
           <MapContainer></MapContainer>
            <div className="cancha" style={{ top: '10%', left: '57%' }}>C-F1 ⚽</div>
            <div className="cancha" style={{ top: '7%', left: '47%' }}>C-F2 ⚽</div>
            <div className="cancha" style={{ top: '23%', left: '55%' }}>C-F3 ⚽</div>
            <div className="cancha" style={{ top: '40%', left: '27%' }}>C-B1 🏀</div>
          </div>
        </div>

      </div>

    );
  }

}

export default UsSeleccionarCancha;
