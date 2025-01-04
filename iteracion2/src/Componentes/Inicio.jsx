import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import axios from 'axios'; // Importa Axios
import TrianguloSup from './TrianguloSup';
import TrianguloInf from './TrianguloInf';

const Inicio = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate(); // Inicializa useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/login', {
                email,
                password,
            });

            // Aquí puedes acceder a la respuesta directamente
            const data = response.data;

            // Guardar token y redirigir según el rol
            localStorage.setItem('token', data.token);
            if (data.rol === 'Administrador') {
                navigate('/HomeAdmin'); // Redirigir a admin
            } else {
                navigate('/HomeUser'); // Redirigir a usuario
            }
        } catch (error) {
            // Manejo del error
            if (error.response) {
                // La solicitud se realizó y el servidor respondió con un código de estado que no está en el rango de 2xx
                setErrorMessage(error.response.data.message); // Muestra el mensaje de error del servidor
            } else if (error.request) {
                // La solicitud se realizó pero no se recibió respuesta
                setErrorMessage('Error de conexión');
            } else {
                // Algo sucedió al configurar la solicitud que provocó un error
                setErrorMessage('Error desconocido');
            }
        }
    };

    return (
        <div className='inicio-general'>
            <TrianguloSup />
            <div className="inicio-login-container">
                <div className="inicio-frame">
                    <div className="inicio-content">
                        <div className="inicio-header">
                            <img src="quito.jpg" alt="Quito Emblem" className="inicio-emblem" />
                        </div>
                        <div className="inicio-text">
                            <h1 className='si'>Distrito Metropolitano de "QUITO"</h1>
                            <h2>¡Bienvenidos!</h2>
                            <div className="inicio-linea-gris"></div>
                            <p>Sistema de reservación de cancha</p>
                        </div>
                    </div>
                </div>
                <div className="inicio-login-box">
                    <div className="inicio-user-icon">
                        <img src="logo_persona.png" alt="logoPersona" id="inicio-icon" />
                    </div>
                    <h3>Iniciar sesión</h3>
                    {errorMessage && <p>{errorMessage}</p>}
                    <form onSubmit={handleSubmit}>
                        <input 
                            type="text" 
                            placeholder="Usuario" 
                            className="inicio-input" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                        <input 
                            type="password" 
                            placeholder="Contraseña" 
                            className="inicio-input" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                        <button type="submit" className="inicio-button">INGRESAR</button>
                    </form>
                    <p className="inicio-register-link">Registrarse</p>
                </div>
            </div>
            <TrianguloInf />
        </div>
    );
};

export default Inicio;
