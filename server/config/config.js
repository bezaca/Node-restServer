// PORT
process.env.PORT = process.env.PORT || 3000;

// Entorno
process.env.NODE_ENV = process.env.NODE_ENV || "dev";

// Seed de autenticación
process.env.SEED = process.env.SEED || "lulu-me-encatas-hermosa";

// Fecha de expiración
process.env.CADUCIDAD_TOKEN = "48h";

// Base de datos
let urlDB;

if (process.env.NODE_ENV === "dev") {
  urlDB = "mongodb://localhost:27017/cafe";
} else {
  urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;

// Google Client

process.env.CLIENT_ID =
  process.env.CLIENT_ID ||
  "205898702179-49n3o2l5bhn4t4i9fe0n5tj0v63ofv8b.apps.googleusercontent.com";
