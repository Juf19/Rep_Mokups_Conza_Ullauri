const mongoose = require("mongoose");

const ReservaSchema = new mongoose.Schema({
    fecha: {
        type: Date,
        required: [true, "La fecha es requerida"],
        trim: true,
        set: (value) => {
            const date = new Date(value);
            date.setHours(0, 0, 0, 0);
            return date;
        },
    },
    parqueId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Parque",
        required: [true, "El ID del parque asociado es requerido"],
        trim: true,
    },
    canchaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cancha",
        required: [true, "El ID de la cancha asociado es requerido"],
        trim: true,
    },
    horarios: {
        type: [String],
        required: [true, "Los horarios de la reserva son requeridos"],
    },
    usuarioId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario", // Relación con el modelo Usuario
        required: [true, "El ID del usuario asociado es requerido"], // Opcional si no todas las reservas necesitan un usuario
        trim: true,
    },
}, {
    timestamps: true,
});

// Utilizar `populate` para obtener el nombre del parque, cancha y usuario
ReservaSchema.pre("find", function () {
    this.populate("parqueId").populate("canchaId").populate("usuarioId");
});

const Reserva = mongoose.model("Reserva", ReservaSchema);

module.exports = Reserva;
