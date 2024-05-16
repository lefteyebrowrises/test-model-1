const db = require('./models');
const Provinsi = db.provinsi;
const Kontrasepsi = db.kontrasepsi;
const provinsiData = require("./data/provinsi.json");
const kontrasepsiData = require("./data/kontrasepsi.json");

const insertDefaultData = async () => {
    try {
      const provinsi = await Provinsi.bulkCreate(provinsiData);
  
      if (provinsi.length > 0) {
        console.log(`Success to add ${provinsi.length} provinsi data`);
      } else {
        console.log("Failed to add provinsi data");
      }

      const kontrasepsi = await Kontrasepsi.bulkCreate(kontrasepsiData);
  
      if (kontrasepsi.length > 0) {
        console.log(`Success to add ${kontrasepsi.length} kontrasepsi data`);
      } else {
        console.log("Failed to add kontrasepsi data");
      }
    } catch (error) {
      console.error('Error creating default data:', error);
    }
  };

module.exports = insertDefaultData;