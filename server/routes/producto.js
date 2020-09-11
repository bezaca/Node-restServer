const express = require("express");
const app = express();

const { verificaToken } = require("../middlewares/autenticacion");

let Producto = require("../models/producto");

// Obtener todos los productos
// populate de usuario y categoria
// agregar paginado
app.get("/producto", verificaToken, (req, res) => {
  let desde = req.query.desde || 0;
  desde = Number(desde);

  Producto.find({ disponible: true })
    .skip(desde)
    .limit(5)
    .populate("usuario", " nombre email ")
    .populate("categoria", "descripcion")
    .exec((err, productos) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err,
        });
      }

      Producto.countDocuments({ disponible: true }, (err, conteo) => {
        res.json({
          ok: true,
          productos,
          conteo,
        });
      });
    });
});

// Obtener un producto por id
// populate de usuario y categoria
app.get("/producto/:id", verificaToken, (req, res) => {
  let id = req.params.id;

  Producto.findById(id)
    .populate("usuario", "nombre email ")
    .populate("categoria", " descripcion ")
    .exec((err, productoDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          message: "ID no encontrado",
          err,
        });
      }
      res.json({
        ok: true,
        productoDB,
      });
    });
});

// Buscar productos por nombre

app.get("/productos/buscar/:termino", verificaToken, (req, res) => {
  let termino = req.params.termino;

  let regex = new RegExp(termino, "i");

  Producto.find({ nombre: regex })
    .populate("categoria", " descripcion ")
    .exec((err, productosDB) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err,
        });
      }

      res.json({
        ok: true,
        productosDB,
      });
    });
});

//Crear un nuevo producto
// grabar usuario , categoria del listado
app.post("/producto", verificaToken, (req, res) => {
  let body = req.body;
  let usuario = req.usuario._id;

  let producto = new Producto({
    nombre: body.nombre,
    precioUni: body.precio,
    descripcion: body.descripcion,
    disponible: body.disponible,
    categoria: body.categoria,
    usuario,
  });

  producto.save((err, productoDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }

    if (!productoDB) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }

    res.json({
      ok: true,
      producto: productoDB,
    });
  });
});

// Actualizar put
app.put("/producto/:id", verificaToken, (req, res) => {
  let id = req.params.id;
  let usuario = req.usuario._id;
  let { nombre, precioUni, descripcion, disponible, categoria } = req.body;

  let actualizarProducto = {
    nombre,
    precioUni,
    descripcion,
    disponible,
    categoria,
    usuario,
  };

  Producto.findByIdAndUpdate(
    id,
    actualizarProducto,
    { new: true, runValidators: true },
    (err, productoDB) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err,
        });
      }

      if (!productoDB) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }
      res.json({
        ok: true,
        producto: productoDB,
      });
    }
  );
});

// Borrar un producto
// app.delete <> disponible == false

app.delete("/producto/:id", verificaToken, (req, res) => {
  let id = req.params.id;
  let usuario = req.params._id;

  Producto.findByIdAndUpdate(
    id,
    { disponible: false },
    { new: true, runValidators: true },
    (err, productoDB) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err,
        });
      }

      if (!productoDB) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }
      res.json({
        ok: true,
        producto: productoDB,
        message: "producto borrado",
      });
    }
  );
});

module.exports = app;
