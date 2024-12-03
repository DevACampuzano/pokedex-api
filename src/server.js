const express = require("express");
const cors = require("cors");
const { port } = require("./config");
const fs = require("fs");
const path = require("path");

const basename = path.basename(__filename);

class Server {
  constructor() {
    this.app = express();
    this.port = port;
    this.middlewares();
    this.router();
  }

  middlewares() {
    // CORS
    this.app.use(cors());
    // Lectura y parseo del body
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  router() {
    fs.readdirSync(`${__dirname}/routers`)
      .filter(
        (file) =>
          file.indexOf(".") !== 0 &&
          file !== basename &&
          file.slice(-3) === ".js"
      )
      .forEach((file) => {
        require(path.join(`${__dirname}/routers`, file))(this.app);
      });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;
