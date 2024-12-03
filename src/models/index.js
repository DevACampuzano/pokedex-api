const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");

const config = require("../config/index");

const basename = path.basename(__filename);
const db = {};

const sequelize = new Sequelize(
  config.dbName,
  config.dbUser,
  config.dbPassword,
  {
    host: config.dbHost,
    dialect: "mariadb",
    port: config.dbPort,
    logging: false, // Disable logging
    timezone: "-05:00",
  }
);

fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize);
    db[model.name] = model;
  });

/**
 *
 * {
 *  User: "",
 *  Role: "",
 * }
 * ["User","Role"]
 */

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;

sequelize.sync({ alter: true });

module.exports = db;
