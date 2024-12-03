const { request, response } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { keyToken } = require("../config");
const { Usuarios: modelUser } = require("../models");

class UserService {
  async login(req = request, res = response) {
    try {
      const { correo = "", password = "" } = req.body;

      if (!correo.trim()) {
        return res.status(400).json({
          msg: "El correo es obligatorio",
          status: false,
        });
      }

      if (!password.trim()) {
        return res.status(400).json({
          msg: "El contraseña es obligatorio",
          status: false,
        });
      }

      const user = await modelUser.findOne({
        where: { correo, estado: true },
      });

      if (!user) {
        return res.status(400).json({
          msg: "El correo no se encuentra registrado",
          status: false,
        });
      }

      if (!bcrypt.compareSync(password, user.password)) {
        return res.status(400).json({
          msg: "Contraseña incorrecta",
          status: false,
        });
      }

      const token = jwt.sign(
        {
          id: user.id,
        },
        keyToken,
        { expiresIn: "1d" }
      );

      const userData = user.toJSON();

      delete userData.password;
      delete userData.estado;
      delete userData.id;

      return res.status(200).json({
        token,
        userData,
        status: true,
      });
    } catch (error) {
      return res.status(400).json({
        msg: "Error al iniciar sesion",
        status: false,
      });
    }
  }

  async createUser(req = request, res = response) {
    try {
      const {
        documento = "",
        nombre = "",
        apellido = "",
        correo = "",
        password = "",
      } = req.body;

      if (!documento.trim()) {
        return res.status(400).json({
          msg: "El documento es obligatorio",
          status: false,
        });
      }
      if (!nombre.trim()) {
        return res.status(400).json({
          msg: "El nombre es obligatorio",
          status: false,
        });
      }
      if (!apellido.trim()) {
        return res.status(400).json({
          msg: "El apellido es obligatorio",
          status: false,
        });
      }
      if (!correo.trim()) {
        return res.status(400).json({
          msg: "El correo es obligatorio",
          status: false,
        });
      }
      if (!password.trim()) {
        return res.status(400).json({
          msg: "El contraseña es obligatorio",
          status: false,
        });
      }

      const user = await modelUser.findOne({
        where: { correo, estado: true },
      });

      if (user) {
        return res.status(400).json({
          msg: "El correo ya se encuentra registrado",
          status: false,
        });
      }

      const hasPassword = bcrypt.hashSync(password, 10);

      await modelUser.create({
        documento,
        nombre,
        apellido,
        correo,
        password: hasPassword,
      });

      return res.status(200).json({
        msg: "Usuario creado correctamente",
        status: true,
      });
    } catch (error) {
      return res.status(400).json({
        msg: "Error al crear usuario",
        status: false,
      });
    }
  }
}

module.exports = UserService;
