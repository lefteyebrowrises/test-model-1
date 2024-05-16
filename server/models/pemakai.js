module.exports = (sequelize, Sequelize) => {
    const Pemakai = sequelize.define("LIST_PEMAKAI_KONTRASEPSI", {
      Id_List: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      Id_Propinsi: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      Id_Kontrasepsi: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      Jumlah_Pemakai: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    }, {
      timestamps: false
    });
  
    return Pemakai;
};