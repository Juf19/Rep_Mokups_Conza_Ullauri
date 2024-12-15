
import React from "react";
const TablasTodoAdmin = ({ items, data, showCanchasButton }) => {
    // Datos ficticios de la tabla

    return (
      <div style={{ padding: "20px" }}>
        <table className="tabla-reservas">
          <thead>
            <tr>
              <th>{items[0].nombre}</th>
              <th>{items[1].accion}</th>
            </tr>
          </thead>
          <tbody>
            {data.map((parque, index) => (
              <tr key={index}>

                <td>{parque.nombre} </td>
                <td>
                <button>Actualizar</button>
                <button>Borrar</button>
                <button>Detalle</button>
                {/* Mostrar el botón "Canchas" solo si showCanchasButton es true */}
                {showCanchasButton && <button>Canchas</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="boton-agregar">+</button>
      </div>
    );
  };
  
  export default TablasTodoAdmin;