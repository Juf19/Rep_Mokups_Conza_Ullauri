import { View, Text, TextInput, Button, Alert } from "react-native";
import axios from "axios";
import { useEffect, useState } from "react";

const EditarParque = ({ navigation, route }) => {
  const [parque, setParque] = useState({ nombre: "", descripcion: "" });
  const { id } = route.params;
  const token = "tu_token_aqui"; // Reemplázalo por la obtención real del token

  useEffect(() => {
    axios
      .get(`http://172.29.29.226:8000/parques/${id}`)
      .then((response) => {
        setParque(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener el parque:", error);
      });
  }, [id]);

  const handleChange = (name, value) => {
    setParque((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    axios
      .put(`http://172.29.29.226:8000/parques/${id}`, parque)
      .then(() => {
        Alert.alert("Éxito", "Parque actualizado correctamente");
        navigation.goBack();
      })
      .catch((error) => {
        console.error("Error al actualizar el parque:", error);
      });
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Editar Parque</Text>
      <Text>Nombre:</Text>
      <TextInput
        value={parque.nombre}
        onChangeText={(value) => handleChange("nombre", value)}
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      <Text>Descripción:</Text>
      <TextInput
        value={parque.descripcion}
        onChangeText={(value) => handleChange("descripcion", value)}
        style={{ borderBottomWidth: 1, marginBottom: 20 }}
      />
      <Button title="Guardar" onPress={handleSubmit} />
    </View>
  );
};

export default EditarParque;
