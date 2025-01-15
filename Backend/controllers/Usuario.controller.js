const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/Usuario.model");

const generateToken = (id) => {
    return jwt.sign({ id }, "holasoyj", { expiresIn: '30d' });
}

module.exports.createUser = async (request, response) => {
    const { email, password, cedula, fechaNacimiento, nombre, rol } = request.body;

    // Validar campos obligatorios
    if (!email || !password || !cedula || !fechaNacimiento || !nombre) {
        return response.status(400).json({ message: 'Todos los campos son obligatorios: email, contrasena, cedula, fecha de nacimiento, nombre' });
    }

    try {
        const userFound = await Usuario.findOne({ email });
        if (userFound) {
            return response.status(400).json({ message: 'El usuario con este email ya existe' });
        }

        const cedulaFound = await Usuario.findOne({ cedula });
        if (cedulaFound) {
            return response.status(400).json({ message: 'El usuario con esta cédula ya existe' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Asignar rol o usar "Usuario" como valor predeterminado
        const nuevoUsuario = await Usuario.create({
            email,
            password: hashedPassword,
            cedula,
            fechaNacimiento,
            nombre,
            rol: rol || "Usuario", // Asigna "Usuario" si no se proporciona un rol
        });

        return response.json({
            email: nuevoUsuario.email,
            _id: nuevoUsuario._id,
            token: generateToken(nuevoUsuario._id),
            nombre,
            rol: nuevoUsuario.rol
        });

    } catch (err) {
        console.error(err);
        return response.status(500).json({ message: 'Error al crear el usuario', error: err.message });
    }
}




module.exports.loginUser = async (req, res) => {
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
}


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


