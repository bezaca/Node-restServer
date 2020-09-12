const jwt = require("jsonwebtoken");

// Verificar Token

let verificaToken = (req, res, next) => {
  let token = req.get("token");

  jwt.verify(token, process.env.SEED, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        ok: false,
        err: {
          message: "Token no valido",
        },
      });
    }

    req.usuario = decoded.usuario; //decoded es mi payload
    next();
  });
};

// Verificar Rol

let verificaAdmin_Role = (req, res, next) => {
  let usuario = req.usuario;

  if (usuario.role === "ADMIN_ROLE") {
    next();
    return;
  } else {
    return res.status(401).json({
      ok: false,
      err: {
        message: "El usuario no es un administrador",
      },
    });
  }
};

// Verifica token img

let verificaTokenImg = (req, res, next) => {
  let token = req.query.token;

  jwt.verify(token, process.env.SEED, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        ok: false,
        err: {
          message: "Token no valido",
        },
      });
    }

    req.usuario = decoded.usuario; //decoded es mi payload
    next();
  });
};

module.exports = { verificaToken, verificaAdmin_Role, verificaTokenImg };
