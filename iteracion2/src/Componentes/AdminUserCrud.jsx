import React, { useState, useEffect } from "react";
import axios from "axios";
import ItemHeaderA from "./ItemHeaderA";
import ItemBajoHeader from "./ItemBajoHeader";
import { useNavigate} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash,faPencilAlt, faInfoCircle, faPlus } from "@fortawesome/free-solid-svg-icons";


const AdimUserCrud = () => {
  const [data, setData] = useState([]); // Estado para almacenar los usuarios
  const navigate = useNavigate();


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
  }, []);

  const items = [
    { nombre: "Usuarios" },
    { accion: "Acción" }
  ];

  const eliminarUsuario = async (id) => {
    const confirmDelete = window.confirm("¿Estás seguro que deseas borrar este usuario?");
    if (confirmDelete) {
      try {
        await axios.delete("http://localhost:3001/usuarios/" + id);
        const updatedData = data.filter((usuario) => usuario.id !== id);
        setData(updatedData);
        alert("Usuario eliminado con éxito.");
      } catch (error) {
        console.error("Error al eliminar el usuario:", error);
        alert("No se pudo eliminar el usuario.");
      }
    }
  };

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
                  <button className="btnEditar" onClick={() => navigate('/EditarUsuario/' + usuario.id)}> <FontAwesomeIcon icon={faPencilAlt} />   </button>
                  <button className="btnBorrar" onClick={() => eliminarUsuario(usuario.id)}> <FontAwesomeIcon icon={faTrash} /></button>
                  <button  className="btnDetalle" onClick={() => navigate('/DetalleUsuario/' + usuario.id)}> <FontAwesomeIcon icon={faInfoCircle} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={() => navigate('/nuevoUsuario')} className="btnAgregar">  <FontAwesomeIcon icon={faPlus} /></button>
      </div>
    </div>
  );
};

export default AdimUserCrud;
