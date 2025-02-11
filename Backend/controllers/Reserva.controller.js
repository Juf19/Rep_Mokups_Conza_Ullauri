const mongoose = require('mongoose');
const Reserva = require('../models/Reserva.model'); // Importa el modelo Reserva

// Función para obtener todas las reservas
module.exports.obtenerReservas = async (req, res) => {
    try {
      const reservas = await Reserva.find()
        .populate("parqueId", "nombre")  // Poblamos solo el campo 'nombre' de parque
        .populate("canchaId", "nombre")  // Poblamos solo el campo 'nombre' de cancha
        .populate("usuarioId", "nombre email"); // Poblamos nombre y email del usuario

      if (reservas.length === 0) {
        return res.status(404).json({ mensaje: "No se encontraron reservas." });
      }

      return res.status(200).json(reservas);
    } catch (error) {
      console.error("Error al obtener las reservas:", error);
      return res.status(500).json({ mensaje: "Error al obtener las reservas." });
    }
};

// Obtener reservas por usuarioId
module.exports.obtenerReservasPorUsuario = async (req, res) => {
  try {
      const { usuarioId } = req.params;

      // Verifica si el ID es válido
      if (!mongoose.Types.ObjectId.isValid(usuarioId)) {
          return res.status(400).json({ mensaje: "ID de usuario no válido." });
      }

      // Buscar reservas asociadas al usuarioId
      const reservas = await Reserva.find({ usuarioId })
          .populate("parqueId", "nombre")
          .populate("canchaId", "nombre");

      if (reservas.length === 0) {
          return res.status(404).json({ mensaje: "No se encontraron reservas para este usuario." });
      }

      return res.status(200).json(reservas);
  } catch (error) {
      console.error("Error al obtener reservas por usuario:", error);
      return res.status(500).json({ mensaje: "Error al obtener las reservas." });
  }
};


// Función para obtener una reserva por ID
module.exports.obtenerReservaPorId = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ mensaje: "ID no válido." });
    }

    const reserva = await Reserva.findById(id)
      .populate("parqueId", "nombre")
      .populate("canchaId", "nombre")
      .populate("usuarioId", "nombre email");

    if (!reserva) {
      return res.status(404).json({ mensaje: "Reserva no encontrada." });
    }

    return res.status(200).json(reserva);
  } catch (error) {
    console.error("Error al obtener la reserva:", error);
    return res.status(500).json({ mensaje: "Error al obtener la reserva." });
  }
};

// Función para agregar una nueva reserva
module.exports.agregarReserva = async (req, res) => {
  try {
    const { fecha, parqueId, canchaId, horarios, usuarioId } = req.body;

    if (!fecha || !parqueId || !canchaId || !horarios || horarios.length === 0 || !usuarioId) {
      return res.status(400).json({ mensaje: "Faltan datos para crear la reserva." });
    }

    const nuevaReserva = new Reserva({
      fecha,
      parqueId,
      canchaId,
      horarios,
      usuarioId,
    });

    const reservaGuardada = await nuevaReserva.save();
    return res.status(201).json(reservaGuardada);
  } catch (error) {
    console.error("Error al agregar la reserva:", error.message);
    return res.status(500).json({ mensaje: "Error al agregar la reserva.", error: error.message });
  }
};

// Función para actualizar una reserva por ID
module.exports.actualizarReserva = async (req, res) => {
  try {
    const { id } = req.params;
    const { fecha, parqueId, canchaId, horarios, usuarioId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ mensaje: "ID no válido." });
    }

    const reservaExistente = await Reserva.findById(id);

    if (!reservaExistente) {
      return res.status(404).json({ mensaje: "Reserva no encontrada." });
    }

    const reservaActualizada = await Reserva.findByIdAndUpdate(
      id,
      { fecha, parqueId, canchaId, horarios, usuarioId },
      { new: true }
    ).populate("parqueId", "nombre")
     .populate("canchaId", "nombre")
     .populate("usuarioId", "nombre email");

    return res.status(200).json(reservaActualizada);
  } catch (error) {
    console.error("Error al actualizar la reserva:", error);
    return res.status(500).json({ mensaje: "Error al actualizar la reserva." });
  }
};

// Función para eliminar una reserva por ID
module.exports.eliminarReserva = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ mensaje: "ID no válido." });
    }

    const reservaEliminada = await Reserva.findByIdAndDelete(id);

    if (!reservaEliminada) {
      return res.status(404).json({ mensaje: "Reserva no encontrada." });
    }

    return res.status(200).json({ mensaje: "Reserva eliminada con éxito.", reservaEliminada });
  } catch (error) {
    console.error("Error al eliminar la reserva:", error);
    return res.status(500).json({ mensaje: "Error al eliminar la reserva." });
  }
};
