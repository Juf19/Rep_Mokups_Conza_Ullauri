import React from 'react';
import ItemHeader from './ItemHeader';
import ItemBajoHeader from './ItemBajoHeader';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UsPerfil = () => {
    const navigate = useNavigate();
    const [parques, setParques] = useState({
      id: '',
      nombre: '',
      descripcion: '',
    });
    const { id } = useParams();
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

      const handleChange = (e) => {
        const { name, value } = e.target;
        setParques(prevsetParques => ({
          ...prevsetParques,
          [name]: value
        }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3001/parques/${id}`, parques)
          .then(response => {
            console.log('setParques actualizado:', response.data);
            // navigate(`/setParquess/${id}`);
            navigate(`/`);
          })
          .catch(error => {
            console.error('Error al actualizar el setParques:', error);
          });
      };
    
  return (

<div className="perfil-informacion">
      <div className="perfil-item">
        <label>Nombre</label>
        <input type="text" className="perfil-dato" placeholder="Jhuliet Conza"/>
      </div>
      <div className="perfil-item">
        <label>Correo electrónico</label>
        <input type="email" className="perfil-dato" placeholder="jhulietconza@gmail.com"/>
      </div>
      <div className="perfil-item">
        <label>Cédula</label>
        <input type="text" className="perfil-dato" placeholder="1716939017"/>
      </div>
      <div className="perfil-item">
        <label>Fecha de nacimiento</label>
        <input type="text" className="perfil-dato" placeholder="11/05/1995"/>
      </div>
    </div>

  );
}; 

export default UsPerfil;