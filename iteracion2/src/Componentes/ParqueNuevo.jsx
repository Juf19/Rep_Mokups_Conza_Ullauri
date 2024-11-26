import React from 'react';
import ItemBajoHeader from './ItemBajoHeader';
import ItemHeaderA from './ItemHeaderA';
import BotonConFlecha from './BotonConFlecha';

const ParqueNuevo = () => {
    return (
        <div>
            <ItemHeaderA></ItemHeaderA>
            <ItemBajoHeader></ItemBajoHeader>
        <div className="contenedor">
            <div className="encabezado">
                <label>Nombre</label>
                <input className="input-nombre"></input>
            </div>

            <div className="seccion-imagen">
                <img
                    src="https://via.placeholder.com/100"
                    alt="Parque"
                    className="imagen-parque"
                />
                <div>
                    <button className="boton-cargar">Cargar imagen</button>
                </div>
            </div>

            <div className="seccion-tabla">

                <div className="desplegable">
                    <select>
                        <option value="C-F10">C-F10</option>
                        <option value="C-B1">C-B1</option>
                    </select>
                </div>
                <div className='inferior'>
                    <div className='pie'>
              <BotonConFlecha></BotonConFlecha>
                </div>
                    <table className="tabla-canchas">
                        
                        <tbody>
                            <tr>
                                <td>C-F10</td>
                                <td>
                                    <button className="boton-agregar">+</button>
                                </td>
                            </tr>
                            <tr>
                                <td>C-B1</td>
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

export default ParqueNuevo;
