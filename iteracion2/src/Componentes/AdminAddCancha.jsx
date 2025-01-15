import React, { useState } from 'react';
import ItemHeaderA from './ItemHeaderA';
import ItemBajoHeader from './ItemBajoHeader';
import axios from 'axios';
import "../Estilos/ActualizarParque.css";
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css'
import { FaTimes } from 'react-icons/fa';


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
      Swal.fire({
        title: 'Error',
        text: 'Por favor, completa todos los campos obligatorios',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    if (!Array.isArray(nuevaCancha.horarios) || nuevaCancha.horarios.length === 0) {
      Swal.fire({
        title: 'Error',
        text: 'Por favor, selecciona al menos un horario',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    if (!Array.isArray(nuevaCancha.dias) || nuevaCancha.dias.length === 0) {
      Swal.fire({
        title: 'Error',
        text: 'Por favor, selecciona al menos un día',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    if (!nuevaCancha.idParque || !/^[0-9a-fA-F]{24}$/.test(nuevaCancha.idParque)) {
      Swal.fire({
        title: 'Error',
        text: 'ID del parque no es válido',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
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
  <h3 className="mb-4">Agregar Cancha</h3>
  <form onSubmit={handleSubmit}>
    <div className="parque-informacion">
      
      {/* Campo Nombre */}
      <div className="perfil-item mb-4">
        <label htmlFor="nombre" className="form-label">Nombre</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          className="form-control form-control-lg"
          placeholder="Ingrese su nombre"
          value={nuevaCancha.nombre}
          onChange={handleAddCancha}
          required
        />
      </div>

      {/* Campo Descripción */}
      <div className="perfil-item mb-4">
        <label htmlFor="descripcion" className="form-label">Descripción</label>
        <input
          type="text"
          id="descripcion"
          name="descripcion"
          className="form-control"
          placeholder="Ingrese una descripción"
          value={nuevaCancha.descripcion}
          onChange={handleAddCancha}
          required
        />
      </div>

      {/* Campo Tipo de Cancha */}
      <div className="perfil-item mb-4">
        <label htmlFor="tipo" className="form-label">Tipo de Cancha</label>
        <select
          name="tipo"
          id="tipo"
          className="form-select"
          value={nuevaCancha.tipo}
          onChange={handleAddCancha}
        >
          <option value="">Seleccione un tipo</option>
          <option value="Futbol">Fútbol</option>
          <option value="Basquet">Básquet</option>
          <option value="Tenis">Tenis</option>
        </select>
      </div>

      {/* Campo Horarios */}
      <div className="perfil-item mb-4">
        <label className="form-label">Horarios</label>
        <button type="button" onClick={openModal} className="btn btn-primary mb-2">
          Editar Horarios
        </button>
        <div className="horarios-container">
          {Array.isArray(nuevaCancha.horarios) && nuevaCancha.horarios.length > 0 ? (
            nuevaCancha.horarios.map((hora, index) => (
              <div key={index} className="horario-item d-flex justify-content-center align-items-center">
                <span className="horario-text">{hora}</span>
                {/* Mostrar "X" para eliminar */}
                <span
                  onClick={() => {
                    setNuevaCancha(prevCancha => ({
                      ...prevCancha,
                      horarios: prevCancha.horarios.filter((_, i) => i !== index),
                    }));
                  }}
                  className="horario-remove-btn" // Clase para la "X"
                >
                  &times; {/* Este es el símbolo "X" */}
                </span>
              </div>
            ))
          ) : (
            <p>No hay horarios seleccionados.</p>
          )}
        </div>
      </div>

      {/* Días Disponibles */}
      <div className="perfil-item mb-4">
        <label className="form-label">Días Disponibles</label>
        <div className="dias-container d-flex flex-wrap">
          {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"].map(dia => (
            <div key={dia} className="form-check me-3 mb-2 d-flex align-items-center">
              <input
                type="checkbox"
                id={`dia-${dia}`}
                value={dia}
                checked={nuevaCancha.dias.includes(dia)}
                onChange={handleCheckboxChange}
                className="form-check-input border border-dark" // Aumentar el borde del checkbox
              />
              <label htmlFor={`dia-${dia}`} className="form-check-label ms-2">{dia}</label> {/* Alinear etiqueta */}
            </div>
          ))}
        </div>
      </div>

      {/* Botón Guardar */}
      <div className="parte-btn">
        <button type="submit" className="btn btn-success">
          Guardar
        </button>
      </div>
    </div>
  </form>




      {/* Modal para horarios */}
      {isModalOpen && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" aria-labelledby="horariosModal" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="horariosModal">Selecciona los horarios</h5>
                <button type="button" className="btn-close" onClick={closeModal} aria-label="Cerrar"></button>
              </div>
              <div className="modal-body">
                <div className="d-flex flex-wrap justify-content-start">
                  {Array.from({ length: 14 }, (_, i) => (
                    <div key={i} className="form-check me-3 mb-0"> {/* Cambia mb-2 a mb-0 para eliminar margen inferior */}
                      <input
                        type="checkbox"
                        className="form-check-input"
                        value={`${7 + i}-${8 + i}`}
                        checked={selectedHorarios.includes(`${7 + i}-${8 + i}`)}
                        onChange={() => handleHorarioSelection(`${7 + i}-${8 + i}`)}
                        id={`horario-${7 + i}`}
                      />
                      <label className="form-check-label" htmlFor={`horario-${7 + i}`}>{`${7 + i}-${8 + i}`}</label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="modal-footer">
                <button onClick={saveHorarios} className="btn btn-primary">Guardar</button>
                <button onClick={closeModal} className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAddCancha;
