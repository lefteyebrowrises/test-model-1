module.exports = (sequelize, Sequelize) => {
    const Kontrasepsi = sequelize.define("LIST_KONTRASEPSI", {
      Id_Kontrasepsi: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      Nama_Kontrasepsi: {
        type: Sequelize.STRING,
        allowNull: false
      }
    }, {
      timestamps: false
    });
  
    return Kontrasepsi;
};