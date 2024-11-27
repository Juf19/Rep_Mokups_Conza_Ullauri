import React, { Component } from 'react';
import Parque from './Parque';

class ListaParques extends Component {
  render() {
    const parques = [
      { name: "La Carolina", img: "carolina.jpg" },
      { name: "Alameda", img: "alameda.jpg" },
      { name: "Bicentenario", img: "bicentenario.jpg" },
      { name: "Ejido", img: "ejido.jpg" },
      { name: "Ingles", img: "ingles.jpg" },
      { name: "Metropolitano", img: "metropolitano.jpg" }
    ];

    return (
      <div className="parques-list">
        <h2>PARQUES</h2>
        <div className="parques">
          {parques.map((parque, index) => (
            <Parque key={index} name={parque.name} img={parque.img} />
          ))}
        </div>
      </div>
    );
  }
}

export default ListaParques;
