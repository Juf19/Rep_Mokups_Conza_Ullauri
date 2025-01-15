require("dotenv").config();
const jwt = require('jsonwebtoken');
const User = require('../models/Usuario.model');
module.exports.protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            //se obtiene el token al portador(p.ej., Bearer DJDHFHFHHFHFHF#%>%)
            token = req.headers.authorization;
            console.log('Token recibido-con Bearer: ', token);
            token = token.split(' ')[1];
            console.log('Token extraído: ', token);
            //se verifica el token
            const decoded = jwt.verify(token, "holasoyj");             //proccess.env.jwt_secret se usa la clave secreta que se uso para hacer hacer el token
            //agregamos a cada petición información del usuario - excepto el password (recuperado con base en el _id //contenido en el payload del token)
            req.user = await User.findOne({ _id: decoded.id }).select('-password');
            if(req.user.rol !== 'Administrador') return res.status(401).json({ message: 'Not authorized!' });
            else {
                next();}
            
        } catch (error) {
            res.status(401).json({ message: 'Not authorized!' });
        }
    }
    //si no se tienen un token de portador, entonces no estará autorizado
    if (!token) {
        res.status(401).json({ message: 'Not authorized, missed token!' });
    }
}