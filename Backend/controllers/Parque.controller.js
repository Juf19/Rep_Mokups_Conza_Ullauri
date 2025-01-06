const mongoose = require('mongoose');
const Parque = require('../models/Parque.model'); // Importa el modelo Parque

// Función para obtener todos los parques
module.exports.obtenerParques = async (req, res) => {
  try {
    // Obtener todos los parques desde la base de datos
    const parques = await Parque.find();

    // Verificar si no se encuentran parques
    if (parques.length === 0) {
      return res.status(404).json({ mensaje: "No se encontraron parques." });
    }

    // Enviar los parques como respuesta
    return res.status(200).json(parques);
  } catch (error) {
    // Manejo de errores
    console.error(error);
    return res.status(500).json({ mensaje: "Error al obtener los parques." });
  }
}
// Función para obtener un parque por ID
module.exports.obtenerParquePorId = async (req, res) => {
  try {
    const { id } = req.params; // Obtener el id desde los parámetros de la URL
    console.log("ID recibido:", id); // Verificar si el ID es válido

    // Verificar si el ID es un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ mensaje: "ID no válido." });
    }

    // Buscar el parque por ID
    const parque = await Parque.findById(id);

    if (!parque) {
      return res.status(404).json({ mensaje: "Parque no encontrado." });
    }

    // Enviar el parque encontrado como respuesta
    return res.status(200).json(parque);
  } catch (error) {
    // Imprimir el error completo en la consola
    console.error("Error al obtener el parque:", error);
    return res.status(500).json({ mensaje: "Error al obtener el parque.", error: error.message });
  }
}

// Función para actualizar un parque por ID
module.exports.actualizarParque = async (req, res) => {
    try {
      const { id } = req.params; // Obtener el id del parque desde los parámetros de la URL
      const { nombre, descripcion, url } = req.body; // Obtener los nuevos datos del parque desde el cuerpo de la solicitud
  
      // Verifica si el parque existe
      const parqueExistente = await Parque.findById(id);
      if (!parqueExistente) {
        return res.status(404).json({ mensaje: "Parque no encontrado." });
      }
  
      // Actualiza el parque con los nuevos datos
      const parqueActualizado = await Parque.findByIdAndUpdate(
        id, // El id del parque a actualizar
        { nombre, descripcion, url }, // Los datos nuevos para actualizar
        { new: true } // Esto asegura que se devuelva el parque actualizado
      );
  
      // Retorna el parque actualizado
      return res.status(200).json(parqueActualizado);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ mensaje: "Error al actualizar el parque." });
    }
}