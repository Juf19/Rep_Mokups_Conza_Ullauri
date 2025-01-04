const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/Usuario.model");

const generateToken = (id) => {
    return jwt.sign({ id }, "holasoyj", { expiresIn: '30d' })
}

module.exports.createUser = async (request, response) => {
    const { email, password } = request.body;
    if (!email || !password) {
        response.status(400).json({ message: 'Missing fields, all are mandatory!' });
    } else {
        const userFound = await Usuario.findOne({ email }); //await significa antes de ejecutra o que sigue voy a esperar la respuesta de moongodb   la peticion findone
        if (userFound) {
            response.status(400).json({ message: 'User already exist' });
        } else {
            const salt = await bcrypt.genSalt(10); //semilla que srive para concatenarlo para la generacion del hash
            const hashedPassword = await bcrypt.hash(password, salt);
            Usuario.create({
                email, password: hashedPassword
            })
                .then(Usuario => response.json({ email: Usuario.email, _id: Usuario._id, token: generateToken(Usuario._id) }))
                .catch(err => response.status(400).json(err));
        }
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
    if (userFound && password === userFound.password) { // Comparar directamente
        const { rol } = userFound; // Obtén el rol del usuario
        return res.json({ 
            message: 'Login exitoso', 
            email: userFound.email, 
            rol: rol, 
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


