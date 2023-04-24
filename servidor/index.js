const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

//conexion con la BD
mongoose
  .connect(
    "mongodb+srv://ruth88nathalia:colombia233@cluster0.yivke0s.mongodb.net/registrocmd?retryWrites=true&w=majority"
  )

  .then(function (db) {
    console.log("conectado a la base de datos");
  })
  .catch(function (err) {
    console.log(err);
  });

//configuracion
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/cliente", express.static(path.resolve("../cliente/")));

//Rutas
//modelo de datos
const Contacto = require("./models/contactos");
const Cliente = require("./models/clientes");

//listado de datos de la empresa contacto
app.get("/contacto", function (req, res) {
    res.sendFile(path.resolve("../cliente/tabla_contacto"));
  });
  //listado de datos de la empresa cliente
  app.get("/cliente", function (req, res) {
    res.sendFile(path.resolve("../cliente/tabla_cliente.html"));
  });

  //listado de formulario contacto
app.get("/contacto", function (req, res) {
    res.sendFile(path.resolve("../cliente/formulario_contacto"));
  });
  //listado de formulario cliente
 app.get("/cliente", function (req, res) {
    res.sendFile(path.resolve("../cliente/formulario_cliente"));

  });
  //sitio web principal
app.get("/", function (req, res) {
    res.sendFile(path.resolve("../cliente/index.html"));
  });

// Se Guarda cliente en la Base de datos
app.post("/cliente", async function (req, res) {
    try {
      let cliente = new Cliente({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        telefono: req.body.telefono,
      
      });
      await cliente.save();
      res.send("Cliente guardado correctamente en la base de datos");
    } catch (error) {
      console.log(error);
      res.status(500).send("Error guardando cliente en la base de datos");
    }
  });

// Se Guarda cliente en la Base de datos
app.post("/contacto", async function (req, res) {
    try {
      let contacto = new Contacto({
        cliente: req.body.cliente,
        descripcion: req.body.descripcion,
        estado: req.body.estado,
        fecha: req.body.fecha,
        tipo: req.body.tipo
       

      });
      await contacto.save();
      res.send("Contacto guardado correctamente en la base de datos");
    } catch (error) {
      console.log(error);
      res.status(500).send("Error guardando contacto en la base de datos");
    }
  });

app.get("/mostrar_clientes", async function(req, res){
  let documentos_clientes = await Cliente.find(); 
  console.log(documentos_clientes)
  res.send(documentos_clientes)
})
//puerto y escucha del servidor
app.listen(5000, function () {
  console.log("servidor funcionando correctamente");
});
