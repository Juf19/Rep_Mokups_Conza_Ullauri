const mongoose = require("mongoose");

const UsuarioSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "El email es requerido"],
        unique: true, // Asegura que no se repitan los correos electrónicos
        trim: true, // Elimina espacios innecesarios al inicio y final
        lowercase: true, // Almacena los correos en minúsculas
    },
    password: {
        type: String,
        required: [true, "La contraseña es requerida"],
    },
    cedula: {
        type: String,
        required: [true, "La cédula es requerida"],
        unique: true, // Asegura que no haya cédulas duplicadas
    },
    fechaNacimiento: {
        type: Date,
        required: [true, "La fecha de nacimiento es requerida"],
    },
    nombre: {
        type: String,
        required: [true, "El nombre de usuario es requerido"],
        trim: true,
    },
    rol: {
        type: String,
        enum: ['Administrador', 'Usuario'], // Define los roles permitidos
       
    },
}, {
    timestamps: true, // Añade createdAt y updatedAt automáticamente
});

const Usuario = mongoose.model('Usuario', UsuarioSchema);

module.exports = Usuario;
