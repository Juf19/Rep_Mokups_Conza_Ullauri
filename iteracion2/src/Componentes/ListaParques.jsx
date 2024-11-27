import React, { Component } from 'react';
import UsParques from './UsParques';
import ItemBajoHeader from './ItemBajoHeader';
import ItemHeader from './ItemHeader';

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
            <div>
              <ItemHeader></ItemHeader>
                <div className="parques-list">
                    <h2>PARQUES</h2>
                    <div className="parques">
                        {parques.map((parque, index) => (

                            <UsParques key={index} name={parque.name} img={parque.img}></UsParques>

                        ))}
                    </div>
                </div>
                <ItemBajoHeader></ItemBajoHeader>
            </div>
        );
    }
}

export default ListaParques;
