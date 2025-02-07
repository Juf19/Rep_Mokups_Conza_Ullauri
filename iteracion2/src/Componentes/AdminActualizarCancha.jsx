import React, { useState, useEffect } from 'react';
import ItemHeaderA from './ItemHeaderA';
import ItemBajoHeader from './ItemBajoHeader';
import axios from 'axios';
import "../Estilos/ActualizarParque.css";
import { useParams, useNavigate } from 'react-router-dom';

const AdminActualizarCancha = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [canchas, setCanchas] = useState({
    id: '',
    nombre: '',
    descripcion: '',
    tipo: '',
    horarios: [], // Asegurarse de que sea un arreglo vacío
    dias: [],
    idParque: ''
  });

  // Estado para controlar el modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHorarios, setSelectedHorarios] = useState([]);
  
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

  // Obtener detalles de la cancha específica
  useEffect(() => {
    if (token) {  // Verificar si el token existe
      axios
        .get(`http://localhost:8000/canchas/${id}`, {
          headers: obtenerHeadersConToken()  // Usar la función para los encabezados
        })
        .then((response) => {
          const canchasData = response.data;
          
          // Asegurarse de que los horarios estén en formato de arreglo
          const horarios = Array.isArray(canchasData.horarios) 
            ? canchasData.horarios
            : canchasData.horarios.split(',');  // Si es una cadena, convertirlo a un arreglo
          
          setCanchas({ ...canchasData, horarios }); // Actualizamos canchas con los horarios correctos
        })
        .catch((error) => {
          console.error("Error al obtener las canchas:", error);
        });
    } else {
      console.error("No se encontró el token de autorización.");
    }
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCanchas(prevCanchas => ({
      ...prevCanchas,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setCanchas(prevCanchas => {
      const dias = checked
        ? [...prevCanchas.dias, value]
        : prevCanchas.dias.filter(dia => dia !== value);
      return { ...prevCanchas, dias };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8000/canchas/${id}`, canchas, {
      headers: obtenerHeadersConToken()  // Usar los encabezados con token
    })
      .then(response => {
        console.log('Cancha actualizada:', response.data);
        navigate(`/Parque/${canchas.idParque}/canchas`);
      })
      .catch(error => {
        console.error('Error al actualizar la cancha:', error);
      });
  };

  // Abrir el modal
  const openModal = () => {
    setSelectedHorarios(canchas.horarios); // Cargar los horarios actuales
    setIsModalOpen(true);
  };

  // Cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Manejar la selección de horarios
  const handleHorarioSelection = (horario) => {
    setSelectedHorarios(prevSelected => {
      if (prevSelected.includes(horario)) {
        return prevSelected.filter(h => h !== horario);
      } else {
        return [...prevSelected, horario];
      }
    });
  };

  // Guardar los horarios seleccionados
  const saveHorarios = () => {
    setCanchas(prevCanchas => ({
      ...prevCanchas,
      horarios: selectedHorarios
    }));
    closeModal();
  };

  return (
    <div>
      <ItemHeaderA />
      <ItemBajoHeader />
      <h3>Editar Cancha</h3>
      <form onSubmit={handleSubmit}>

        <div className="parque-informacion">
          <div className="perfil-item">
            <label>Nombre</label>
            <input type="text" name="nombre" className="perfil-dato" value={canchas.nombre} onChange={handleChange} />
          </div>
          <div className="perfil-item">
            <label>Descripcion</label>
            <input type="text" name="descripcion" className="perfil-dato" value={canchas.descripcion} onChange={handleChange} />
          </div>
          <div className="perfil-item">
            <label>Tipo de Cancha</label>
            <select name="tipo" className="perfil-dato" value={canchas.tipo} onChange={handleChange}>
              <option value="Futbol">Fútbol</option>
              <option value="Basquet">Básquet</option>
              <option value="Tenis">Tenis</option>
            </select>
          </div>
          <div className="perfil-item">
            <label>Horarios</label>
            <button type="button" onClick={openModal} className="btn-open-modal">
              Editar Horarios
            </button>
            <div>
              {Array.isArray(canchas.horarios) && canchas.horarios.length > 0 ? (
                <ul>
                  {canchas.horarios.map((hora, index) => (
                    <li key={index}>{hora}</li>
                  ))}
                </ul>
              ) : (
                <p>No hay horarios seleccionados.</p>
              )}
            </div>
          </div>
          <div className="perfil-item">
            <label>Días Disponibles</label>
            <div className="dias-container">
              {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"].map(dia => (
                <div key={dia} className="dia-item">
                  <input
                    type="checkbox"
                    value={dia}
                    checked={canchas.dias.includes(dia)}
                    onChange={handleCheckboxChange}
                  />
                  <label>{dia}</label>
                </div>
              ))}
            </div>
          </div>
          <div className="parte-btn">
            <button type="submit" className="btn-save">Guardar</button>
          </div>
        </div>
      </form>

      {/* Modal para horarios */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h4>Selecciona los horarios</h4>
            <div className="horarios-list">
              {Array.from({ length: 14 }, (_, i) => (
                <div key={i} className="horario-item">
                  <input
                    type="checkbox"
                    value={`${7 + i}:00-${8 + i}:00`}
                    checked={selectedHorarios.includes(`${7 + i}:00-${8 + i}:00`)}
                    onChange={() => handleHorarioSelection(`${7 + i}:00-${8 + i}:00`)}
                  />
                  <label>{`${7 + i}:00-${8 + i}:00`}</label>
                </div>
              ))}
            </div>
            <div className="modal-buttons">
              <button onClick={saveHorarios} className="btn-save">Guardar</button>
              <button onClick={closeModal} className="btn-cancel">Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminActualizarCancha;
