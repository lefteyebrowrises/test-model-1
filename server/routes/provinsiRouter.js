// Import required modules
const express = require("express")
const router = express.Router();

// Import functions from controller
const {
    getAllProvinsi,
} = require('../controllers/provinsiController')


router.get("/getAll", (req, res) => getAllProvinsi(req, res))

module.exports = router;
