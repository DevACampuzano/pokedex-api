const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT;
const dbName = process.env.DBNAME;
const dbHost = process.env.DBHOST;
const dbPort = process.env.DBPORT;
const dbUser = process.env.DBUSER;
const dbPassword = process.env.DBPASSWORD;
const keyToken = process.env.KEY_TOKEN;

module.exports = {
  port,
  dbName,
  dbHost,
  dbPort,
  dbUser,
  dbPassword,
  keyToken,
};
