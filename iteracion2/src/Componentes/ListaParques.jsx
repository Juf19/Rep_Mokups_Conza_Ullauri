import React from 'react';
import { useNavigate } from 'react-router-dom';
import UsParques from './UsParques';
import ItemBajoHeader from './ItemBajoHeader';
import ItemHeader from './ItemHeader';
import { Container, Row, Col, Button } from 'react-bootstrap';

const ListaParques = () => {
    const navigate = useNavigate();

    const parques = [
        { name: "La Carolina", img: "carolina.jpg" },
        { name: "Alameda", img: "alameda.jpg" },
        { name: "Bicentenario", img: "bicentenario.jpg" },
        { name: "Ejido", img: "ejido.jpg" },
        { name: "Ingles", img: "ingles.jpg" },
        { name: "Metropolitano", img: "metropolitano.jpg" },
        { name: "Metropolitano", img: "metropolitano.jpg" },
        { name: "Metropolitano", img: "metropolitano.jpg" }
    ];

    return (
        <div>
            <ItemHeader />
            <ItemBajoHeader />
            <h2 className="text-start mb-4">Selecciona el parque en donde deseas</h2>
            <Container className="mt-5">
                <Row className="justify-content-center">
                    {parques.map((parque, index) => (
                        <Col xs={12} sm={6} md={4} key={index} className="mb-4 d-flex justify-content-center">
                            <Button 
                                className="parques-button w-100"
                                onClick={() => navigate("/detalles")}
                            >
                                <UsParques name={parque.name} img={parque.img} />
                            </Button>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
};

export default ListaParques;
