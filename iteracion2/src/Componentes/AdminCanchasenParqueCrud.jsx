import React from 'react';
import ItemBajoHeader from './ItemBajoHeader';
import ItemHeaderA from './ItemHeaderA';
import TablasTodoAdmin from './TablasTodoAdmin';
import { useState, useEffect } from 'react';
import axios from 'axios';  
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilAlt, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const AdminCanchaenParque = () => {
    const { id } = useParams();
    const navigate=useNavigate();
   const [data, setData] = useState([]);
    const [parques, setParques] = useState({
        id: '',
        nombre: '',
        descripcion: '',
        url: ''
      });
      
      useEffect(() => {
        axios
          .get(`http://localhost:3001/parques/${id}`) // URL 
          .then((response) => {
            setParques(response.data);
          })
          .catch((error) => {
            console.error("Error al obtener los parques:", error);
          });
      }, [id]);
      useEffect(() => {
        axios
          .get(`http://localhost:3001/canchas`) // URL 
          .then((response) => {
            setData(response.data);
          })
          .catch((error) => {
            console.error("Error al obtener las canchas:", error);
          });
      })
    const item = [
        { nombre: "Canchas" },
        { accion: "Acción" }
    ];
    return (
        <div>
            <ItemHeaderA></ItemHeaderA>
            <ItemBajoHeader></ItemBajoHeader>
            <div className="contenedor">
                <div className="encabezado">
                    <label>Nombre</label>
                    <div className="nombre-parque">
                    <input type="text" name="nombre" className="perfil-dato1" value={parques.nombre} disabled={true} />
                    </div>
                </div>

                <div className="seccion-imagen">
                    <img
                        src="carolina.jpg"
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
                
                                <td>{cancha.nombre} </td>
                                <td>
                                <button className="btnEditar" onClick={() => navigate(`/canchas/update/${cancha.id}`)}><FontAwesomeIcon icon={faPencilAlt} /></button>
                                <button className="btnBorrar" ><FontAwesomeIcon icon={faTrash} /></button>
                                <button className="btnDetalle" onClick={() => navigate(`/canchas/detalle/${cancha.id}`)}><FontAwesomeIcon icon={faInfoCircle} /></button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <button className="boton-agregar" onClick={() => navigate(`/canchas/new`)}>+</button>
                      </div>
            </div>
        </div>
    );
};

export default AdminCanchaenParque;
