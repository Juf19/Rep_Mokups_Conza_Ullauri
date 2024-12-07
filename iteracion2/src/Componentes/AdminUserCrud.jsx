import React, { useState, useEffect } from "react";
import axios from "axios";
import ItemHeaderA from "./ItemHeaderA";
import ItemBajoHeader from "./ItemBajoHeader";

const AdimUserCrud = () => {
  const [data, setData] = useState([]); // Estado para almacenar los usuarios
 
  // useEffect para obtener los usuarios desde la API
  useEffect(() => {
    axios
      .get("http://localhost:3001/usuarios") // URL de tu API
      .then((res) => {
        console.log("Usuarios obtenidos: ", res);
        setData(res.data); // Actualiza el estado con los usuarios
      })
      .catch((err) => {
        console.error("Error al obtener los usuarios:", err);
      });
  }, []); // Se ejecuta una sola vez al montar el componente

  const items = [
    { nombre: "Usuarios" },
    { accion: "Acción" }
  ];

  return (
    <div>
      <ItemHeaderA />
      <ItemBajoHeader />
      <div style={{ padding: "20px" }}>
        <table className="tabla-reservas">
          <thead>
            <tr>
              <th>{items[0].nombre}</th>
              <th>{items[1].accion}</th>
            </tr>
          </thead>
          <tbody>
            {data.map((usuario, index) => (
              <tr key={index}>
                <td>{usuario.nombre} </td>
                <td>
                  <button>Actualizar</button>
                  <button>Borrar</button>
                  <button>Detalle</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="boton-agregar">+</button>
      </div>
    </div>
  );
};

export default AdimUserCrud;
