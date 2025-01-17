import React from 'react';
import ItemHeader from './ItemHeader';
import ItemBajoHeader from './ItemBajoHeader';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Container, Typography } from '@mui/material'; // Importar componentes de Material UI
import 'bootstrap/dist/css/bootstrap.min.css'; // Importar Bootstrap

const UsConfirmacion = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Guardar los datos recibidos
    const { parque, cancha, horariosSeleccionados, fecha } = location.state || {};
    console.log(parque, cancha, horariosSeleccionados, fecha);

    return (
        <div>
            <ItemHeader />
            <ItemBajoHeader />
            <Container className="app py-5">
                <div className="contenedorp">
                    <Typography variant="h10" gutterBottom>
                        Reserva confirmada. Revisa tu correo para verificar la validez de tu reserva.
                        Recuerda que puedes cancelarla hasta un día antes de la fecha programada.
                    </Typography>
                </div>
                <div className="item1">
                    {/* Usando Material UI Button */}
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() =>
                            navigate('/HomeUser', {
                                state: { parque, cancha, horariosSeleccionados, fecha }, // Asegúrate de navegar a /UsReservas
                            })
                        }
                    >
                        Volver al inicio
                    </Button>
                </div>
            </Container>
        </div>
    );
};

export default UsConfirmacion;
