import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    TextInput,
    TouchableOpacity,
    Image,
    ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'; // Importa Axios
import { useRouter } from "expo-router";

const App = () => {
    const [parques, setParques] = useState([]);
    const [token, setToken] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const checkToken = async () => {
            const storedToken = await AsyncStorage.getItem('token');
            if (storedToken) {
                setToken(storedToken);
                fetchParques(storedToken);
            } else {
                // Si no hay token, redirige al login
                router.replace('/(auth)/login');
            }
        };

        checkToken();
    }, []);

    const fetchParques = async (token) => {
        try {
            const response = await axios.get('http://192.168.100.9:8000/parques', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setParques(response.data);
        } catch (error) {
            console.error('Error al obtener la lista de parques:', error);
            // Si el token es inválido o ha expirado, redirige al login
            if (error.response && error.response.status === 401) {
                await AsyncStorage.removeItem('token');
                router.replace('/(auth)/login');
            }
        }
    };

    const handleLogout = async () => {
        await AsyncStorage.removeItem('token');
        setToken(null);
        router.replace('/(auth)/login');
    };

    return (
        <View style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
            <View style={styles.header}>
                <Text style={styles.headerText}>
                    Bienvenidos al sistema de reserva de canchas
                </Text>
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.logoutText}>Cerrar Sesión</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.parquesContainer}>
                {parques.length > 0 ? (
                    parques.map((parque, index) => (
                        <View key={index} style={styles.parqueItem}>
                            <Text style={styles.parqueNombre}>
                                Nombre: {parque.nombre}
                            </Text>
                            {/* Puedes mostrar más detalles del parque aquí */}
                        </View>
                    ))
                ) : (
                    <Text style={styles.noParquesText}>No se encontraron parques.</Text>
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        backgroundColor: '#3385ff',
        padding: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    headerText: {
        color: 'white',
        fontSize: 18,
    },
    logoutButton: {
        backgroundColor: 'red',
        padding: 8,
        borderRadius: 5,
    },
    logoutText: {
        color: 'white',
    },
    parquesContainer: {
        padding: 10,
    },
    parqueItem: {
        backgroundColor: '#f0f0f0',
        padding: 15,
        marginBottom: 10,
        borderRadius: 5,
    },
    parqueNombre: {
        fontSize: 16,
    },
    noParquesText: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
    },
});

export default App;
