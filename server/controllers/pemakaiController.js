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

const getReportPemakai = async (req, res) => {
  try {
    const reportPemakai = await db.sequelize.query(
      `SELECT 
      P.Nama_Propinsi,
      SUM(CASE WHEN C.Nama_Kontrasepsi = 'Pil' THEN UC.Jumlah_Pemakai ELSE 0 END) AS Pil,
      SUM(CASE WHEN C.Nama_Kontrasepsi = 'Kondom' THEN UC.Jumlah_Pemakai ELSE 0 END) AS Kondom,
      SUM(CASE WHEN C.Nama_Kontrasepsi = 'IUD' THEN UC.Jumlah_Pemakai ELSE 0 END) AS IUD,
        SUM(CASE 
        WHEN C.Nama_Kontrasepsi IN ('Pil', 'Kondom', 'IUD') 
        THEN UC.Jumlah_Pemakai 
        ELSE 0 
      END) AS Total
    FROM 
      LIST_PEMAKAI_KONTRASEPSIs UC 
      LEFT JOIN LIST_KONTRASEPSIs C ON UC.Id_Kontrasepsi = C.Id_Kontrasepsi 
      LEFT JOIN LIST_PROVINSIs P ON UC.Id_Propinsi = P.Id_Propinsi 
    GROUP BY 
      P.Nama_Propinsi`
    );

    res.status(200).json({
      success: true,
      data: reportPemakai
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}

module.exports = {
    addPemakai,
    getReportPemakai
}