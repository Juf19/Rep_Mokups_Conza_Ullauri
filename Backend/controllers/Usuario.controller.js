const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/Usuario.model");

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || "holasoyj", { expiresIn: '30d' });
};

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


