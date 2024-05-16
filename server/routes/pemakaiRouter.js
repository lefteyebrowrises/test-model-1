// Import required modules
const express = require("express")
const router = express.Router();

// Import functions from controller
const {
    addPemakai,
} = require('../controllers/pemakaiController')


router.post("/add", (req, res) => addPemakai(req, res))

module.exports = router;
