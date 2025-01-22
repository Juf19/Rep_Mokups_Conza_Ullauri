const UsuarioController = require('../controllers/Usuario.controller');
const { protect, role } = require('../middleware/protect'); // Importa los middlewares

module.exports = function (app) {
    // Rutas públicas
    app.post('/register', UsuarioController.createUser); // Registro de usuarios
    app.post('/login', UsuarioController.loginUser); // Login de usuarios

    // Rutas protegidas
    app.get('/admin', protect, role('Administrador'), (req, res) => {
        res.json({ message: 'Bienvenido administrador' });
    });

    app.get('/user', protect, role('Usuario'), (req, res) => {
        res.json({ message: `Bienvenido usuario ${req.user.nombre}` });
        console.log(req.user.nombre);
    });

    app.get('/api/usuario', protect, (req, res) => {
        const { nombre, email, cedula, fechaNacimiento } = req.user;
        res.json({ nombre, email, cedula, fechaNacimiento });
      });
      
};
