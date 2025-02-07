import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image,
    Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'; // Importa Axios
import { useRouter } from "expo-router";

const Autenticacion = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter(); // Inicializa el router

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:8000/login', {
                email,
                password,
            });

            const data = response.data;

            // Guardar token en AsyncStorage
            await AsyncStorage.setItem('token', data.token);

            if (data.rol === 'Administrador') {
                // Redirigir a la página de administrador
                router.replace('/HomeAdmin');
            } else {
                // Redirigir a la página de usuario
                router.replace({
                    pathname: '/HomeUser',
                    params: { usuarioId: data._id },
                });
                console.log("Id de usuario recibido:", data._id);
            }
        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.message);
            } else if (error.request) {
                setErrorMessage('Error de conexión');
            } else {
                setErrorMessage('Error desconocido');
            }
        }
    };

    return (
        <View style={styles.container}>
            <Image
                source={require('./assets/quito.jpg')}
                style={styles.logo}
            />
            <Text style={styles.title}>
                Distrito Metropolitano de "QUITO"
            </Text>
            <Text style={styles.subtitle}>
                ¡Bienvenidos!
            </Text>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    placeholder="Usuario"
                    placeholderTextColor="#003f5c"
                    onChangeText={text => setEmail(text)}
                    value={email}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    secureTextEntry
                    style={styles.inputText}
                    placeholder="Contraseña"
                    placeholderTextColor="#003f5c"
                    onChangeText={text => setPassword(text)}
                    value={password}
                />
            </View>
            {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
            <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
                <Text style={styles.loginText}>INGRESAR</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/registrarse')}>
                <Text style={styles.registerText}>Registrarse</Text>
            </TouchableOpacity>
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
    logo: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },
    title: {
        fontWeight: "bold",
        fontSize: 25,
        color: "#000",
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 16,
        color: "#000",
        marginBottom: 20,
    },
    inputView: {
        width: "80%",
        backgroundColor: "#ddd",
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20,
    },
    inputText: {
        height: 45,
        color: "black",
    },
    loginBtn: {
        width: "80%",
        backgroundColor: "#3385ff",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        marginBottom: 10,
    },
    loginText: {
        color: "white",
        fontSize: 16,
    },
    registerText: {
        color: "#3385ff",
        fontSize: 16,
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
});

export default LoginScreen;
