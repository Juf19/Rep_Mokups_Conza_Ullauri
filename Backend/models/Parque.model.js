const mongoose = require("mongoose");

const ParqueSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, "El nombre del parque es requerido"],
        trim: true, // Elimina espacios innecesarios al inicio y final
    },
    descripcion: {
        type: String,
        required: [true, "La descripción del parque es requerida"],
        trim: true,
    },
    url: {
        type: String,
        required: [true, "La URL de la imagen es requerida"],
        trim: true, 
    },
}, {
    timestamps: true, 
});

const Parque = mongoose.model('Parque', ParqueSchema);

module.exports = Parque;
