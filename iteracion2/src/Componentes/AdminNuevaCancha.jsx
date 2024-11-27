import React, { useState } from 'react';
import ItemBajoHeader from './ItemBajoHeader';
import ItemHeaderA from './ItemHeaderA';
import BotonConFlecha from './BotonConFlecha';

const AdminNuevaCancha = () => {
    // Estado para controlar el valor del input de nombre
    const [nombre, setNombre] = useState("C-F1");

    // Manejar cambios en el input
    const handleNombreChange = (event) => {
        setNombre(event.target.value);
    };

    return (
        <div>
            <ItemHeaderA />
            <ItemBajoHeader />
            <div className="contenedor">
                <div className="encabezado">
                    <label>Nombre</label>
                    <input 
                        type="text" 
                        className="input-nombre" 
                        value={nombre} 
                        onChange={handleNombreChange} 
                    />
                </div> 

                <div className="seccion-tabla">
                    <div className="desplegable">
                        <select>
                            <option value="">-- TIPO--</option>
                            <option value="Futbol">Futbol</option>
                            <option value="Basquet">Basquet</option>
                        </select>
                    </div>
                    <div className='inferior'>
                        <table className="tabla-canchas">
                            <tbody>
                                <tr>
                                    <td>Basquet</td>
                                    <td>
                                        <button className="boton-agregar">+</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Futbol</td>
                                    <td>
                                        <button className="boton-eliminar">−</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="seccion-tabla">
                    <div className="desplegable">
                        <select>
                            <option value="">-- HORARIOS--</option>
                            <option value="Futbol">7-8</option>
                            <option value="Basquet">8-9</option>
                        </select>
                    </div>
                    <div className='inferior'>
                        <div className='pie'>
                            <BotonConFlecha />
                        </div>
                        <table className="tabla-canchas">
                            <tbody>
                                <tr>
                                    <td>7-8</td>
                                    <td>
                                        <button className="boton-agregar">+</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>8-9</td>
                                    <td>
                                        <button className="boton-eliminar">−</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className='pie'>
                            <button className="boton-guardar">Guardar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminNuevaCancha;
