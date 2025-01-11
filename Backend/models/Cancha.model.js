const mongoose = require("mongoose");

const CanchaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, "El nombre de la cancha es requerido"],
        trim: true, // Elimina espacios innecesarios al inicio y final
    },
    descripcion: {
        type: String,
        required: [true, "La descripción de la cancha es requerida"],
        trim: true,
    },
    tipo: {
        type: String,
        required: [true, "El tipo de cancha es requerido"],
        trim: true,
    },
    horarios: {
        type: [String], // Array de cadenas para los horarios
        required: [true, "Los horarios de la cancha son requeridos"],
    },
    dias: {
        type: [String], // Array de cadenas para los días
        required: [true, "Los días de la cancha son requeridos"],
    },
    idParque: {
        type: mongoose.Schema.Types.ObjectId, // Referencia al modelo Parque
        required: [true, "El ID del parque asociado es requerido"],
        ref: "Parque", // Nombre del modelo de referencia
    },
}, {
    timestamps: true, // Agrega campos createdAt y updatedAt automáticamente
});

const Cancha = mongoose.model('Cancha', CanchaSchema);

module.exports = Cancha;