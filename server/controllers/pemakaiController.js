const db = require('../models');
const Pemakai = db.pemakai;

const addPemakai = async (req, res) => {
    try {
      const data = {
        Id_Propinsi: req.body.Id_Propinsi,
        Id_Kontrasepsi: req.body.Id_Kontrasepsi,
        Jumlah_Pemakai: req.body.Jumlah_Pemakai
      }
      console.log(data);

      const pemakai = await Pemakai.create(data);
  
      res.status(201).json({
        success: true,
        newPemakai: pemakai,
      });
      
    } catch (err) {
      console.error(err); // log the error
      res.status(400).json({ success: false, message: 'Failed to create pemakai' });
    }
  };

module.exports = {
    addPemakai
}