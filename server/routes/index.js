const express = require("express");
const app = express();

app.use(require("./usuario")); // import usuarios
app.use(require("./login")); // import usuarios
app.use(require("./categoria")); // import categoria
app.use(require("./producto")); // import productos
app.use(require("./upload")); // import productos
app.use(require("./imagenes")); // import productos

module.exports = app;
