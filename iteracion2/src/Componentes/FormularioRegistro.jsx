import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegistroUsuario = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nombre: '',
        password: '',
        email: '',
        cedula: '',
        fechaNacimiento: '',
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showModal, setShowModal] = useState(false); // Estado para controlar la visibilidad del modal

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Validar que el usuario sea mayor de edad
        const today = new Date();
        const birthDate = new Date(formData.fechaNacimiento);
        if (today - birthDate < 18 * 365 * 24 * 60 * 60 * 1000) { // Menos de 18 años
            return setError('Debes ser mayor de edad para registrarte.');
        }

        try {
            await axios.post('http://localhost:8000/register', formData);
            setSuccess('Usuario creado exitosamente');
            setShowModal(true); // Mostrar el modal
            setFormData({
                nombre: '',
                password: '',
                email: '',
                cedula: '',
                fechaNacimiento: '',
            });
        } catch (err) {
            const message = err.response?.data?.message || 'Error al crear el usuario';
            setError(message);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false); // Ocultar el modal
        navigate('/'); // Redirigir al inicio
    };

    return (
        <div className="contenedor-registro">
            <h1 className="titulo-registro">Ingrese sus datos para el registro</h1>

            <form className="formulario-registro" onSubmit={handleSubmit}>
                <div className="imagen-usuario-registro">
                    <img
                        src="logo_persona.png"
                        alt="Usuario"
                        className="icono-usuario-registro"
                    />
                </div>

                <div className="campos-registro">
                    <input
                        type="text"
                        name="nombre"
                        placeholder="Nombre"
                        className="entrada-registro"
                        value={formData.nombre}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        className="entrada-registro"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Correo electrónico"
                        className="entrada-registro"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="cedula"
                        placeholder="Cédula"
                        className="entrada-registro"
                        value={formData.cedula}
                        onChange={handleChange}
                    />
                    <input
                        type="date"
                        name="fechaNacimiento"
                        className="entrada-registro"
                        value={formData.fechaNacimiento}
                        onChange={handleChange}
                    />
                    <button type="submit" className="boton-registro">
                        Crear cuenta
                    </button>
                </div>
            </form>

            {error && <p className="mensaje-error">{error}</p>}
            {success && <p className="mensaje-exito">{success}</p>}

            {/* Modal de éxito */}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>¡Usuario registrado!</h2>
                        <p>Su cuenta ha sido creada exitosamente.</p>
                        <button onClick={handleCloseModal}>Aceptar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RegistroUsuario;
