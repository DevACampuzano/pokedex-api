const { request, response } = require("express");
const jwt = require("jsonwebtoken");

const { keyToken } = require("../config");

const validarToken = (req = request, res = response, next) => {
  try {
    const bearerToken = req.headers.authorization;
    if (!bearerToken) {
      return res.status(401).json({
        msg: "No hay token en la petición",
        status: false,
      });
    }

    const token = bearerToken.split(" ")[1];

    const { id } = jwt.verify(token, keyToken);
    req.userID = id;
    next();
  } catch (error) {
    return res.status(401).json({
      msg: "Token no válido",
      status: false,
    });
  }
};

module.exports = { validarToken };
