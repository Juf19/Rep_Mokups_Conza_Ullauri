const ParqueController = require('../controllers/Parque.controller');

module.exports = function(app){
    app.get('/parques',ParqueController.obtenerParques);
    app.get('/parques/:id',ParqueController.obtenerParquePorId);
    app.put('/parques/:id', ParqueController.actualizarParque);
    app.get('/parques/detalle/:id', ParqueController.detalleParque);
    app.post('/parques', ParqueController.addParque);
}