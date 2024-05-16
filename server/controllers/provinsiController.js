const db = require('../models');
const Provinsi = db.provinsi;

const getAllProvinsi = async (req, res) => {
    try {
      const provinsi = await Provinsi.findAll();
  
      res.status(200).json({
        success: true,
        provinsiList: provinsi
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}


module.exports = {
    getAllProvinsi
}