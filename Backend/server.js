const express = require('express');
const cors = require("cors");
const app = express();
const port = 8000;

require('./config/mongoose.config');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));


const allRestaurantesRoutes = require("./routes/usuario.route");
allRestaurantesRoutes(app);

const allParquesRoutes = require("./routes/parque.route");
allParquesRoutes(app);

const allCanchaRoutes = require("./routes/cancha.route");
allCanchaRoutes(app);
    
const allReservaRoutes = require("./routes/reserva.route");
allReservaRoutes(app);

app.listen(port, () => {
    console.log('server.js escuchando en el puerto', port);
});
