import React, { useState } from 'react';
import ItemHeaderA from './ItemHeaderA';
import ItemBajoHeader from './ItemBajoHeader';
import axios from 'axios';
import "../Estilos/ActualizarParque.css";
import { useParams, useNavigate } from 'react-router-dom';

const AdminAddCancha = () => {
  const { id } = useParams(); // Obtener el id del parque actual desde la URL
  const navigate = useNavigate();

  const [nuevaCancha, setNuevaCancha] = useState({
    nombre: '',
    descripcion: '',
    tipo: 'Futbol',  // Establecer el valor por defecto para el select
    horarios: [],
    dias: [],
    idParque: id // Asociar la cancha al parque actual
  });

  // Estado para controlar el modal de horarios
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHorarios, setSelectedHorarios] = useState([]);

  // Manejar cambios en los inputs
  const handleAddCancha = (e) => {
    const { name, value } = e.target;
    setNuevaCancha({ ...nuevaCancha, [name]: value });
  };

  // Manejar cambios en los checkboxes de días
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setNuevaCancha(prevCancha => {
      const dias = checked
        ? [...prevCancha.dias, value]
        : prevCancha.dias.filter(dia => dia !== value);
      return { ...prevCancha, dias };
    });
  };

  // Abrir el modal para editar horarios
  const openModal = () => {
    setSelectedHorarios(nuevaCancha.horarios); // Cargar los horarios actuales
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
    setNuevaCancha(prevCancha => ({
      ...prevCancha,
      horarios: selectedHorarios
    }));
    closeModal();
  };

  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Validar campos requeridos
    if (!nuevaCancha.nombre || !nuevaCancha.descripcion || !nuevaCancha.tipo) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }
  
    if (!Array.isArray(nuevaCancha.horarios) || nuevaCancha.horarios.length === 0) {
      alert("Por favor, selecciona al menos un horario.");
      return;
    }
  
    if (!Array.isArray(nuevaCancha.dias) || nuevaCancha.dias.length === 0) {
      alert("Por favor, selecciona al menos un día.");
      return;
    }
  
    if (!nuevaCancha.idParque || !/^[0-9a-fA-F]{24}$/.test(nuevaCancha.idParque)) {
      alert("ID del parque no es válido.");
      return;
    }
  
    // Enviar datos al backend
    axios
      .post(`http://localhost:8000/canchas`, nuevaCancha)
      .then(response => {
        console.log("Cancha Agregada:", response.data);
        navigate(`/Parque`);
      })
      .catch(error => {
        console.error("Error al agregar la Cancha:", error.response?.data || error.message);
        alert(error.response?.data?.mensaje || "Error inesperado al agregar la cancha.");
      });
  };

  return (
    <div>
      <ItemHeaderA />
      <ItemBajoHeader />
      <h3>Agregar Cancha</h3>
      <form onSubmit={handleSubmit}>
        <div className="parque-informacion">
          <div className="perfil-item">
            <label>Nombre</label>
            <input
              type="text"
              name="nombre"
              className="perfil-dato"
              value={nuevaCancha.nombre}
              onChange={handleAddCancha}
              required
            />
          </div>
          <div className="perfil-item">
            <label>Descripción</label>
            <input
              type="text"
              name="descripcion"
              className="perfil-dato"
              value={nuevaCancha.descripcion}
              onChange={handleAddCancha}
              required
            />
          </div>
          <div className="perfil-item">
            <label>Tipo de Cancha</label>
            <select name="tipo" className="perfil-dato" value={nuevaCancha.tipo} onChange={handleAddCancha}>
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
              {Array.isArray(nuevaCancha.horarios) && nuevaCancha.horarios.length > 0 ? (
                <ul>
                  {nuevaCancha.horarios.map((hora, index) => (
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
                    checked={nuevaCancha.dias.includes(dia)}
                    onChange={handleCheckboxChange}
                  />
                  <label>{dia}</label>
                </div>
              ))}
            </div>
          </div>
          <div className="parte-btn">
            <button type="submit" className="btn-save">
              Guardar
            </button>
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

export default AdminAddCancha;
