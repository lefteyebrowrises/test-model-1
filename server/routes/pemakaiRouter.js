// Import required modules
const express = require("express")
const router = express.Router();

// Import functions from controller
const {
    addPemakai,
    getReportPemakai
} = require('../controllers/pemakaiController')


router.post("/add", (req, res) => addPemakai(req, res))
router.get("/report", (req, res) => getReportPemakai(req, res))

module.exports = router;
