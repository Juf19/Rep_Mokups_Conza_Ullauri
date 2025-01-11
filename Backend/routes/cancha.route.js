const CanchaController = require('../controllers/Cancha.controller');

module.exports = function(app) {
    app.get('/canchas', CanchaController.obtenerCanchas);
    app.get('/canchas/:id', CanchaController.obtenerCanchaPorId);
    app.post('/canchas', CanchaController.agregarCancha);
    app.put('/canchas/:id', CanchaController.actualizarCancha);
    app.delete('/canchas/:id', CanchaController.eliminarCancha);
};
