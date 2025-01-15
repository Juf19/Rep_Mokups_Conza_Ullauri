import React from 'react';
import ItemHeader from './ItemHeader';
import ItemBajoHeader from './ItemBajoHeader';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Typography } from '@mui/material'; // Importar componentes de Material UI
import 'bootstrap/dist/css/bootstrap.min.css'; // Importar Bootstrap

const UsConfirmacion = () => {
    const navigate = useNavigate();
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
                        onClick={() => navigate('/HomeUser')}
                    >
                        Volver al inicio
                    </Button>
                </div>
            </Container>
        </div>
    );
};

export default UsConfirmacion;
