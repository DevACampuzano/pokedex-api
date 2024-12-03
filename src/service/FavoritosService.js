const { request, response } = require("express");

const { Favoritos: modelFavoritos, Usuarios: modelUser } = require("../models");

class FavoritosService {
  async getFavoritosByUser(req = request, res = response) {
    try {
      const id_usuario = req.userID;

      const user = await modelUser.findOne({
        where: { id: id_usuario },
      });

      if (!user) {
        return res.status(404).json({
          msg: "El usuario no existe",
          status: false,
        });
      }

      const favoritos = await modelFavoritos.findAll({
        where: { id_usuario, estado: true },
      });

      return res.json({
        favoritos,
        status: true,
      });
    } catch (error) {
      return res.status(400).json({
        msg: "Error al consultar favoritos",
        status: false,
      });
    }
  }

  async dropFavorito(req = request, res = response) {
    try {
      const { id_favorito } = req.params;

      const favorito = await modelFavoritos.findOne({
        where: { id: id_favorito },
      });

      if (!favorito) {
        return res.status(404).json({
          msg: "El favorito no existe",
          status: false,
        });
      }

      await modelFavoritos.update(
        { estado: false },
        {
          where: { id: id_favorito },
        }
      );

      return res.json({
        msg: "Favorito eliminado",
        status: true,
      });
    } catch (error) {
      return res.status(400).json({
        msg: "Error al eliminar favorito",
        status: false,
      });
    }
  }

  async addFavorito(req = request, res = response) {
    try {
      const id_usuario = req.userID;
      const { nombre = "", url = "" } = req.body;

      if (!nombre.trim()) {
        return res.status(400).json({
          msg: "El nombre es requerido",
          status: false,
        });
      }

      if (!url.trim()) {
        return res.status(400).json({
          msg: "La url es requerida",
          status: false,
        });
      }

      const favotitoResult = await modelFavoritos.create({
        id_usuario,
        nombre,
        url,
      });

      return res.status(201).json({
        favotitoResult,
        status: true,
      });
    } catch (error) {
      return res.status(400).json({
        msg: "Error al agregar favorito",
        status: false,
      });
    }
  }
}

module.exports = FavoritosService;
