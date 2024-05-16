const db = require('../models');
const Kontrasepsi = db.kontrasepsi;

const getAllKontrasepsi = async (req, res) => {
    try {
      const kontrasepsi = await Kontrasepsi.findAll();
  
      res.status(200).json({
        success: true,
        kontrasepsiList: kontrasepsi
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}


module.exports = {
    getAllKontrasepsi
}