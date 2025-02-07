import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Snackbar, Alert, Container, Box, Typography } from '@mui/material';

const RegistroUsuario = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nombre: '',
        password: '',
        email: '',
        cedula: '',
        fechaNacimiento: '',
    });

    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        let newErrors = {};
        const { nombre, email, password, cedula, fechaNacimiento } = formData;

        if (!nombre) newErrors.nombre = "El nombre es requerido.";
        if (!email) newErrors.email = "El correo es requerido.";
        else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email))
            newErrors.email = "Formato de correo inválido.";
        if (!password) newErrors.password = "La contraseña es requerida.";
        else if (password.length < 6) newErrors.password = "Debe tener al menos 6 caracteres.";
        if (!cedula) newErrors.cedula = "La cédula es requerida.";
        if (!fechaNacimiento) newErrors.fechaNacimiento = "La fecha de nacimiento es requerida.";
        else {
            const today = new Date();
            const birthDate = new Date(fechaNacimiento);
            if (today - birthDate < 18 * 365 * 24 * 60 * 60 * 1000)
                newErrors.fechaNacimiento = "Debes ser mayor de edad.";
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            await axios.post('http://localhost:8000/register', formData);
            setSuccess(true);
            setFormData({ nombre: '', password: '', email: '', cedula: '', fechaNacimiento: '' });
            setErrors({});
        } catch (err) {
            setErrors({ server: "Error al registrar usuario." });
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 2, textAlign: 'center' }}>
                <Typography variant="h5" gutterBottom>Registro de Usuario</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        placeholder="Nombre completo"
                        name="nombre"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={formData.nombre}
                        onChange={handleChange}
                        error={!!errors.nombre}
                        helperText={errors.nombre}
                    />
                    <TextField
                        placeholder="Correo electrónico"
                        name="email"
                        type="email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={formData.email}
                        onChange={handleChange}
                        error={!!errors.email}
                        helperText={errors.email}
                    />
                    <TextField
                        placeholder="Contraseña"
                        name="password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={formData.password}
                        onChange={handleChange}
                        error={!!errors.password}
                        helperText={errors.password}
                    />
                    <TextField
                        placeholder="Cédula"
                        name="cedula"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={formData.cedula}
                        onChange={handleChange}
                        error={!!errors.cedula}
                        helperText={errors.cedula}
                    />
                    <TextField
                        placeholder="Fecha de nacimiento"
                        name="fechaNacimiento"
                        type="date"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={formData.fechaNacimiento}
                        onChange={handleChange}
                        error={!!errors.fechaNacimiento}
                        helperText={errors.fechaNacimiento}
                        
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                        Crear cuenta
                    </Button>
                </form>

                {errors.server && <Alert severity="error" sx={{ mt: 2 }}>{errors.server}</Alert>}

                <Snackbar open={success} autoHideDuration={4000} onClose={() => setSuccess(false)}>
                    <Alert onClose={() => setSuccess(false)} severity="success" sx={{ width: '100%' }}>
                        Usuario registrado exitosamente
                    </Alert>
                </Snackbar>
            </Box>
        </Container>
    );
};

export default RegistroUsuario;
