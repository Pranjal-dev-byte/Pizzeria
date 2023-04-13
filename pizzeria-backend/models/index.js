const Sequelize = require('sequelize');
const dbConfig = require('../config/db.config')

const sequelize = new Sequelize({
  host: dbConfig.host,
  database: dbConfig.database,
  username: dbConfig.username,
  password: dbConfig.password,
  dialect: dbConfig.dialect, 
});

sequelize
  .authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err));


const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./User")(sequelize, Sequelize);

module.exports = db;