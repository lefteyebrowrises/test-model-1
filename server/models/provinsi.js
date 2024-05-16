module.exports = (sequelize, Sequelize) => {
    const Provinsi = sequelize.define("LIST_PROVINSI", {
      Id_Propinsi: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      Nama_Propinsi: {
        type: Sequelize.STRING,
        allowNull: false
      }
    }, {
      timestamps: false
    });
  
    return Provinsi;
};