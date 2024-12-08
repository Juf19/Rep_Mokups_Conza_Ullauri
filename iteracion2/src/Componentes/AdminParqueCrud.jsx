import React from "react";
import TablasTodoAdmin from "./TablasTodoAdmin";
import ItemHeaderA from "./ItemHeaderA";
import ItemBajoHeader from "./ItemBajoHeader";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash,faPencilAlt, faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const AdimParqueCrud = () => {
  const navigate=useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/parques") // URL 
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los parques:", error);
      })
    }, []);

  const item = [
    { nombre: "Parques" },
    { accion: "Acción" }
  ];

  return (
    <div>
      <ItemHeaderA></ItemHeaderA>
      <ItemBajoHeader></ItemBajoHeader>
      <div style={{ padding: "20px" }}>
        <table className="tabla-reservas">
          <thead>
            <tr>
              <th>{item[0].nombre}</th>
              <th>{item[1].accion}</th>
            </tr>
          </thead>
          <tbody>
            {data.map((parque, index) => (
              <tr key={index}>

                <td>{parque.nombre} </td>
                <td>
                <button className="btnEditar" onClick={() => navigate(`/parques/update/${parque.id}`)}><FontAwesomeIcon icon={faPencilAlt} /></button>
                <button className="btnBorrar"><FontAwesomeIcon icon={faTrash} /></button>
                <button className="btnDetalle"><FontAwesomeIcon icon={faInfoCircle} /></button>
                <button>Canchas</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="boton-agregar">+</button>
      </div>
    </div>
  );

}

export default AdimParqueCrud;