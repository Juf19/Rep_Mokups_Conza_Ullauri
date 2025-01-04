const mongoose = require("mongoose");

const UsuarioSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "El email es requerido"],
        unique: true // Asegura que no se repitan los correos electrónicos
    },
    password: {
        type: String,
        required: [true, "La contraseña es requerida"]
    },
    rol: {
        type: String,
        enum: ['Administrador', 'Usuario'], // Define los roles permitidos
       
    }
}, {
    timestamps: true,
});

const Usuario = mongoose.model('Usuario', UsuarioSchema);

module.exports = Usuario;
