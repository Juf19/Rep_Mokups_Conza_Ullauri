import React from 'react';

const RegistroUsuario = () => {
    return (
        <div className="contenedor-registro">
             <h1 className="titulo-registro">Ingrese sus datos para el registro</h1>

            <div className="formulario-registro">
               
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
                        placeholder="Usuario"
                        className="entrada-registro"
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        className="entrada-registro"
                    />
                    <input
                        type="email"
                        placeholder="Correo electrónico"
                        className="entrada-registro"
                    />
                    <input
                        type="date"
                        className="entrada-registro"
                    />
                </div>

                
            </div>
            <button className="boton-registro">Crear cuenta</button>
        </div>
    );
};

export default RegistroUsuario;
