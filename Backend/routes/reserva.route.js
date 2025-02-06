const ReservaController = require('../controllers/Reserva.controller');
const { protect, role } = require('../middleware/protect');

module.exports = function(app) {
    // Ruta para obtener todas las reservas
    app.get('/reservas',protect, ReservaController.obtenerReservas);

    // Ruta para obtener una reserva por ID
    app.get('/reservas/:id',protect, ReservaController.obtenerReservaPorId);

    // Ruta para agregar una nueva reserva
    app.post('/reservas', protect,ReservaController.agregarReserva);

    // Ruta para actualizar una reserva por ID
    app.put('/reservas/:id', protect,ReservaController.actualizarReserva);

    // Ruta para eliminar una reserva por ID
    app.delete('/reservas/:id', protect,ReservaController.eliminarReserva);

    app.get("/reservas/usuario/:usuarioId", protect,ReservaController.obtenerReservasPorUsuario);
};
