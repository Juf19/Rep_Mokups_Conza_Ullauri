import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ItemHeader from './ItemHeader';
import ItemBajoHeader from './ItemBajoHeader';
import CalendarioRectangulo from './CalendarioRectangulo';

const UsReservaCancha = () => {
    const [horariosSeleccionados, setHorariosSeleccionados] = useState([]);
    const [aceptarTerminos, setAceptarTerminos] = useState(false);

    const navigate = useNavigate();

    const texto = [{ nombre: "CANCHA 1" }];
    const horarios = ['8-9', '9-10', '10-11', '11-12', '12-13', '13-14', '14-15', '15-16', '16-17', '17-18', '18-19'];

    const handleHorarioClick = (horario) => {
        if (horariosSeleccionados.includes(horario)) {
            setHorariosSeleccionados((prev) => prev.filter((h) => h !== horario));
        } else if (horariosSeleccionados.length < 2) {
            setHorariosSeleccionados((prev) => [...prev, horario]);
        } else {
            alert('No puede seleccionar más de dos horarios.');
        }
    };

    const handleReserva = () => {
        if (aceptarTerminos && horariosSeleccionados.length > 0) {
            navigate('/confirmacion', {
                state: { cancha: texto[0].nombre, horarios: horariosSeleccionados },
            });
        } else {
            alert('Debe seleccionar al menos un horario y aceptar los términos y condiciones.');
        }
    };

    return (
        <div className="espaciadocancha">
            <ItemHeader />
            <ItemBajoHeader nombre={texto[0].nombre} />
            <div className="derecha">
                <CalendarioRectangulo />
            </div>

            <div className="app">
                <h3>Seleccione el horario</h3>
                <div className="menuh">
                    {horarios.map((time, index) => (
                        <button
                            key={index}
                            className={horariosSeleccionados.includes(time) ? 'horario selected' : 'horario'}
                            onClick={() => handleHorarioClick(time)}
                        >
                            {time}
                        </button>
                    ))}
                </div>
                <h3>Aceptar términos y condiciones</h3>
                <div className="terminos">
                    <label>
                        <input
                            type="checkbox"
                            checked={aceptarTerminos}
                            onChange={(e) => setAceptarTerminos(e.target.checked)}
                        />
                        <span>
                            Al confirmar, usted se compromete a respetar el horario seleccionado para el uso de la <br /> cancha.
                            Además, se solicita cuidar las instalaciones, mantenerlas en buen estado y seguir las <br /> 
                            normas establecidas para el uso adecuado del espacio.
                        </span>


                    </label>
                </div>
                <div className="form1">
                    <div className="item1">
                        <button className="reserva" onClick={handleReserva}>
                            Reservar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UsReservaCancha;
