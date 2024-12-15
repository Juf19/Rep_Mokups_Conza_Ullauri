import React, { useState, useEffect } from 'react';
import ItemBajoHeader from './ItemBajoHeader';
import ItemHeaderA from './ItemHeaderA';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilAlt, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

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
            .get(`http://localhost:3001/parques/${id}`)
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
            .get(`http://localhost:3001/canchas`)
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
                await axios.delete(`http://localhost:3001/canchas/${canchaId}`);
                const updatedData = data.filter((cancha) => cancha.id !== canchaId);
                setData(updatedData);
                alert("Cancha eliminada con éxito.");
            } catch (error) {
                console.error("Error al eliminar la cancha:", error);
                alert("No se pudo eliminar la cancha.");
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
                                            onClick={() => navigate(`/Parque/${cancha.idParque}/canchas/${cancha.id}/actualizar`)}
                                        >
                                            <FontAwesomeIcon icon={faPencilAlt} />
                                        </button>
                                        <button
                                            className="btnBorrar"
                                            onClick={() => handleEliminar(cancha.id)}
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                        <button
                                            className="btnDetalle"
                                            onClick={() => navigate(`/Parque/${cancha.idParque}/canchas/${cancha.id}/detalles`)}
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
                        className="boton-agregar"
                        onClick={() => navigate(`/Parque/${id}/canchas/new`)}
                    >
                        +
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminCanchaenParque;
