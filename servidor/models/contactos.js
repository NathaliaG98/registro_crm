const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Contactos = new Schema({
    cliente: String,
    descripcion: String,
    estado: String,
    fecha: String,
    tipo: String
});

module.exports = mongoose.model("Contactos", Contactos);