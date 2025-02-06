const CanchaController = require('../controllers/Cancha.controller');
const { protect, role } = require('../middleware/protect');

module.exports = function(app) {
    app.get('/canchas',protect, CanchaController.obtenerCanchas);
    app.get('/canchas/:id', protect,CanchaController.obtenerCanchaPorId);
    app.post('/canchas', protect,  CanchaController.agregarCancha);
    app.put('/canchas/:id', protect,CanchaController.actualizarCancha);
    app.delete('/canchas/:id', protect,CanchaController.eliminarCancha);
};
