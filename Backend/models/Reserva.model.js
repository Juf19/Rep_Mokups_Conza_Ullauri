const mongoose = require("mongoose");

const ReservaSchema = new mongoose.Schema({
    fecha: {
        type: Date,
        required: [true, "La fecha es requerida"],
        trim: true, // Elimina espacios innecesarios al inicio y final
        set: (value) => {
            // Solo guardar la fecha sin la hora
            const date = new Date(value);
            date.setHours(0, 0, 0, 0); // Eliminar la parte de la hora
            return date;
        },
    },
    parqueId: {
        type: mongoose.Schema.Types.ObjectId, // Referencia al modelo Parque
        ref: "Parque", // Relaciona con el modelo Parque
        required: [true, "El ID del parque asociado es requerido"],
        trim: true,
    },
    canchaId: {
        type: mongoose.Schema.Types.ObjectId, // Referencia al modelo Cancha
        ref: "Cancha", // Relaciona con el modelo Cancha
        required: [true, "El ID de la cancha asociado es requerido"],
        trim: true,
    },
    horarios: {
        type: [String], // Array de cadenas para los horarios
        required: [true, "Los horarios de la reserva son requeridos"],
    },
}, {
    timestamps: true, // Agrega campos createdAt y updatedAt automáticamente
});

// Utilizar `populate` para obtener el nombre del parque y de la cancha
ReservaSchema.pre("find", function () {
    this.populate("parqueId").populate("canchaId");
});

const Reserva = mongoose.model("Reserva", ReservaSchema);

module.exports = Reserva;
