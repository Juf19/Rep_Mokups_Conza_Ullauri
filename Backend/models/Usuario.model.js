const mongoose = require("mongoose");


const UsuarioSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "El email es requerido"],
        unique: true, // Asegura que no se repitan los correos electrónicos
        trim: true, // Elimina espacios innecesarios al inicio y final
        lowercase: true, // Almacena los correos en minúsculas
        match: [/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, 'Por favor ingrese un correo electrónico válido'], // Valida el formato de email
    },
    password: {
        type: String,
        required: [true, "La contraseña es requerida"],
        minlength: [8, "La contraseña debe tener al menos 8 caracteres"], // Restricción mínima de longitud para la contraseña
       
    },
    cedula: {
        type: String,
        required: [true, "La cédula es requerida"],
        unique: true, // Asegura que no haya cédulas duplicadas
        match: [/^\d{10}$/, 'La cédula debe ser un número de 10 dígitos'], // Asegura que la cédula tenga 10 dígitos
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
        default: 'Usuario'
    },
}, {
    timestamps: true, // Añade createdAt y updatedAt automáticamente
});

const Usuario = mongoose.model('Usuario', UsuarioSchema);

module.exports = Usuario;
