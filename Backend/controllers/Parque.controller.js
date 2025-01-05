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