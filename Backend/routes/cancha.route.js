const CanchaController = require('../controllers/Cancha.controller');
const { protect, role } = require('../middleware/protect');

module.exports = function(app) {
    app.get('/canchas', CanchaController.obtenerCanchas);
    app.get('/canchas/:id',CanchaController.obtenerCanchaPorId);
    app.post('/canchas',  CanchaController.agregarCancha);
    app.put('/canchas/:id', protect,CanchaController.actualizarCancha);
    app.delete('/canchas/:id', protect,CanchaController.eliminarCancha);
};
