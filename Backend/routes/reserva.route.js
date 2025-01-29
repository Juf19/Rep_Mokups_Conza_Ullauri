const ReservaController = require('../controllers/Reserva.controller');

module.exports = function(app) {
    // Ruta para obtener todas las reservas
    app.get('/reservas', ReservaController.obtenerReservas);

    // Ruta para obtener una reserva por ID
    app.get('/reservas/:id', ReservaController.obtenerReservaPorId);

    // Ruta para agregar una nueva reserva
    app.post('/reservas', ReservaController.agregarReserva);

    // Ruta para actualizar una reserva por ID
    app.put('/reservas/:id', ReservaController.actualizarReserva);

    // Ruta para eliminar una reserva por ID
    app.delete('/reservas/:id', ReservaController.eliminarReserva);

    app.get("/reservas/usuario/:usuarioId", ReservaController.obtenerReservasPorUsuario);
};
