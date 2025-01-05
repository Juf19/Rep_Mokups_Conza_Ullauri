const UsuarioController = require('../controllers/Usuario.controller');

module.exports = function(app){
    app.post('/register',UsuarioController.createUser);
    app.post('/login',UsuarioController.loginUser);
}