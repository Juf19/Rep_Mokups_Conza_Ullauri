require("dotenv").config();
const jwt = require('jsonwebtoken');
const User = require('../models/Usuario.model');

module.exports.protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET || "holasoyj");
            req.user = await User.findOne({ _id: decoded.id }).select('-password');
            if (!req.user) {
                return res.status(401).json({ message: 'Usuario no encontrado' });
            }
            next(); // Permite avanzar al siguiente middleware o controlador
        } catch (error) {
            return res.status(401).json({ message: 'Token inválido o no autorizado' });
        }
    } else {
        return res.status(401).json({ message: 'Falta el token de autorización' });
    }
};

module.exports.role = (requiredRole) => (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Usuario no autenticado' });
    }
    if (req.user.rol !== requiredRole) {
        return res.status(403).json({ message: 'No tienes permiso para acceder a este recurso' });
    }
    next(); // Permite continuar si el rol coincide
};
