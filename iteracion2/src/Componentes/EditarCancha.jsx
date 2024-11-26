import React from 'react';
import ItemBajoHeader from './ItemBajoHeader';
import ItemHeaderA from './ItemHeaderA';
import BotonConFlecha from './BotonConFlecha';

const EditarCancha = () => {
    return (
        <div>
            <ItemHeaderA></ItemHeaderA>
            <ItemBajoHeader></ItemBajoHeader>
            <div className="contenedor">
                <div className="encabezado">
                    <label>Nombre</label>
                    <div className="nombre-parque">CF1</div>
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
                            <BotonConFlecha></BotonConFlecha>
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

export default EditarCancha;
