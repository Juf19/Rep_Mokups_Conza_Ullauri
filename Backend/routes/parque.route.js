const ParqueController = require('../controllers/Parque.controller');

module.exports = function(app){
    app.get('/parques',ParqueController.obtenerParques);
}