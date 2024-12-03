const { Router } = require("express");
const { validarToken } = require("../middlewares/validate-jwt");
const FavoritosService = require("../service/FavoritosService");

const FavoritosRouter = (app) => {
  const router = Router();

  const favoritosService = new FavoritosService();

  app.use("/api/favoritos", router);

  router.get(
    "/getFavoritosByUser/",
    [validarToken],
    favoritosService.getFavoritosByUser
  );

  router.post("/addFavorito", [validarToken], favoritosService.addFavorito);
  router.delete(
    "/dropFavorito/:id_favorito",
    [validarToken],
    favoritosService.dropFavorito
  );
};

module.exports = FavoritosRouter;
