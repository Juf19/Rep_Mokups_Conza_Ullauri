const ParqueController = require('../controllers/Parque.controller');
const { protect } = require('../middleware/protect');    

module.exports = function(app){
    app.get('/parques',ParqueController.obtenerParques);
    app.get('/parques/:id',ParqueController.obtenerParquePorId);
    app.put('/parques/:id', protect, ParqueController.actualizarParque);
    app.get('/parques/detalle/:id', ParqueController.detalleParque);
    app.post('/parques', protect, ParqueController.addParque);
    app.delete('/parques/:id', protect, ParqueController.deleteParque);
}