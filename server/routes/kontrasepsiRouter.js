// Import required modules
const express = require("express")
const router = express.Router();

// Import functions from controller
const {
    getAllKontrasepsi,
} = require('../controllers/kontrasepsiController')


router.get("/getAll", (req, res) => getAllKontrasepsi(req, res))

module.exports = router;
