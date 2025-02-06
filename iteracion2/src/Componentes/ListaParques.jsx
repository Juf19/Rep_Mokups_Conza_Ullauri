import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UsParques from './UsParques';
import ItemBajoHeader from './ItemBajoHeader';
import ItemHeader from './ItemHeader';
import { Container, Row, Col, Button } from 'react-bootstrap';

const ListaParques = () => {
    const navigate = useNavigate();
    const [parques, setParques] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState(''); // Estado de búsqueda
    const token = localStorage.getItem('token'); // Obtener el token desde el localStorage

    // Función para obtener los encabezados con el token
    const obtenerHeadersConToken = () => {
        if (!token) {
            throw new Error("No se encontró el token de autorización.");
        }
        return {
            Authorization: `Bearer ${token}`  // Retornar el encabezado con el token
        };
    };
    
    useEffect(() => {
        const fetchParques = async () => {
            try {
                const response = await axios.get('http://localhost:8000/parques', {
                    headers: obtenerHeadersConToken() // Agregar el token en los headers
                });
                setParques(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error al cargar los parques:', error);
                setLoading(false);
            }
        };
    
        fetchParques();
    }, []);
    
    // Filtrar parques según el término de búsqueda
    const parquesFiltrados = parques.filter(parque =>
        parque.nombre.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            {/* Pasamos setSearchQuery para actualizar la búsqueda desde ItemHeader */}
            <ItemHeader setSearchQuery={setSearchQuery} />
            <ItemBajoHeader />
            <h2 className="text-start mb-4">
                {searchQuery ? `Resultados para: "${searchQuery}"` : 'Selecciona el parque en donde deseas reservar'}
            </h2>
            <Container className="mt-5">
                {loading ? (
                    <p>Cargando parques...</p>
                ) : (
                    <Row className="justify-content-center">
                        {parquesFiltrados.length > 0 ? (
                            parquesFiltrados.map((parque) => (
                                <Col xs={12} sm={6} md={4} key={parque._id} className="mb-4 d-flex justify-content-center">
                                    <Button
                                        className="parques-button w-100"
                                        onClick={() =>
                                            navigate('/detalles', {
                                                state: { parque },
                                            })
                                        }
                                    >
                                        <UsParques name={parque.nombre} img={parque.url} />
                                    </Button>
                                </Col>
                            ))
                        ) : (
                            <p>No se encontraron parques con ese nombre.</p>
                        )}
                    </Row>
                )}
            </Container>
        </div>
    );
};

export default ListaParques;
