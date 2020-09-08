const express = require('express');
const app = express();



app.use(require('./usuario')); // import usuarios
app.use(require('./login')); // import usuarios


module.exports = app;