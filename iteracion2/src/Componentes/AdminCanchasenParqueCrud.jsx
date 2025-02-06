import React, { useState, useEffect } from 'react';
import ItemBajoHeader from './ItemBajoHeader';
import ItemHeaderA from './ItemHeaderA';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilAlt, faInfoCircle,faPlus } from '@fortawesome/free-solid-svg-icons';
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

    // Obtener detalles del parque actual
    useEffect(() => {
        axios
            .get(`http://localhost:8000/parques/${id}`)
            .then((response) => {
                setParques(response.data);
            })
            .catch((error) => {
                console.error("Error al obtener el parque:", error);
            });
    }, [id]);

    // Obtener canchas filtradas por el parque actual
    useEffect(() => {
        axios
            .get(`http://localhost:8000/canchas`)
            .then((response) => {
                const canchasFiltradas = response.data.filter(cancha => cancha.idParque === id);
                setData(canchasFiltradas);
            })
            .catch((error) => {
                console.error("Error al obtener las canchas:", error);
            });
    }, [id]);

    // Eliminar una cancha
    const handleEliminar = async (canchaId) => {
        const confirmDelete = window.confirm("¿Estás seguro que deseas borrar esta cancha?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:8000/canchas/${canchaId}`);
                const updatedData = data.filter((cancha) => cancha._id !== canchaId);
                setData(updatedData);
                Swal.fire({
                          icon: 'success',
                          title: 'Éxito',
                          text: 'Cancha eliminado con exito',
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
                                            onClick={() => navigate(`/Parque/${cancha.idParque}/canchas/${cancha._id}/actualizar`)}
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
                        onClick={() => navigate(`/Parque/${id}/canchas/new`)}

                    className="btnAgregar">  <FontAwesomeIcon icon={faPlus} />
                        +
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminCanchaenParque;
