const config = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.kontrasepsi = require("./kontrasepsi.js")(sequelize, Sequelize);
db.provinsi = require("./provinsi.js")(sequelize, Sequelize);
db.pemakai = require("./pemakai.js")(sequelize, Sequelize);

db.pemakai.belongsTo(db.kontrasepsi, { foreignKey: 'Id_Kontrasepsi' });
db.pemakai.belongsTo(db.provinsi, { foreignKey: 'Id_Propinsi' });

module.exports = db;