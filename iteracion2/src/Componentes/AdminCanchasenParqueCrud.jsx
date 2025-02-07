import React, { useState, useEffect } from 'react';
import ItemBajoHeader from './ItemBajoHeader';
import ItemHeaderA from './ItemHeaderA';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilAlt, faInfoCircle, faPlus } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

const AdminCanchaenParque = () => {
    const { id } = useParams(); // id del parque actual
    const navigate = useNavigate();
    const [data, setData] = useState([]); // Canchas filtradas
    const [parques, setParques] = useState({
        id: '',
        nombre: '',
        descripcion: '',
        url: ''
    });
    const token = localStorage.getItem('token');

    // Obtener encabezados con el token
    const obtenerHeadersConToken = () => {
        if (!token) {
            throw new Error("No se encontró el token de autorización.");
        }
        return {
            Authorization: `Bearer ${token}`  // Retornar el encabezado con el token
        };
    };

    // Obtener detalles del parque actual
    useEffect(() => {
        if (token) {  // Verificar si el token existe
            axios
                .get(`http://localhost:8000/parques/${id}`, {
                    headers: obtenerHeadersConToken()  // Usar la función para los encabezados
                })
                .then((response) => {
                    setParques(response.data);  // Actualiza el estado con el parque
                })
                .catch((error) => {
                    console.error("Error al obtener el parque:", error);
                });
        } else {
            console.error("No se encontró el token de autorización.");
        }
    }, [id, token]); // Se vuelve a ejecutar si cambia el `id` o `token`

    // Obtener canchas filtradas por el parque actual
    useEffect(() => {
        if (token) {  // Verificar si el token existe
            axios
                .get("http://localhost:8000/canchas", {
                    headers: obtenerHeadersConToken()  // Usar la función para los encabezados
                })
                .then((response) => {
                    const canchasFiltradas = response.data.filter(cancha => cancha.idParque === id);
                    setData(canchasFiltradas);  // Actualiza el estado con las canchas filtradas
                })
                .catch((error) => {
                    console.error("Error al obtener las canchas:", error);
                });
        } else {
            console.error("No se encontró el token de autorización.");
        }
    }, [id, token]); // Se vuelve a ejecutar si cambia el `id` o `token`

    // Eliminar una cancha
    const handleEliminar = async (canchaId) => {
        const confirmDelete = window.confirm("¿Estás seguro que deseas borrar esta cancha?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:8000/canchas/${canchaId}`, {
                    headers: obtenerHeadersConToken()  // Usar los encabezados con token
                });
                const updatedData = data.filter((cancha) => cancha._id !== canchaId);
                setData(updatedData);
                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: 'Cancha eliminada con éxito',
                });
            } catch (error) {
                console.error("Error al eliminar la cancha:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo eliminar la cancha',
                });
            }
        }
    };

    const item = [
        { nombre: "Canchas" },
        { accion: "Acción" }
    ];

    return (
        <div>
            <ItemHeaderA />
            <ItemBajoHeader />
            <div className="contenedor">
                <div className="encabezado">
                    <label>Nombre</label>
                    <div className="nombre-parque">
                        <input
                            type="text"
                            name="nombre"
                            className="perfil-dato1"
                            value={parques.nombre}
                            disabled={true}
                        />
                    </div>
                </div>

                <div className="seccion-imagen">
                    <img
                        src={parques.url}
                        alt="Parque"
                        className="imagen-parque"
                    />
                </div>

                <div style={{ padding: "20px" }}>
                    <table className="tabla-reservas">
                        <thead>
                            <tr>
                                <th>{item[0].nombre}</th>
                                <th>{item[1].accion}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((cancha, index) => (
                                <tr key={index}>
                                    <td>{cancha.nombre}</td>
                                    <td>
                                        <button
                                            className="btnEditar"
                                            onClick={() => navigate(`/Parque/${cancha.idParque}/canchas/${cancha._id}/actualizar`, { state: { id } })}
                                        >
                                            <FontAwesomeIcon icon={faPencilAlt} />
                                        </button>
                                        <button
                                            className="btnBorrar"
                                            onClick={() => handleEliminar(cancha._id)}
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                        <button
                                            className="btnDetalle"
                                            onClick={() => navigate(`/Parque/${cancha.idParque}/canchas/${cancha._id}/detalles`)}
                                        >
                                            <FontAwesomeIcon icon={faInfoCircle} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* Botón para agregar cancha asignando idParque automáticamente */}
                    <button
                        onClick={() => navigate(`/Parque/${id}/canchas/new`, { state: { id } })}
                        className="btnAgregar"
                    >
                        <FontAwesomeIcon icon={faPlus} />
                        +
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminCanchaenParque;
