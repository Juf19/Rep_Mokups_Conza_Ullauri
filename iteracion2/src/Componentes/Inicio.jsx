import React, { Component } from 'react';
import TrianguloSup from './TrianguloSup';
import TrianguloInf from './TrianguloInf';

class Inicio extends Component {
    render() {
        return (
            <div className='inicio-general'>
                <TrianguloSup />
                <div className="inicio-login-container">
                    <div className="inicio-frame">
                        <div className="inicio-content">
                            <div className="inicio-header">
                                <img
                                    src="quito.jpg"
                                    alt="Quito Emblem"
                                    className="inicio-emblem"
                                />
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
                        <input type="text" placeholder="Usuario" className="inicio-input" />
                        <input type="password" placeholder="Contraseña" className="inicio-input" />
                        <button className="inicio-button">INGRESAR</button>
                        <p className="inicio-register-link">Registrarse</p>
                    </div>
                </div>
                <TrianguloInf />
            </div>
        );
    }
}

export default Inicio;
