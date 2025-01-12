import React from 'react';
import { useNavigate } from 'react-router-dom';
import UsParques from './UsParques';
import ItemBajoHeader from './ItemBajoHeader';
import ItemHeader from './ItemHeader';

const ListaParques = () => {
    const navigate = useNavigate(); // Hook para navegación

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
            <ItemHeader />
            <ItemBajoHeader />
            <div className="parques-list">
                <h2>Selecciona el parque en donde deseas</h2>
                <div className="parques">
                    {parques.map((parque, index) => (
                        <button
                            key={index}
                            className="parques-button"
                            onClick={() => navigate("/detalles")} // Redirige a la página "/detalles"
                        >
                            <UsParques name={parque.name} img={parque.img} />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ListaParques;
