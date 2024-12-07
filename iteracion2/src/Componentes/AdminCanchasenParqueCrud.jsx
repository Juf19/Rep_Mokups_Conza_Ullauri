import React from 'react';
import ItemBajoHeader from './ItemBajoHeader';
import ItemHeaderA from './ItemHeaderA';
import TablasTodoAdmin from './TablasTodoAdmin';

const AdminCanchaenParque = () => {
    const canchas = [
        { nombre: "C-F10" },
        { nombre: "C-F2" },
        { nombre: "C-B1" }
    ];

    const item = [
        { nombre: "Parques" },
        { accion: "Acción" }
    ];
    return (
        <div>
            <ItemHeaderA></ItemHeaderA>
            <ItemBajoHeader></ItemBajoHeader>
            <div className="contenedor">
                <div className="encabezado">
                    <label>Nombre</label>
                    <div className="nombre-parque">La Carolina</div>
                </div>

                <div className="seccion-imagen">
                    <img
                        src="carolina.jpg"
                        alt="Parque"
                        className="imagen-parque"
                    />
                </div>

                <div className="seccion-tabla">

                    <TablasTodoAdmin items={item} data={canchas}></TablasTodoAdmin>

                </div>
            </div>
        </div>
    );
};

export default AdminCanchaenParque;
