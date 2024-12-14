import React from "react";
import TablasTodoAdmin from "./TablasTodoAdmin";
import ItemHeaderA from "./ItemHeaderA";
import ItemBajoHeader from "./ItemBajoHeader";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";

const AdimParqueCrud = () => {
  const { id } = useParams();
  const navigate=useNavigate();
  const [data, setData] = useState([]);
  const item = [
    { nombre: "Parques" },
    { accion: "Acción" }
  ];

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

 
  const handleEliminar =  async (id) => {
      const confirmDelete = window.confirm("¿Estás seguro que deseas borrar este parque?");
      if (confirmDelete) {
        try {
          await axios.delete("http://localhost:3001/parques/" + id);
          const updatedData = data.filter((parque) => parque.id !== id);
          setData(updatedData);
          alert("Parque eliminado con éxito.");
        } catch (error) {
          console.error("Error al eliminar el parque:", error);
          alert("No se pudo eliminar el parque.");
        }
      }
    };

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
                <button className="btnBorrar" onClick={() => handleEliminar(parque.id)}><FontAwesomeIcon icon={faTrash} /></button>
                <button className="btnDetalle" onClick={() => navigate(`/parques/detalle/${parque.id}`)}><FontAwesomeIcon icon={faInfoCircle} /></button>
                <button className="btnCanchas" onClick={() => navigate(`/Parque/canchas/`)}><svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="white"
                    >
                      <rect x="3" y="3" width="18" height="18" fill="none" stroke="white" strokeWidth="2"/>
                      <line x1="3" y1="12" x2="21" y2="12" stroke="white" strokeWidth="2" />
                      <circle cx="12" cy="12" r="2" fill="white" />
                      <line x1="3" y1="3" x2="3" y2="21" stroke="white" strokeWidth="2" />
                      <line x1="21" y1="3" x2="21" y2="21" stroke="white" strokeWidth="2" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="boton-agregar" onClick={() => navigate(`/parques/new`)}>+</button>
      </div>
    </div>
  );

}

export default AdimParqueCrud;