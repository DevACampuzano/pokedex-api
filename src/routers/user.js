const { Router } = require("express");

const UserService = require("../service/UserService");

const UserRouter = (app) => {
  const router = Router();

  const userService = new UserService();

  app.use("/api/user", router);

  //registro
  router.post("/", userService.createUser);
  //login
  router.post("/login", userService.login);
};

module.exports = UserRouter;
