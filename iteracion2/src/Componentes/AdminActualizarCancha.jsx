import React, { useState, useEffect } from 'react';
import ItemHeaderA from './ItemHeaderA';
import ItemBajoHeader from './ItemBajoHeader';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Grid, TextField, Select, MenuItem, Button, FormControlLabel, Checkbox, Box, Modal } from '@mui/material';


const AdminActualizarCancha = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [canchas, setCanchas] = useState({
    id: '',
    nombre: '',
    descripcion: '',
    tipo: '',
    horarios: [],
    dias: [],
    idParque: ''
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHorarios, setSelectedHorarios] = useState([]);
  const token = localStorage.getItem('token');

  const obtenerHeadersConToken = () => {
    if (!token) {
      throw new Error("No se encontró el token de autorización.");
    }
    return {
      Authorization: `Bearer ${token}`
    };
  };

  useEffect(() => {
    const fetchCancha = async () => {
      try {
        if (!token) {
          console.error("No se encontró el token de autorización.");
          return;
        }

        const response = await axios.get(`http://localhost:8000/canchas/${id}`, {
          headers: obtenerHeadersConToken()
        });

        const canchasData = response.data;

        const horarios = Array.isArray(canchasData.horarios)
          ? canchasData.horarios
          : canchasData.horarios.split(',');

        setCanchas({ ...canchasData, horarios });
      } catch (error) {
        console.error("Error al obtener las canchas:", error);
      }
    };

    fetchCancha();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/canchas/${id}`, canchas, {
        headers: obtenerHeadersConToken()
      });
      console.log('Cancha actualizada:', canchas);
      navigate(`/Parque/${canchas.idParque}/canchas`);
    } catch (error) {
      console.error('Error al actualizar la cancha:', error);
    }
  };

  const openModal = () => {
    setSelectedHorarios(canchas.horarios);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleHorarioSelection = (horario) => {
    setSelectedHorarios(prevSelected => {
      if (prevSelected.includes(horario)) {
        return prevSelected.filter(h => h !== horario);
      } else {
        return [...prevSelected, horario];
      }
    });
  };

  const saveHorarios = () => {
    setCanchas(prevCanchas => ({
      ...prevCanchas,
      horarios: selectedHorarios
    }));
    closeModal();
  };

  const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
  const horariosDisponibles = Array.from({ length: 14 }, (_, i) => `${7 + i}:00-${8 + i}:00`);

  return (
    <div className="admin-actualizar-cancha"> {/*  Clase contenedora principal */}
      <ItemHeaderA />
      <ItemBajoHeader />
      <Container maxWidth="md" className="admin-actualizar-cancha-container">
        <Typography variant="h4" component="h3" gutterBottom className="admin-actualizar-cancha-title">
          Editar Cancha
        </Typography>
        <form onSubmit={handleSubmit} className="admin-actualizar-cancha-form">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Nombre"
                name="nombre"
                value={canchas.nombre}
                onChange={handleChange}
                variant="outlined"
                className="admin-actualizar-cancha-textfield"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Descripción"
                name="descripcion"
                value={canchas.descripcion}
                onChange={handleChange}
                variant="outlined"
                className="admin-actualizar-cancha-textfield"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Select
                fullWidth
                label="Tipo de Cancha"
                name="tipo"
                value={canchas.tipo}
                onChange={handleChange}
                variant="outlined"
                className="admin-actualizar-cancha-select"
              >
                <MenuItem value="Futbol">Fútbol</MenuItem>
                <MenuItem value="Basquet">Básquet</MenuItem>
                <MenuItem value="Tenis">Tenis</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box mt={2}>
                <Button variant="contained" color="primary" onClick={openModal} className="admin-actualizar-cancha-button">
                  Editar Horarios
                </Button>
                <Typography variant="subtitle1" mt={1} className="admin-actualizar-cancha-subtitle">
                  Horarios Seleccionados:
                </Typography>
                {Array.isArray(canchas.horarios) && canchas.horarios.length > 0 ? (
                  <ul className="admin-actualizar-cancha-list">
                    {canchas.horarios.map((hora, index) => (
                      <li key={index} className="admin-actualizar-cancha-list-item">{hora}</li>
                    ))}
                  </ul>
                ) : (
                  <Typography variant="body2">No hay horarios seleccionados.</Typography>
                )}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" className="admin-actualizar-cancha-subtitle">Días Disponibles:</Typography>
              <Box display="flex" flexWrap="wrap">
                {diasSemana.map(dia => (
                  <FormControlLabel
                    key={dia}
                    control={
                      <Checkbox
                        value={dia}
                        checked={canchas.dias.includes(dia)}
                        onChange={handleCheckboxChange}
                        name={dia}
                      />
                    }
                    label={dia}
                    className="admin-actualizar-cancha-formcontrollabel"
                  />
                ))}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center" mt={3}>
                <Button variant="contained" color="success" type="submit" className="admin-actualizar-cancha-button-save">
                  Guardar
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>

        {/* Modal para horarios */}
        <Modal open={isModalOpen} onClose={closeModal} className="admin-actualizar-cancha-modal">
          <Box className="admin-actualizar-cancha-modal-content">
            <Typography variant="h6" component="h4" gutterBottom className="admin-actualizar-cancha-modal-title">
              Selecciona los horarios
            </Typography>
            <Box display="flex" flexDirection="column">
              {horariosDisponibles.map(horario => (
                <FormControlLabel
                  key={horario}
                  control={
                    <Checkbox
                      value={horario}
                      checked={selectedHorarios.includes(horario)}
                      onChange={() => handleHorarioSelection(horario)}
                    />
                  }
                  label={horario}
                />
              ))}
            </Box>
            <Box mt={2} display="flex" justifyContent="space-around">
              <Button variant="contained" color="success" onClick={saveHorarios} className="admin-actualizar-cancha-modal-button-save">
                Guardar
              </Button>
              <Button variant="contained" color="error" onClick={closeModal} className="admin-actualizar-cancha-modal-button-close">
                Cerrar
              </Button>
            </Box>
          </Box>
        </Modal>
      </Container>
    </div>
  );
};

export default AdminActualizarCancha;
