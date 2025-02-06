const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/Usuario.model");
const mongoose = require('mongoose');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || "holasoyj", { expiresIn: '30d' });
};

module.exports.obtenerUsuarios = async (req, res) => {
    try {
      const usuario = await Usuario.find();
  
      if (usuario.length === 0) {
        return res.status(404).json({ mensaje: "No se encontraron usuarios." });
      }
  
      return res.status(200).json(usuario);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ mensaje: "Error al obtener las usuarios." });
    }
  };

  module.exports.getUsuarios = (request, response) => {
    Usuario.findOne({ _id: request.params.id })
        .then(user => response.json(user))
        .catch(err => response.json(err))
}

module.exports.updateUsuarios = (request, response) => {
    Usuario.findOneAndUpdate({ _id: request.params.id }, request.body, { new: true })
        .then(updatedUser => response.json(updatedUser))
        .catch(err => response.json(err))
}
module.exports.deleteUsuarios = (request, response) => {
    Usuario.deleteOne({ _id: request.params.id })
        .then(userDeleted => response.json(userDeleted))
        .catch(err => response.json(err))
}
  




module.exports.createUser = async (req, res) => {
    const { email, password, cedula, fechaNacimiento, nombre, rol } = req.body;

    if (!email || !password || !cedula || !fechaNacimiento || !nombre) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        const userFound = await Usuario.findOne({ email });
        if (userFound) {
            return res.status(400).json({ message: 'El usuario con este email ya existe' });
        }

        const cedulaFound = await Usuario.findOne({ cedula });
        if (cedulaFound) {
            return res.status(400).json({ message: 'El usuario con esta cédula ya existe' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const nuevoUsuario = await Usuario.create({
            email,
            password: hashedPassword,
            cedula,
            fechaNacimiento,
            nombre,
            rol: rol || "Usuario",
        });

        return res.status(201).json({
            email: nuevoUsuario.email,
            _id: nuevoUsuario._id,
            token: generateToken(nuevoUsuario._id),
            nombre,
            rol: nuevoUsuario.rol,
        });
    } catch (err) {
        return res.status(500).json({ message: 'Error al crear el usuario', error: err.message });
    }
};


module.exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email y contraseña son requeridos' });
    }

    try {
        const userFound = await Usuario.findOne({ email });

        if (userFound && (await bcrypt.compare(password, userFound.password))) {
            return res.status(200).json({
                message: 'Login exitoso',
                email: userFound.email,
                rol: userFound.rol,
                _id: userFound._id, // Asegúrate de incluir esto
                token: generateToken(userFound._id),
            });
            
        } else {
            return res.status(400).json({ message: 'Credenciales incorrectas' });
        }
    } catch (err) {
        return res.status(500).json({ message: 'Error en el login', error: err.message });
    }
};



/*module.exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Validar que se reciban los campos requeridos
    if (!email || !password) {
        return res.status(400).json({ message: 'Email y contraseña son requeridos' });
    }

    const userFound = await Usuario.findOne({ email });

    // Verificar si el usuario existe y si la contraseña es correcta
    if (userFound && (await bcrypt.compare(password, userFound.password))) {
        const { rol } = userFound; // Obtén el rol del usuario
        return res.json({
            message: 'Login exitoso',
            email: userFound.email,
            rol: rol, // Incluye el rol en la respuesta
            token: generateToken(userFound._id)
        });
    } else {
        return res.status(400).json({ message: 'Credenciales incorrectas' });
    }
}*/


