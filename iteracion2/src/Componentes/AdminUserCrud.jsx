import React, { useState, useEffect } from "react";
import axios from "axios";
import ItemHeaderA from "./ItemHeaderA";
import ItemBajoHeader from "./ItemBajoHeader";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt, faInfoCircle, faPlus } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

const AdimUserCrud = () => {
  const [data, setData] = useState([]); // Estado para almacenar los usuarios
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const obtenerHeadersConToken = () => {
    if (!token) {
      throw new Error("No se encontró el token de autorización.");
    }
    return {
      headers: {  // Asegúrate de devolver un objeto con la propiedad 'headers'
        Authorization: `Bearer ${token}`
      }
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!token) {
          console.error("No se encontró el token de autorización.");
          return;
        }

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const res = await axios.get("http://localhost:8000/listausuarios", { headers });
        console.log("Usuarios obtenidos: ", res.data);
        setData(res.data); // Actualiza el estado con los usuarios
      } catch (err) {
        console.error("Error al obtener los usuarios:", err);
      }
    };

    fetchData();
  }, [token]); // El useEffect se ejecutará cada vez que el token cambie


  const items = [
    { nombre: "Usuarios" },
    { accion: "Acción" }
  ];

  const eliminarUsuario = async (id) => {
    // Usamos SweetAlert para la confirmación
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'No, cancelar',
    });

    if (result.isConfirmed) {
      try {
        const headers = obtenerHeadersConToken(); // Obtener los headers con el token
        await axios.delete(`http://localhost:8000/usuarios/${id}`, obtenerHeadersConToken()); //  Usa la interpolación de cadenas para incluir el id
        const updatedData = data.filter((usuario) => usuario._id !== id); //  Compara por _id
        setData(updatedData);
        // Mostrar mensaje de éxito
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Usuario eliminado correctamente.',
        });

      } catch (error) {
        console.error("Error al eliminar el usuario:", error);

        // Mostrar mensaje de error
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo eliminar el usuario.',
        });
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
                  <button className="btnEditar" onClick={() => navigate(`/EditarUsuario/${usuario._id}`)}> <FontAwesomeIcon icon={faPencilAlt} />   </button>
                  <button className="btnBorrar" onClick={() => eliminarUsuario(usuario._id)}> <FontAwesomeIcon icon={faTrash} /></button>
                  <button className="btnDetalle" onClick={() => navigate(`/DetalleUsuario/${usuario._id}`)}> <FontAwesomeIcon icon={faInfoCircle} /></button>
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
