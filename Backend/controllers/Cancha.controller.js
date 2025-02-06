const mongoose = require('mongoose');
const Cancha = require('../models/Cancha.model'); // Importa el modelo Cancha

// Función para obtener todas las canchas
module.exports.obtenerCanchas = async (req, res) => {
  try {
    const canchas = await Cancha.find();

    if (canchas.length === 0) {
      return res.status(404).json({ mensaje: "No se encontraron canchas." });
    }

    return res.status(200).json(canchas);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: "Error al obtener las canchas." });
  }
};

// Función para obtener una cancha por ID
module.exports.obtenerCanchaPorId = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ mensaje: "ID no válido." });
    }

    const cancha = await Cancha.findById(id);

    if (!cancha) {
      return res.status(404).json({ mensaje: "Cancha no encontrada." });
    }

    return res.status(200).json(cancha);
  } catch (error) {
    console.error("Error al obtener la cancha:", error);
    return res.status(500).json({ mensaje: "Error al obtener la cancha." });
  }
};

// Función para agregar una nueva cancha
module.exports.agregarCancha = async (req, res) => {
    try {
      const { nombre, descripcion, tipo, horarios, dias, latitud, longitud, idParque } = req.body;
  
      console.log("Datos recibidos en el backend:", req.body); // Log para inspección
  
      if (!nombre || !descripcion || !tipo || !horarios || !dias || !latitud || !longitud || !idParque ) {
        return res.status(400).json({ mensaje: "Faltan datos para crear la cancha." });
      }
  
      const nuevaCancha = new Cancha({
        nombre,
        descripcion,
        tipo,
        horarios,
        dias,
        latitud,
        longitud,
        idParque,
      });
  
      const canchaGuardada = await nuevaCancha.save();
      return res.status(201).json(canchaGuardada);
    } catch (error) {
      console.error("Error al agregar la cancha:", error.message); // Mostrar el mensaje de error exacto
      return res.status(500).json({ mensaje: "Error al agregar la cancha.", error: error.message });
    }
  };
  

// Función para actualizar una cancha por ID
module.exports.actualizarCancha = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, tipo, horarios, dias, latitud, longitud, idParque } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ mensaje: "ID no válido." });
    }

    const canchaExistente = await Cancha.findById(id);

    if (!canchaExistente) {
      return res.status(404).json({ mensaje: "Cancha no encontrada." });
    }

    const canchaActualizada = await Cancha.findByIdAndUpdate(
      id,
      { nombre, descripcion, tipo, horarios, dias, idParque, latitud, longitud, },
      { new: true }
    );

    return res.status(200).json(canchaActualizada);
  } catch (error) {
    console.error("Error al actualizar la cancha:", error);
    return res.status(500).json({ mensaje: "Error al actualizar la cancha." });
  }
};

// Función para eliminar una cancha por ID
module.exports.eliminarCancha = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ mensaje: "ID no válido." });
    }

    const canchaEliminada = await Cancha.findByIdAndDelete(id);

    if (!canchaEliminada) {
      return res.status(404).json({ mensaje: "Cancha no encontrada." });
    }

    return res.status(200).json({ mensaje: "Cancha eliminada con éxito.", canchaEliminada });
  } catch (error) {
    console.error("Error al eliminar la cancha:", error);
    return res.status(500).json({ mensaje: "Error al eliminar la cancha." });
  }
};
