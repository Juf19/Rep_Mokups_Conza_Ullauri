
import React from "react";

const TablasTodoAdmin = () => {
    // Datos ficticios de la tabla
    const parques = [
      { parque: "La Carolina", elemento1: <button>Actualizar</button>, elemento2: <button>Borrar</button>, elemento3: <button>Detalle</button> , elemento4: <button>Cancha</button> }, 
      { parque: "Inglés", elemento1: <button>Actualizar</button>, elemento2: <button>Borrar</button>, elemento3: <button>Detalle</button> , elemento4: <button>Cancha</button> },
      {  parque: "Alameda", elemento1: <button>Actualizar</button>, elemento2: <button>Borrar</button>, elemento3: <button>Detalle</button> , elemento4: <button>Cancha</button>},
    ];

    const item = [{nombre: "Parques"}, 
        {accion: "Acción"}  
    ];
  
    return (
      <div style={{ padding: "20px" }}>
        <table className="tabla-reservas">
          <thead>
            <tr>
              <th>{item[0].nombre}</th>
              <th>{item[1].accion}</th>
            </tr>
          </thead>
          <tbody>
            {parques.map((parque, index) => (
              <tr key={index}>

                <td>{parque.parque} </td>
                <td>{parque.elemento1} {parque.elemento2} {parque.elemento3} {parque.elemento4}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="boton-agregar">+</button>
      </div>
    );
  };
  
  export default TablasTodoAdmin;