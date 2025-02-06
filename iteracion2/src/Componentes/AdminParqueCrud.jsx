import React from "react";
import TablasTodoAdmin from "./TablasTodoAdmin";
import ItemHeaderA from "./ItemHeaderA";
import ItemBajoHeader from "./ItemBajoHeader";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt, faInfoCircle, faPlus } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

const AdimParqueCrud = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const item = [
    { nombre: "Parques" },
    { accion: "Acción" }
  ];
  const token = localStorage.getItem('token');

  const obtenerHeadersConToken = () => {
    if (!token) {
      throw new Error("No se encontró el token de autorización.");
    }
    return {
      Authorization: `Bearer ${token}`  // Retornar el encabezado con el token
    };
  };

  useEffect(() => {
    if (token) {  // Verificar si el token existe
        axios
            .get("http://localhost:8000/parques", {
                headers: {
                    Authorization: `Bearer ${token}`,  // Enviar el token en el encabezado
                },
            })
            .then((response) => {
                setData(response.data);  // Actualiza el estado con los parques
            })
            .catch((error) => {
                console.error("Error al obtener los parques:", error);
            });
    } else {
        console.error("No se encontró el token de autorización.");
    }
}, [token]);


  const handleEliminar = async (id) => {
    const confirmDelete = window.confirm("¿Estás seguro que deseas borrar este parque?");
    if (confirmDelete) {
      try {
        await axios.delete("http://localhost:8000/parques/" + id,obtenerHeadersConToken);
        const updatedData = data.filter((parque) => parque._id !== id);
        setData(updatedData);
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Parque eliminado con exito',
        });
      } catch (error) {
        console.error("Error al eliminar el parque:", error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo eliminar el parque',
        });
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
                  <button className="btnEditar" onClick={() => navigate(`/parques/update/${parque._id}`)}><FontAwesomeIcon icon={faPencilAlt} /></button>
                  <button className="btnBorrar" onClick={() => handleEliminar(parque._id)}><FontAwesomeIcon icon={faTrash} /></button>
                  <button className="btnDetalle" onClick={() => navigate(`/parques/detalle/${parque._id}`)}><FontAwesomeIcon icon={faInfoCircle} /></button>
                  <button className="btnCanchas" onClick={() => navigate(`/Parque/${parque._id}/canchas`)}><svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="white"
                  >
                    <rect x="3" y="3" width="18" height="18" fill="none" stroke="white" strokeWidth="2" />
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
        <button  onClick={() => navigate(`/parques/new`)} className="btnAgregar">  <FontAwesomeIcon icon={faPlus} />+</button>
      </div>
    </div>
  );

}

export default AdimParqueCrud;