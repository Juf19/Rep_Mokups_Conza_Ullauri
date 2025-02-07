import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, ScrollView } from "react-native";
import axios from "axios";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from "@react-navigation/native";
import EditarParque from "./Componentes/EditarParque";

const Stack = createNativeStackNavigator ();

const HomeScreen = ({ navigation }) => {
    const [parques, setParques] = useState([]);

    useEffect(() => {
        fetchParques();
    }, []);

    const fetchParques = async () => {
        try {
            const response = await axios.get("http://172.29.29.226:8000/parques");
            setParques(response.data);
        } catch (error) {
            console.error("Error al obtener la lista de parques:", error);
        }
    };

    return (
        <View style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Bienvenidos al sistema de reserva de canchas</Text>
            </View>

            <ScrollView contentContainerStyle={styles.parquesContainer}>
                {parques.length > 0 ? (
                    parques.map((parque, index) => (
                        <View key={index} style={styles.parqueItem}>
                            <Text style={styles.parqueNombre}>Nombre: {parque.nombre}</Text>
                            <TouchableOpacity
                                style={styles.editButton}
                                onPress={() => navigation.navigate("EditarParque", { id: parque._id })}
                            >
                                <Text style={styles.editText}>Editar</Text>
                            </TouchableOpacity>
                        </View>
                    ))
                ) : (
                    <Text style={styles.noParquesText}>No se encontraron parques.</Text>
                )}
            </ScrollView>
        </View>
    );
};

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Lista de Parques" }} />
                <Stack.Screen name="EditarParque" component={EditarParque} options={{ title: "Editar Parque" }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#3385ff",
        padding: 15,
        alignItems: "center",
    },
    headerText: {
        color: "white",
        fontSize: 18,
    },
    parquesContainer: {
        padding: 10,
    },
    parqueItem: {
        backgroundColor: "#f0f0f0",
        padding: 15,
        marginBottom: 10,
        borderRadius: 5,
    },
    parqueNombre: {
        fontSize: 16,
    },
    noParquesText: {
        fontSize: 16,
        textAlign: "center",
        marginTop: 20,
    },
    editButton: {
        backgroundColor: "#3385ff",
        padding: 10,
        marginTop: 5,
        borderRadius: 5,
        alignItems: "center",
    },
    editText: {
        color: "white",
        fontWeight: "bold",
    },
});
