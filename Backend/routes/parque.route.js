const ParqueController = require('../controllers/Parque.controller');

module.exports = function(app){
    app.get('/parques',ParqueController.obtenerParques);
    app.get('/parques/:id',ParqueController.obtenerParquePorId);
    app.put('/parques/:id', ParqueController.actualizarParque);
}