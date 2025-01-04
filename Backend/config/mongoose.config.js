const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1/proyecto")
    .then(() => console.log(`Established a connection to database`))
    .catch(err => console.log("Something went wrong when connecting to the database", err));