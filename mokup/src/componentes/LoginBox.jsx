import React, { Component } from 'react';


class LoginBox extends Component {
    render() {
        return (
            <div className="login-box">
                
                <div className="frame">
                    <div className="content">
                        <div className="header">
                            <img
                                src="quito.jpg"
                                alt="Quito Emblem"
                                className="q"
                            />
                        </div>
                        <div className='text'>
                            <h1>Distrito Metropolitano de "QUITO"</h1>
                            <h2>¡Bienvenidos!</h2>
                            <div className="linea-gris"></div>
                            <p>Sistema de reservación de cancha</p>
                        </div>

                    </div>
                </div>
                <div className='log'>
                    <div className="user-icon">
                        <img src="logo_persona.png" alt="logoPersona" id='p' />
                    </div>
                    <h3>Iniciar sesión</h3>
                    <input type="text" placeholder="Usuario" className="input-field" />
                    <input type="password" placeholder="Contraseña" className="input-field" />
                    <button className="login-button">INGRESAR</button>
                    <p className="register-link">Registrarse</p>
                </div>
            </div>
        );
    }
}

export default LoginBox;
