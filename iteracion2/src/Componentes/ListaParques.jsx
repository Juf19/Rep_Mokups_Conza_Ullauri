import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Importa useLocation
import axios from 'axios';
import UsParques from './UsParques';
import ItemBajoHeader from './ItemBajoHeader';
import ItemHeader from './ItemHeader';
import { Container, Row, Col, Button } from 'react-bootstrap';

const ListaParques = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    // Recibir usuarioId desde UsReservas
    const { usuarioId } = location.state || {};

    const [parques, setParques] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchParques = async () => {
            try {
                const response = await axios.get('http://localhost:8000/parques');
                setParques(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error al cargar los parques:', error);
                setLoading(false);
            }
        };

        fetchParques();
    }, []);

    return (
        <div>
            <ItemHeader />
            <ItemBajoHeader />
            <h2 className="text-start mb-4">Selecciona el parque en donde deseas reservar</h2>
            <Container className="mt-5">
                {loading ? (
                    <p>Cargando parques...</p>
                ) : (
                    <Row className="justify-content-center">
                        {parques.map((parque) => (
                            <Col
                                xs={12}
                                sm={6}
                                md={4}
                                key={parque._id}
                                className="mb-4 d-flex justify-content-center"
                            >
                                <Button
                                    className="parques-button w-100"
                                    onClick={() =>
                                        navigate('/detalles', {
                                            state: { parque, usuarioId }, // Pasamos usuarioId a Detalles
                                        })
                                    }
                                >
                                    <UsParques name={parque.nombre} img={parque.url} />
                                </Button>
                            </Col>
                        ))}
                    </Row>
                )}
            </Container>
        </div>
    );
};

export default ListaParques;
